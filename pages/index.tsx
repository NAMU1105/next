// import Head from "next/head";
// import { from } from "apollo-link";
// import { useEffect } from "react";
// import { initializeApollo } from "../lib/apolloClient";
// import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
// import { GET_PEOPLE, GET_PEOPLE_PAGENATED } from "../lib/queries/users";
// let isMonted = false;
import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from "../components/form/button";

const Home = () => {
  // const { data, error, loading } = useQuery(GET_PEOPLE);
  // console.log(data);
  const router = useRouter();
  const { t } = useTranslation("common");

  const buttonText = t("title");

  return (
    <>
      <h1>index page</h1>
      <Link href="/" locale={router.locale === "en" ? "ko" : "en"}>
        <button>{t("h1")}</button>
      </Link>
      <Link href="/auth">
        <button
          type="button"
          className="bg-indigo-500 rounded shadow-lg p-2 text-white block"
        >
          {t("title")}
        </button>
        {/* <Button>{t("title")}</Button> */}
      </Link>
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
export const getStaticProps = async ({ locale = "ko" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
export default Home;
