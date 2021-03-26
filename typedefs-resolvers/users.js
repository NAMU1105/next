const { gql } = require("apollo-server");
const dbWorks = require("../dbWorks.js");
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    team: ID
    email: String!
    password: String!
    role: String!
  }
  input SignUpInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }
  input LogInInput {
    email: String!
    password: String!
  }
`;
const resolvers = {
  Query: {
    users: (parent, args) => dbWorks.getUsers(args),
    userByID: (parent, args) => dbWorks.getUserById(args),
    userByEmail: (parent, args) => dbWorks.getUserByEmail(args),
    userPaginated: (parent, args) => dbWorks.getUsers(args),
    userAllCount: (parent, args) => dbWorks.getTotalUserCount(args),
  },
  Mutation: {
    signUp: (parent, args) => dbWorks.signUp(args),
    logIn: (parent, args) => dbWorks.logIn(args),
  },
};
module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};
