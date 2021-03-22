const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

// oAuth
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

// graphql schema
const queries = require("./typedefs-resolvers/_queries");
const mutations = require("./typedefs-resolvers/_mutations");
const enums = require("./typedefs-resolvers/_enums");
const equipments = require("./typedefs-resolvers/equipments");
const softwares = require("./typedefs-resolvers/softwares");
const supplies = require("./typedefs-resolvers/supplies");
const givens = require("./typedefs-resolvers/givens");
const tools = require("./typedefs-resolvers/tools");
const people = require("./typedefs-resolvers/people");
const users = require("./typedefs-resolvers/users");

const typeDefs = [
  queries,
  mutations,
  enums,
  equipments.typeDefs,
  softwares.typeDefs,
  supplies.typeDefs,
  givens.typeDefs,
  tools.typeDefs,
  people.typeDefs,
  users.typeDefs,
];

const resolvers = [
  equipments.resolvers,
  softwares.resolvers,
  supplies.resolvers,
  givens.resolvers,
  tools.resolvers,
  people.resolvers,
  users.resolvers,
];

const server = new ApolloServer({ typeDefs, resolvers });

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

// 1. 몽고디비(몽구스) 연결
mongoose
  .connect("mongodb://localhost/4DTest?retryWrites=false", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // app.listen(port, () => {
    //   console.log(`app listening at ${port}`);
    // });
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error:"));
db.once("open", function () {
  console.log("mongoose is connected!");
});

// oAuth
passport.use(
  new GoogleStrategy(
    {
      // clientID: process.env.GOOGLE_CLIENT_ID,
      clientID:
        "130920675140-ua3h1m8omkvlv0518nue0jb36eohs6t8.apps.googleusercontent.com",
      clientSecret: "qmiYX-sKvvTN2MJ4gALQMiUF",
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://www.example.com/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      // authorization 에 성공했을때의 액션
      console.log(accessToken);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log(`user : ${user.profile.id}`);
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  console.log(`obj : ${obj}`);
  done(null, obj);
});

app.get("/auth", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
