const { i18n } = require("./next-i18next.config");
const path = require("path");

module.exports = (phase, { defaultConfig }) => {
  // console.log("defaultConfig: ", defaultConfig);
  // console.log("phase: ", phase);

  return {
    i18n,
    env: {
      REACT_APP_GRAPHQL_END_POINT: process.env.REACT_APP_GRAPHQL_END_POINT,
      GRAPHQL_END_POINT: "http://localhost:4000",
      sm: 640,
      md: 768,
      lg: 1024,
      "2xl": 1536,
      // GRAPHQL_END_POINT: "http://49.247.208.236:4000",
    },
    // alias: {
    //   "@components": path.join(__dirname, "components"),
    // },
  };
};
