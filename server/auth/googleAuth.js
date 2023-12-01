const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const accountsModel = require("../model/accounts");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CB_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const existingUser = await accountsModel.findOne({
        googleID: profile.id,
      });
      if (existingUser) {
        return cb(null, existingUser);
      }
      const user = await accountsModel.create({
        googleID: profile.id,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        account_type: null,
      });
      cb(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (profile, done) => {
  const user = await accountsModel.findOne({ googleID: profile.googleID });
  done(null, user);
});
