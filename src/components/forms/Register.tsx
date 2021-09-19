import React from "react";
import { Section } from "./form.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form,
  FormTitle,
  IconWrapper,
  Input,
  InputWrapper,
  Label,
} from "../../styles/global";
import { FaUserLock, FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { registerUser } from "../../store/user/actionCreators";

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required().min(3).max(15),
  password: Yup.string().required().min(6).max(15),
  username: Yup.string().required().min(3).max(15),
});

export default function Register() {
  const dispatch = useDispatch<Dispatch<any>>();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      name: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <Section
      style={{
        display: "flex",
        alignItems: "center",
        height: "70vh",
        justifyContent: "center",
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <FormTitle>Sign up</FormTitle>
        <InputWrapper>
          <IconWrapper>
            <FaUserLock />
          </IconWrapper>
          <Input
            name="username"
            type="text"
            placeholder="USER ID - must be unique"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            borderColor={
              formik.errors.username && formik.touched.username
                ? "red"
                : "#eff6ff"
            }
          />
        </InputWrapper>

        <InputWrapper>
          <IconWrapper>
            <FaUserTie />
          </IconWrapper>
          <Input
            name="name"
            type="text"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            borderColor={
              formik.errors.name && formik.touched.name ? "red" : "#eff6ff"
            }
          />
        </InputWrapper>

        <InputWrapper>
          <IconWrapper>@</IconWrapper>
          <Input
            name="email"
            type="email"
            placeholder={
              formik.errors.email && formik.touched.email
                ? `${formik.errors.email}`
                : "email"
            }
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            borderColor={
              formik.errors.email && formik.touched.email ? "red" : "#eff6ff"
            }
          />
        </InputWrapper>

        <InputWrapper>
          <IconWrapper>
            <RiLockPasswordFill />
          </IconWrapper>
          <Input
            name="password"
            type="password"
            placeholder="Password - min 6 characters"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            borderColor={
              formik.errors.password && formik.touched.password
                ? "red"
                : "#eff6ff"
            }
          />
        </InputWrapper>
        <Button type="submit" margin="" main padding="10px" width="100%">
          SIGN UP
        </Button>
      </Form>
    </Section>
  );
}
