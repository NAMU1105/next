// import Head from "next/head";
// import { from } from "apollo-link";
import React from "react";
const Home = ({ data }) => {
  return (
    <>
      <h1>{data.users[0].name}</h1>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query: "{ users { id name color } }" }),
  });
  const { data } = await response.json();

  return {
    props: {
      data,
    },
  };
}

export default Home;
