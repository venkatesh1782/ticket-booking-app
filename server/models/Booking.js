const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  tickets: Number,
  total: Number,
  paid: Boolean
});

module.exports = mongoose.model("Booking", bookingSchema);