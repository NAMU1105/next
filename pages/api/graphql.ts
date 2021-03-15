import { ApolloServer, gql } from "apollo-server-micro";

const DUMMY_ALL_USERES = [
  { id: "0", name: "0Namu", color: "red", email: "1@1.com", password: "DUMMY" },
  {
    id: "1",
    name: "1Namu",
    color: "blue",
    email: "1@1.com",
    password: "DUMMY",
  },
  {
    id: "2",
    name: "2Namu",
    color: "green",
    email: "1@1.com",
    password: "DUMMY",
  },
  {
    id: "3",
    name: "3Namu",
    color: "black",
    email: "1@1.com",
    password: "DUMMY",
  },
  {
    id: "4",
    name: "4Namu",
    color: "pink",
    email: "10@10.com",
    password: "10",
  },
  { id: "5", name: "5Namu", color: "red", email: "1@1.com", password: "DUMMY" },
  { id: "6", name: "6Namu", color: "red", email: "11@11.com", password: "11" },
];

const typeDefs = gql`
  scalar Date

  type Query {
    users: [User!]!
    user(id: String!): User!
    signUp(
      id: String!
      name: String!
      email: String!
      password: String!
    ): [User!]!
    logIn(email: String!, password: String!): User!
  }

  type User {
    id: String
    name: String
    color: String
    email: String
    password: String
  }
`;

// const customScalarResolver = {
//   Date: new Date(),
// };

const resolvers = {
  Query: {
    // 모든 유저정보 get
    users(parent, args, context) {
      // TODO: DB에서 값꺼내서 여기에 넣어서 보내주면 될 것 같다.
      return DUMMY_ALL_USERES;
    },
    // 해당id 유저 정보 get
    user(parent, args, context) {
      const result = DUMMY_ALL_USERES.find((u) => u.id === args.id);
      return result;
    },
    // 회원가입
    signUp(parent, args, context) {
      const newUser = {
        id: args.id,
        name: args.name,
        email: args.email,
        password: args.password,
        color: "pink",
      };

      DUMMY_ALL_USERES.push(newUser);
      return DUMMY_ALL_USERES;
    },
    // 로그인
    logIn(parent, args, context) {
      const result = DUMMY_ALL_USERES.find((u) => u.email == args.email);
      if (!result) return new Error("no such user");
      if (result.password !== args.password) {
        return new Error("invalid auth");
      } else {
        return result;
      }
    },
  },
  // Date: new Date(),
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
