import React, { useState, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { SignupSchema, LoginSchema } from "../utils/validator";

import { Input } from "../components/form/input";
import Button from "../components/form/button";

interface IF {}

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

const Auth: React.FC<IF> = (props: IF) => {
  const [isLoginMode, setLoginMode] = useState(true);

  const signUp = async (userId = "test", name, email, password) => {
    const logIn = `
    query logIn(
        $email: String!
        $password: String!
      ) {
        logIn(
          email: $email
          password: $password
        ) {
          id
          name
        }
      }`;

    const type = isLoginMode ? logIn : signUp;

    const { loading, error, data } = await client.query({
      query: gql`
        query signUp(
          $userId: String!
          $name: String!
          $email: String!
          $password: String!
        ) {
          signUp(id: $userId, name: $name, email: $email, password: $password) {
            id
            name
            color
          }
        }
      `,
      variables: { userId, name, email, password },
    });

    console.log("loading:", loading);
    console.log("error:", error);
    console.log("data:", data);

    return data;
  };
  const logIn = async (email, password) => {
    const { loading, error, data } = await client.query({
      query: gql`
        query logIn($email: String!, $password: String!) {
          logIn(email: $email, password: $password) {
            id
            name
          }
        }
      `,
      variables: { email, password },
    });

    console.log("loading:", loading);
    console.log("error:", error);
    console.log("data:", data);

    return data;
  };
  return (
    <>
      <h1>auth</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          //   isAgreed: false,
          //   isAutoLoginChecked: false,
        }}
        validationSchema={isLoginMode ? LoginSchema : SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            // 간이 통신
            isLoginMode
              ? logIn(values.email, values.password)
              : signUp(
                  values.email,
                  values.email,
                  values.firstName,
                  values.password
                );
          }, 300);
        }}
      >
        {({ errors, touched, handleSubmit, isSubmitting }) => (
          <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="firstName"
              label="firstName"
              placeholder="firstName"
            />
            <Input
              type="text"
              name="lastName"
              label="lastName"
              placeholder="lastName"
            />

            <Input
              type="email"
              name="email"
              label="email"
              placeholder="email"
            />
            <Input
              type="password"
              name="password"
              label="password"
              placeholder="password"
            />

            <Button size="sm" type="submit">
              submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Auth;
