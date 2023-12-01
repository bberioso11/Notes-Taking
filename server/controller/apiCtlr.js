const passport = require("passport");
const notesModel = require("../model/notes");

exports.loginSuccess = (req, res) => {
  req.user
    ? res.json({
        isLoggedIn: true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        accounty_type: req.user.accounty_type,
      })
    : res.json(null);
};

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.json({ isSuccess: true, redirectLink: process.env.CLIENT_URL });
};

exports.addNotes = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;
  const date_created = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  try {
    await notesModel.create({
      title,
      content,
      owner: email,
      date_created,
    });
    res.json({
      isSuccess: true,
      message: "Successfully Added!",
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.getNotes = async (req, res) => {
  const email = req.user?.email;
  if (email) {
    const notes = await notesModel.find({ owner: email });
    res.json(notes);
  }
};

exports.updateNotes = async (req, res) => {
  const { email } = req.user;
  const { id, title, content } = req.body;
  try {
    const notes = await notesModel.updateOne(
      { _id: id, owner: email },
      { $set: { title: title, content: content } }
    );
    res.json({ isSuccess: true, message: "Updated Succesfully" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.deleteNotes = async (req, res) => {
  const { id } = req.query;
  try {
    await notesModel.deleteOne({ _id: id });
    res.json({ isSuccess: true, message: "Deleted Succesfully" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
