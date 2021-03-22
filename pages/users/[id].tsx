import { gql } from "@apollo/client";
import { initializeApollo } from "../../lib/apolloClient";

// const GET_USERS_ID = gql`
//   query userAll {
//     userAll {
//       id
//     }
//   }
// `;
const GET_USERS_ID = gql`
  query users {
    users {
      id
    }
  }
`;
const GET_USER = gql`
  query userByID($id: String!) {
    userByID(id: $id) {
      firstName
      lastName
      email
    }
  }
`;

const UserDetail = ({ loadedUser }) => {
  // const router = useRouter();
  //   console.log(router);
  //   console.log(router.pathname);
  //   console.log(router.query);
  //   console.log(router.query.id);
  if (!loadedUser) return <p>Loading...</p>;

  if (loadedUser.userByID) {
    return <p>User name: {loadedUser.userByID.firstName}</p>;
  } else {
    // console.log(loadedUser);

    return <p>No such data</p>;
  }
};

// This function gets called at build time
export async function getStaticPaths() {
  console.log("getStaticPaths!!");

  const apolloClient = initializeApollo();

  const { data, error } = await apolloClient.query({
    query: GET_USERS_ID,
  });

  // console.log(data);
  const ids = data.users.map((u) => u.id);
  const pathsWithParams = ids.map((id) => ({ params: { id } }));

  return {
    paths: pathsWithParams,

    // 만들어지지 않은 것도 추후 요청이 들어오면 만들어 줄지 여부.
    // fallback: "blocking",
    fallback: true,
  };
}

export const getStaticProps = async (context) => {
  console.log("getStaticProps");

  const { params } = context;
  const id = params.id;
  const apolloClient = initializeApollo();

  if (!id) {
    return;
  }
  console.log("id: ", id);
  console.log("params: ", params);

  const { data, error } = await apolloClient.query({
    query: GET_USER,
    variables: {
      id,
    },
  });

  //   invalid한 url일 경우 404페이지 띄움
  if (!data) {
    return { notFound: true };
  }

  console.log("data: ", data);

  return {
    props: {
      loadedUser: data,
    },
    revalidate: 1, // 단위: 초
  };
};

export default UserDetail;
