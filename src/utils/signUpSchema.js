import * as yup from "yup";

export const schema = yup.object().shape({
  Name: yup.string().required(),
  Email: yup.string().required().email().max(30),
  Password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  "Confirm Password": yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
});
