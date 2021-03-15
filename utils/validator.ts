import * as Yup from "yup";

// error message에는 LocalizedStrings배열에 해당하는 키값을 넣어준다.
export const TestSchema = Yup.object().shape({
  email: Yup.string().email("invalidEmail").required("required"),
});
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("invalidEmail").required("required"),
  password: Yup.string().required("required"),
});
export const SignupSchema = Yup.object().shape({
  email: Yup.string().email("invalidEmail").required("required"),
  password: Yup.string()
    .min(10, "tooShort")
    .max(15, "tooLong")
    .required("required"),
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  // isAgreed: Yup.boolean().required("required").oneOf([true], "mustAgree"),
});
export const ConfirmEmailSchema = Yup.object().shape({
  strConfirmEmailFirst: Yup.string().required(null),
  strConfirmEmailSecond: Yup.string().required(null),
  strConfirmEmailThird: Yup.string().required(null),
  strConfirmEmailFourth: Yup.string().required(null),
  strConfirmEmailFifth: Yup.string().required(null),
  strConfirmEmailSixth: Yup.string().required(null),
});
