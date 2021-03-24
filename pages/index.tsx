// import Head from "next/head";
// import { from } from "apollo-link";
// import { useEffect } from "react";
// import { initializeApollo } from "../lib/apolloClient";
// import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
// import { GET_PEOPLE, GET_PEOPLE_PAGENATED } from "../lib/queries/users";
// let isMonted = false;

const Home = () => {
  // const { data, error, loading } = useQuery(GET_PEOPLE);
  // console.log(data);

  return (
    <>
      {/* <h1>{data.users[0].name}</h1> */}
      <h1>index page</h1>
    </>
  );
};

// export async function getStaticProps() {
//   const response = await fetch("http://localhost:3000/api/graphql", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ query: "{ users { id name color } }" }),
//   });
//   const { data } = await response.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default Home;
