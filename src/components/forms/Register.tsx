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

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  password: Yup.string().required(),
  userid: Yup.string().required(),
});

export default function Register() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userid: "",
      name: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);

      alert(JSON.stringify(values, null, 2));
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
            name="userid"
            type="text"
            placeholder="ID - must be unique"
            value={formik.values.userid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            borderColor={
              formik.errors.userid && formik.touched.userid ? "red" : "#eff6ff"
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