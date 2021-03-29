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

export const GET_USERS_ID = gql`
  query users {
    users {
      id
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query userByID($id: String!) {
    userByID(id: $id) {
      firstName
      lastName
      email
      role
    }
  }
`;
export const GET_USER_PROFILE = gql`
  query userByID($id: String!) {
    userByID(id: $id) {
      firstName
      lastName
      email
      role
    }
  }
`;

/////////////////////////////////////////
export const GET_ALL_USERS = `query users{
  users{
    id
    firstName
  }
}`;

export const GET_USERS_ID2 = `
  query users {
    users {
      id
    }
  }
`;

export const GET_USER_BY_ID2 = `
  query userByID($id: String!) {
    userByID(id: $id) {
      firstName
      lastName
      email
      role
    }
  }
`;

// TODO: 위의 값들을 enum에 넣어놓고 param에 따라 gql붙여서 리턴할지 말지 결정해주는 함수를 만들자
//
// const
