const { ApolloServer } = require("apollo-server");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");

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
