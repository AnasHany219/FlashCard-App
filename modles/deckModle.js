const mongoose = require("mongoose");
const deckSchema = new mongoose.Schema({
  deckOwnerId: {
    type: String,
    required: true,
  },
  deckName: {
    type: String,
    required: true,
  },
  deckCardsCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;
