const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  env: {
    REACT_APP_GRAPHQL_END_POINT: process.env.REACT_APP_GRAPHQL_END_POINT,
    GRAPHQL_END_POINT: "http://localhost:4000",
    // GRAPHQL_END_POINT: "http://49.247.208.236:4000",
  },
};
