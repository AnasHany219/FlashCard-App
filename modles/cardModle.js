const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  cardOwnerId: {
    type: String,
    required: true,
  },
  cardFront: {
    type: String,
    required: true,
  },
  cardBack: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
