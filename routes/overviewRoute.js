const express = require("express");
const overviewController = require("../controllers/overviewController");
const authController = require("../controllers/authController");
const router = express.Router();

//get route for getting all decks

router.get("/home", overviewController.homePage);

router.use(authController.protect);
router.get("/:id", overviewController.getUserDecks);
router
  .route("/:id/create-new-deck")
  .get(overviewController.renderDeckForm)
  .post(overviewController.createNewDeck);

router.route("/:id/:deckId").delete(overviewController.deleteDeck);
router
  .route("/:id/:deckId/add-new-card")
  .get(overviewController.renderCardForm)
  .post(overviewController.createCard);

router
  .route("/:id/:deckId/study-cards")
  .get(overviewController.renderStudyCards);

router.get("/:id/:deckId/styd-cards/show-card", overviewController.studyCards);

router.get("/:id/:deckId/list-deck-cards", overviewController.listCardsGet);
router.delete(
  "/:id/:deckId/:cardId/delete-card",
  overviewController.deleteCard
);
router
  .route("/:id/:deckId/:cardId/edit-card")
  .get(overviewController.editCardGet)
  .post(overviewController.editCardPost);
module.exports = router;
