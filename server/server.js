require("dotenv").config();
const Event = require("./models/Event");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const User = require("./models/User");
const Booking = require("./models/Booking");

const app = express();
app.use(cors());
app.use(express.json());


// ======================
// 🔌 MongoDB Connection
// ======================
mongoose.connect("mongodb://127.0.0.1:27017/ticketDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));


// ======================
// 📧 Email Transporter
// ======================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});


// ======================
// 🔐 LOGIN API
// ======================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, password });
      await user.save();
    }

    res.json({ message: "Login successful" });

  } catch (error) {
    console.log("❌ Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});


// ======================
// 🎟️ BOOKING + EMAIL API
// ======================
app.post("/book", async (req, res) => {
  try {
    let { name, email, department, tickets, total } = req.body;

    if (!name || !email || !department || !tickets) {
      return res.status(400).json({ message: "All fields required" });
    }

    tickets = Number(tickets);
    total = Number(total);

const event = await Event.findOne();
const TOTAL = event?.totalTickets || 100;

    // 🔒 Check already booked tickets
    const totalBooked = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$tickets" } } }
    ]);

    const booked = totalBooked[0]?.total || 0;
    const remaining = TOTAL - booked;

    // 🚫 Prevent overbooking
    if (tickets > remaining) {
      return res.status(400).json({
        message: `Only ${remaining} tickets left`
      });
    }

    // ✅ Save booking
    const booking = new Booking({
      name,
      email,
      department,
      tickets,
      total,
      paid: true
    });

  await booking.save();
console.log("✅ Booking saved:", booking);

    // 📧 Email
    try {
      console.log("📧 Sending email to:", email);
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Datanex'26 Booking Confirmation",
        text: `🎉 Your booking is confirmed!

Event: Datanex'26
Date: 25 April 2026
Time: 10:00 AM
Venue: Auditorium Hall

Name: ${name}
Tickets: ${tickets}
Total Amount: ₹${total}`
      });
    }catch (err) {
  console.log("❌ Email Error:", err);
}

    res.json({ message: "Booking successful" });

  } catch (error) {
    console.log("❌ Booking Error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
});


// ======================
// 📊 STATS API
// ======================
app.get("/stats", async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const totalTicketsAgg = await Booking.aggregate([
      { $group: { _id: null, totalTickets: { $sum: "$tickets" } } }
    ]);

    const totalRevenueAgg = await Booking.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } }
    ]);

    res.json({
      totalBookings,
      totalTickets: totalTicketsAgg[0]?.totalTickets || 0,
      totalRevenue: totalRevenueAgg[0]?.totalRevenue || 0
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});
app.get("/remaining-tickets", async (req, res) => {
  try {
    const event = await Event.findOne();
    const TOTAL = event?.totalTickets || 100;

    const totalBooked = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$tickets" } } }
    ]);

    const booked = totalBooked[0]?.total || 0;

    const remaining = Math.max(TOTAL - booked, 0); // 🚫 no negative

    res.json({ remaining });

  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});


// ======================
// 📊 ADMIN API
// ======================
app.get("/bookings", async (req, res) => {
  try {
    const data = await Booking.find().sort({ _id: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});
// ======================
// 🛠️ ADMIN RESET API
// ======================
app.post("/admin/reset", async (req, res) => {
  try {
    const { totalTickets } = req.body;

    // delete bookings
    await Booking.deleteMany({});

    // update event tickets
    let event = await Event.findOne();

    if (!event) {
      event = new Event({ totalTickets });
    } else {
      event.totalTickets = totalTickets;
    }

    await event.save();

    res.json({ message: "System reset with new ticket count" });

  } catch (err) {
    res.status(500).json({ message: "Reset failed" });
  }
});


// ======================
// 🚀 START SERVER
// ======================
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});