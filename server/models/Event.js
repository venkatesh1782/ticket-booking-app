const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  totalTickets: Number
});

module.exports = mongoose.model("Event", eventSchema);