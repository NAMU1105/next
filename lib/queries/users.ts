import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query people {
    people {
      id
    }
  }
`;

export const GET_PEOPLE_PAGENATED = gql`
  query peoplePaginated($page: Int!, $per_page: Int!) {
    peoplePaginated(page: $page, per_page: $per_page) {
      id
      last_name
    }
  }
`;
