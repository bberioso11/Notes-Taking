const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();
const { failed } = require("../controller/authCtlr");

router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/google/failed",
  })
);

router.get("/google/failed", failed);

module.exports = router;
