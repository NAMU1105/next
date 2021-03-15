import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

const UserDetail = ({ loadedUser }) => {
  const router = useRouter();
  //   console.log(router);

  //   console.log(router.pathname);
  //   console.log(router.query);
  //   console.log(router.query.id);
  console.log(loadedUser);

  return <>User Detail,{loadedUser.name}</>;
};

async function getData(userId) {
  const { loading, error, data } = await client.query({
    query: gql`
      query user($userId: String!) {
        user(id: $userId) {
          id
          name
          color
        }
      }
    `,
    variables: { userId },
  });
  console.log("loading:", loading);
  console.log("error:", error);
  console.log("data:", data);

  return data;
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const userId = params.id;

  //   TODO: 나중에 진짜 백엔드 데이터 요청 코드로 바꾸기
  if (!userId) {
    return;
  }

  const data = await getData(userId);

  //   invalid한 url일 경우 404페이지 띄움
  if (!data.user) {
    return { notFound: true };
  }

  return {
    props: {
      loadedUser: data.user,
    },
  };
};

// This function gets called at build time
export async function getStaticPaths() {
  return {
    //빌드 타임 때 아래 정의한  /dyna/1,  /dyna/2, ... /dyna/동적인값 경로만 pre렌더링.
    paths: [
      { params: { id: "0" } },
      { params: { id: "1" } },
      { params: { id: "2" } },
    ],
    // 만들어지지 않은 것도 추후 요청이 들어오면 만들어 줄지 여부.
    fallback: true,
  };
}

export default UserDetail;
