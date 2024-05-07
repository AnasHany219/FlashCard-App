const express = require("express");
const accountesController = require("../controllers/accountsConroller");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/sign-up", accountesController.signupGet);
router.get("/sign-in", accountesController.signinGet);

router.post("/sign-up", authController.signupPost);
router.post("/sign-in", authController.signinPost);
router.get("/logout", authController.logout);
module.exports = router;
