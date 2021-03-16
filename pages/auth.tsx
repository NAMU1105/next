import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { gql, useQuery, useMutation } from "@apollo/client";

import { SignupSchema, LoginSchema } from "../utils/validator";

import { Input } from "../components/form/input";
import Button from "../components/form/button";

interface IF {}

const LOG_IN = gql`
  query logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      name
    }
  }
`;

const SIGN_UP = gql`
  mutation signUp(
    $id: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(id: $id, name: $name, email: $email, password: $password) {
      id
      name
      color
    }
  }
`;

const Auth: React.FC<IF> = (props: IF) => {
  const [isLoginMode, setLoginMode] = useState(true);

  // const getUsers = () => {
  //   const GET_USERS = gql`
  //     query users {
  //       users {
  //         id
  //         name
  //       }
  //     }
  //   `;
  //   const { loading, error, data } = useQuery(GET_USERS);
  //   if (data) console.log(data);
  //   console.log(loading);
  // };

  // getUsers();
  // 회원가입

  const signUpCompleted = (data) => {
    console.log(data);
  };
  const [singUp] = useMutation(SIGN_UP, { onCompleted: signUpCompleted });
  // const [singUp, { loading, error, data }] = useMutation(SIGN_UP);

  const execSignUp = (email, firstName, password) => {
    singUp({
      variables: {
        id: email,
        name: firstName,
        email: email,
        password: password,
      },
    });
  };

  //로그인
  // const [singUp, { loading, error, data }] = useMutation(LOG_IN);
  // if (error) console.log(error);
  // if (data) console.log(data);

  // const logIn = (email, password) => {
  //   const { loading, error, data } = useQuery(LOG_IN, {
  //     variables: { email: email, password: password },
  //   });
  //   if (loading) console.log("loading:", loading);
  //   // console.log("error:", error);
  //   if (data) console.log("data:", data);
  //   return data;
  // };

  // logIn(); // 이렇게 하면 잘 됨

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
            // singUp({
            //   variables: {
            //     id: values.email,
            //     name: values.firstName,
            //     email: values.email,
            //     password: values.password,
            //   },
            // });
            execSignUp(values.email, values.firstName, values.password);

            // isLoginMode
            //   ? logIn(values.email, values.password)
            //   : signUp(
            //       values.email,
            //       values.email,
            //       values.firstName,
            //       values.password
            //     );
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
