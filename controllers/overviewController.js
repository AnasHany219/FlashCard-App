const Deck = require("./../modles/deckModle");
const User = require("./../modles/userModle");
const Card = require("./../modles/cardModle");
const catchAsync = require("../utils/catchAsynch");
const homePage = (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    res.staus(404).send("There was an error");
  }
};

const getUserDecks = catchAsync(async (req, res) => {
  //we've to render all avilable decks
  //for the current user which has the current id
  //you've to make sure the id passed is valid

  //here you've to validate the credentials
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user || user.length === 0) {
    return res.redirect("/home");
  }
  const decks = await Deck.find({ deckOwnerId: userId }).sort({
    createdAt: -1,
  });
  res.render("overview", { userId, decks });
});

const renderDeckForm = catchAsync(async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const createUsrURL = `/overview${req.url}`;
  res.render("create-new-deck", { createUsrURL, userId });
});
const createNewDeck = catchAsync(async (req, res) => {
  //first you have to store at deck document the folowing
  //the name of the deck
  //the deck owern which is the req.params.id

  const userId = req.params.id;
  const deckId = req.params.deckId;
  const deckName = req.body.deckName;
  const deckOwnerId = req.params.id;
  const data = {
    deckOwnerId,
    deckName,
  };
  const createdDeck = await Deck.create(data);
  const updatedUser = await User.findOneAndUpdate(
    { _id: deckOwnerId },
    { $inc: { decksNumber: 1 } }
  );
  const createUsrURL = `/overview${req.url}`;
  console.log(createUsrURL);
  res.render("create-new-deck", { createUsrURL, userId });
});

const deleteDeck = catchAsync(async (req, res) => {
  //you have to set an event using javascript
  //when the user click the delete button you should do this
  //first make fetch request at this route DELETE /overview/id/deckID=> will be at data-deckId
  //after deleting the deck from db you've to decres the user's number of decks
  //and after this you have to redirect to /overview/id
  const userId = req.params.id;
  const deckId = req.params.deckId;

  //first you've to delete the deck itself
  const deletedDeck = await Deck.findByIdAndDelete(deckId);
  const deletedCards = await Card.deleteMany({ cardOwnerId: deckId });
  const decresedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $inc: { decksNumber: -1 } }
  );
  res.json({
    redirect: `/overview/${userId}`,
  });
});
const renderCardForm = catchAsync(async (req, res) => {
  // /overview/userId/deckId/create-new-card
  const userId = req.params.id;
  const newCardURL = `/overview/${req.url}`;
  res.render("create-new-card", { newCardURL, userId });
});
const createCard = catchAsync(async (req, res) => {
  //you've to do this
  //first get the user and deck id
  //req.body => front, back
  //create new card with
  //cardOwnerId => deckId
  //cardFront => cardFront => req.front
  //cardBack => cardBack => req.back
  //update deckCardsCount at the current deck

  const userId = req.params.id;
  const deckId = (cardOwnerId = req.params.deckId);
  const cardFront = req.body.cardFront;
  const cardBack = req.body.cardBack;
  const data = {
    cardOwnerId,
    cardFront,
    cardBack,
  };
  const createdCard = await Card.create(data);
  const updatedDeck = await Deck.findByIdAndUpdate(
    { _id: deckId },
    { $inc: { deckCardsCount: 1 } }
  );
  //you've to redirect the user to /overview/userid
  res.redirect(`/overview/${req.url}`);
});
const renderStudyCards = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const deckId = req.params.deckId;
  res.render("study-cards", { userId, deckId });
});
const studyCards = catchAsync(async (req, res) => {
  //this will be an endpoint to get all the current deck cards
  //you will need the current deck id
  //fetch all cards with cardOwnerId = deckId
  //return thes data as response to the js

  const deckId = req.params.deckId;
  const data = await Card.find({ cardOwnerId: deckId }).select(
    "cardFront cardBack -_id"
  );
  res.json(data);
});
const listCardsGet = catchAsync(async (req, res) => {
  const deckId = req.params.deckId;
  const userId = req.params.id;
  const cards = await Card.find({ cardOwnerId: deckId });
  res.render("cards-overview", { userId, cards, deckId });
});
const deleteCard = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const cradId = req.params.cardId;
  const deckId = req.params.deckId;
  const card = await Card.findByIdAndDelete(cradId);
  const deck = await Deck.findByIdAndUpdate(deckId, {
    $inc: { deckCardsCount: -1 },
  });
  res.redirect(`/overview/${userId}/${deckId}/list-deck-cards`);
});
const editCardGet = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const cardId = req.params.cardId;
  const deckId = req.params.deckId;
  const card = await Card.findById(cardId);
  const cardFront = card.cardFront;
  const cardBack = card.cardBack;
  res.render("edit-card", { cardId, userId, deckId, cardFront, cardBack });
});
const editCardPost = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const cardId = req.params.cardId;
  const deckId = req.params.deckId;
  const cardFront = req.body.cardFront;
  const cardBack = req.body.cardBack;
  const card = await Card.findByIdAndUpdate(cardId, { cardFront, cardBack });

  res.redirect(`/overview/${userId}/${deckId}/list-deck-cards`);
});
module.exports = {
  homePage,
  getUserDecks,
  renderDeckForm,
  createNewDeck,
  deleteDeck,
  renderCardForm,
  createCard,
  renderStudyCards,
  studyCards,
  listCardsGet,
  deleteCard,
  editCardGet,
  editCardPost,
};
