const { gql } = require("apollo-server");

const typeDefs = gql`
  type Mutation {
    deleteEquipment(id: String): Equipment
    deleteSupply(id: String): Supply
    postPerson(input: PostPersonInput): People!
    signUp(input: SignUpInput!): User!
    logIn(input: LogInInput!): User!
  }
`;

module.exports = typeDefs;
