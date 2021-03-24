import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query users {
    users {
      id
      firstName
    }
  }
`;

export const GET_PEOPLE_PAGENATED = gql`
  query userPaginated($page: Int!, $per_page: Int!) {
    userPaginated(page: $page, per_page: $per_page) {
      id
      firstName
    }
  }
`;
