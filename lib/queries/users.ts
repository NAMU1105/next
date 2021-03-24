import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query users {
    users {
      id
      firstName
    }
  }
`;

export const GET_USER_PAGENATED = gql`
  query userPaginated($page: Int!, $per_page: Int!) {
    userPaginated(page: $page, per_page: $per_page) {
      id
      firstName
    }
  }
`;

export const GET_ALL_USER_AND_USER_PAGENATED = gql`
  query userPaginated($page: Int!, $per_page: Int!) {
    userPaginated(page: $page, per_page: $per_page) {
      id
      firstName
    }

    users {
      id
      firstName
    }
  }
`;

export const GET_ALL_USER_COUNT = gql`
  query userAllCount {
    userAllCount
  }
`;

export const GET_ALL_USER_COUNT_AND_USER_PAGENATED = gql`
  query userPaginated($page: Int!, $per_page: Int!) {
    userPaginated(page: $page, per_page: $per_page) {
      id
      firstName
    }

    userAllCount
  }
`;
