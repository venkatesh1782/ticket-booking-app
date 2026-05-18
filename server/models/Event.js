const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  totalTickets: {
    type: Number,
    default: 100
  }
});

module.exports = mongoose.model("Event", EventSchema);