// import Head from "next/head";
// import { from } from "apollo-link";
// import { useEffect } from "react";
// import { initializeApollo } from "../lib/apolloClient";
// import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
// import { GET_PEOPLE, GET_PEOPLE_PAGENATED } from "../lib/queries/users";
// let isMonted = false;
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as yup from "yup";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ko from "../public/locales/ko/common";
import en from "../public/locales/en/common";

import Button from "../components/form/button";

const Home = (props) => {
  const router = useRouter();
  const { locale } = router;
  // console.log(props._nextI18Next.initialI18nStore.ko.common);
  console.log(locale);

  // const { data, error, loading } = useQuery(GET_PEOPLE);
  // console.log(data);

  // const { t } = useTranslation("common");
  // console.log(t("title"));
  const t = locale === "en" ? en : ko;

  return (
    <>
      <h1>index page</h1>
      <Link href="/" locale={router.locale === "en" ? "ko" : "en"}>
        <a>
          {/* <Button bgColor="secondary">{t("h1")}</Button> */}
          <Button bgColor="secondary">{t.h1}</Button>
        </a>
      </Link>
      <Link href="/auth">
        <a>
          {/* <Button>{t("title")}</Button> */}
          <Button>{t.title}</Button>
        </a>
      </Link>

      {/* 파일 업로드 */}
      <div className="container">
        <Formik
          initialValues={{ file: null }}
          onSubmit={(values) => {
            alert(
              JSON.stringify(
                {
                  fileName: values.file.name,
                  type: values.file.type,
                  size: `${values.file.size} bytes`,
                },
                null,
                2
              )
            );
          }}
          validationSchema={yup.object().shape({
            file: yup.mixed().required(),
          })}
          render={({ values, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="file">File upload</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    className="form-control"
                  />
                  {/* <Thumb file={values.file} /> */}
                </div>
                <Button type="submit" size="sm">
                  submit
                </Button>
              </form>
            );
          }}
        />
      </div>
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
// export const getStaticProps = async ({ locale }) => ({
//   // export const getStaticProps = async ({ locale = "ko" }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });
export default Home;
