import { request } from "graphql-request";
// const API_ENDPOINT = "http://localhost:4000/";

export const fetcher = (query, variables) =>
  request(process.env.GRAPHQL_END_POINT, query, variables);
// export const fetcher = (query) => request(process.env.GRAPHQL_END_POINT, query);
