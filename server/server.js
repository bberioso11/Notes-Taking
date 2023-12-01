const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
require("dotenv").config();
require("./auth/googleAuth");

const app = express();

app.listen(3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
