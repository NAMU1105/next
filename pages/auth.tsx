import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { gql, useMutation } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { SignupSchema, LoginSchema } from "../utils/validator";

import { Input } from "../components/form/input";
import Button from "../components/form/button";

interface IF {}

const LOG_IN = gql`
  mutation logIn($input: LogInInput!) {
    logIn(input: $input) {
      id
      firstName
    }
  }
`;

const SIGN_UP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      id
      firstName
    }
  }
`;

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const Auth: React.FC<IF> = (props: IF) => {
  const [isLoginMode, setLoginMode] = useState(false);
  // const [inputs, setInputs] = useState({
  //   email: "",
  //   password: "",
  //   firstName: "",
  //   lastName: "",
  // });
  // const [loginInputs, setLoginInputs] = useState({
  //   email: "",
  //   password: "",
  // });
  // const [login, loginResult] = useMutation(LOG_IN);

  // 회원가입
  const signUpCompleted = (data) => {
    console.log(data);
  };
  const [signUp] = useMutation(SIGN_UP, { onCompleted: signUpCompleted });

  const execSignUp = (inputs) => {
    console.log(inputs);
    // debugger;
    signUp({
      variables: { input: inputs },
    });
  };

  // 로그인
  const logInCompleted = (data) => {
    console.log(data);
  };
  const [logIn] = useMutation(LOG_IN, { onCompleted: logInCompleted });

  const execLogIn = (loginInputs) => {
    console.log(loginInputs);
    logIn({
      variables: {
        input: loginInputs,
      },
    });
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
          // console.log(values);
          let loginInputs;
          let inputs;
          // set Input values
          if (isLoginMode) {
            // setLoginInputs({ email: values.email, password: values.password });
            loginInputs = {
              email: values.email,
              password: values.password,
            };
          } else {
            // setInputs({
            //   email: values.email,
            //   password: values.password,
            //   firstName: values.firstName,
            //   lastName: values.lastName,
            // });

            inputs = {
              email: values.email,
              password: values.password,
              firstName: values.firstName,
              lastName: values.lastName,
            };
          }

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            isLoginMode ? execLogIn(loginInputs) : execSignUp(inputs);
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
