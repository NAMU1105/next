import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { gql, useMutation } from "@apollo/client";
// import { getSession } from "next-auth/client";

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

const Auth: React.FC<IF> = (props: IF) => {
  const [isLoginMode, setLoginMode] = useState<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const router = useRouter();

  const toggleLoginMode = () => {
    setLoginMode((prev) => !prev);
  };

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
    if (data) {
      alert("loged in");
    } else {
      alert("login failed");
    }
  };
  const [logIn] = useMutation(LOG_IN, { onCompleted: logInCompleted });

  const execLogIn = (loginInputs) => {
    debugger;
    console.log(loginInputs);
    try {
      logIn({
        variables: {
          input: loginInputs,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       router.replace("/");
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

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
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            isLoginMode ? execLogIn(loginInputs) : execSignUp(inputs);
          }, 300);
        }}
      >
        {({ errors, touched, handleSubmit, isSubmitting }) => (
          <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <>
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
              </>
            )}
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
      <Button
        type="button"
        onClick={toggleLoginMode}
        size="sm"
        bgColor="secondary"
      >
        Change mode
      </Button>
    </>
  );
};
export default Auth;
