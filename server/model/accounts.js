const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/notes-taking");
const schema = new mongoose.Schema({
  googleID: String,
  firstname: String,
  lastname: String,
  email: String,
  account_type: String,
});

const accountsModel = mongoose.model("accounts", schema);

module.exports = accountsModel;
