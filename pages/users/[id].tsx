import { useEffect } from "react";
import { useRouter } from "next/router";
// import { gql } from "@apollo/client";

import { initializeApollo } from "../../lib/apolloClient";
import { request } from "graphql-request";
import { fetcher } from "../../lib/fetcher";
import {
  GET_ALL_USERS,
  GET_USERS_ID2,
  GET_USERS_ID,
  GET_USER_BY_ID,
  GET_USER_BY_ID2,
  GET_USER_PROFILE,
} from "../../lib/queries/users";
import useSWR from "swr";

// const fetcher = (query, variables) => {
//   console.log(query, variables);
//   return request(API_ENDPOINT, query, variables);
// };
// const fetcher = (url) => fetch(url).then((res) => res.json());
// const fetcher = (query) => request(API_ENDPOINT, query);

let mounted = false;

const UserDetail = ({ loadedUser }) => {
  const router = useRouter();
  const id = router.query.id;
  // const apolloClient = initializeApollo();
  // const variables = { code: 14 };

  // const { data: picture, error } = useSWR(
  //   "https://picsum.photos/v2/list?page=2&limit=1",
  //   fetcher,
  //   {
  //     refreshInterval: 1000,
  //   }
  // );
  // console.log("img: ", picture[0]);

  //   console.log(router);
  //   console.log(router.pathname);
  //   console.log(router.query);
  //   console.log(router.query.id);
  // const getData = async () => {
  //   const { data, error } = await apolloClient.query({
  //     query: GET_USER_BY_ID,
  //     variables: {
  //       id,
  //     },
  //   });
  //   console.log("client side: ", data);
  // };

  useEffect(() => {
    // getData();
    mounted = true;
  }, []);

  if (!loadedUser) return <p>Loading...</p>;

  if (loadedUser.userByID) {
    // if (mounted) {
    // Client side data fetching with SWR
    // console.log("env: ", process.env.GRAPHQL_END_POINT);

    // const { data, error } = useSWR(
    //   GET_ALL_USERS,
    //   (query) => request(process.env.GRAPHQL_END_POINT, query)
    // request(process.env.REACT_APP_GRAPHQL_END_POINT, query)
    // );
    const { data, error } = useSWR(
      [GET_USER_PROFILE, id],
      (query, id) => request(process.env.GRAPHQL_END_POINT, query, { id }),
      { refreshInterval: 1000 }
    );
    data && !error && console.log("useSWR: ", data.userByID.profilePicture);

    // const { data, error } = useSWR(GET_ALL_USERS, fetcher);
    // const data = await fetcher(GET_USERS_ID2);
    // const { data, error } = useSWR(
    //   `{
    //     users{
    //       id
    //       firstName
    //     }
    //   }`,
    //   fetcher
    // );
    // }

    // const { data: poke, error: pokeError } = useSWR(
    //   [GET_USER_PROFILE, variables],
    //   fetcher
    // );
    // console.log("img: ", poke);

    return (
      <>
        <p>User's first name: {loadedUser.userByID.firstName}</p>
        <p>user's job: {loadedUser.userByID.role}</p>
        {data && !error && (
          <img src={data.userByID.profilePicture} alt="profile image" />
        )}
      </>
    );
  } else {
    // console.log(loadedUser);

    return <p>No such data</p>;
  }
};

// This function gets called at build time
export async function getStaticPaths() {
  console.log("getStaticPaths!!");

  // const apolloClient = initializeApollo();
  // const { data, error } = await apolloClient.query({
  //   query: GET_USERS_ID,
  // });

  // const { data, error } = useSWR(GET_USERS_ID2, (query) =>
  //   request(API_ENDPOINT, query)
  // );
  const data = await fetcher(GET_USERS_ID2);
  console.log("getStaticPaths ~.~: ", data);

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

  if (!id) {
    return;
  }
  console.log("id: ", id);
  console.log("params: ", params);

  // 1. apollo client 쓰는 방법
  // const apolloClient = initializeApollo();
  // const { data, error } = await apolloClient.query({
  //   query: GET_USER_BY_ID,
  //   variables: {
  //     id,
  //   },
  // });

  // 2. graphql-request 쓰는 방법
  const vari = { id };
  const data = await fetcher(GET_USER_BY_ID2, vari);

  //   invalid한 url일 경우 404페이지 띄움
  if (!data) {
    return { notFound: true };
  }

  console.log("data!!: ", data);

  return {
    props: {
      loadedUser: data,
    },
    revalidate: 1, // 단위: 초
  };
};

export default UserDetail;
