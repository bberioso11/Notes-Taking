const express = require("express");
const {
  loginSuccess,
  logout,
  addNotes,
  getNotes,
  updateNotes,
  deleteNotes,
} = require("../controller/apiCtlr");
const router = express.Router();

router.get("/login-success", loginSuccess);
router.delete("/logout", logout);

router.put("/addnotes", addNotes);

router.get("/getnotes", getNotes);
router.post("/updatenotes", updateNotes);
router.delete("/deletenotes", deleteNotes);
module.exports = router;
