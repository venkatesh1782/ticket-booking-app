const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String,
  tickets: Number,
});

module.exports = mongoose.model("Booking", BookingSchema);