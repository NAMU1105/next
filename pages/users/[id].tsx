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
    return <p>User name:</p>;
  }
};

// This function gets called at build time
export async function getStaticPaths() {
  // console.log("getStaticPaths!!");

  const apolloClient = initializeApollo();

  const { data, error } = await apolloClient.query({
    query: GET_USERS_ID,
  });

  // console.log(data);
  const ids = data.users.map((u) => u.id);
  const pathsWithParams = ids.map((id) => ({ params: { id } }));

  return {
    //빌드 타임 때 아래 정의한  /dyna/1,  /dyna/2, ... /dyna/동적인값 경로만 pre렌더링.
    paths: pathsWithParams,
    // [
    //   { params: { id: "0" } },
    //   { params: { id: "1" } },
    //   { params: { id: "2" } },
    // ],
    // 만들어지지 않은 것도 추후 요청이 들어오면 만들어 줄지 여부.
    // fallback: "blocking",
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  console.log("re-generating!!");

  const { params } = context;
  const id = params.id;
  const apolloClient = initializeApollo();

  if (!id) {
    return;
  }

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

  return {
    props: {
      loadedUser: data,
    },
    revalidate: 1, // 단위: 초
  };
};

export default UserDetail;
