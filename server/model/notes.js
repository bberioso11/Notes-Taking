const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/notes-taking");
const schema = new mongoose.Schema({
  title: String,
  content: String,
  owner: String,
  date_created: String,
});

const notesModel = mongoose.model("notes", schema);

module.exports = notesModel;
