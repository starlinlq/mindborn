import React, { useState } from "react";
import { InputWrapper, Input, Button, Wrapper } from "../../styles/global";
import {
  CreateWrapper,
  Form,
  Description,
  Category,
  Option,
} from "./create.style";
import { useFormik } from "formik";
import * as Yup from "yup";

const createSchema = Yup.object().shape({
  category: Yup.string().required(),
  title: Yup.string()
    .max(50, "title must be 50 character or less")
    .min(5, "title must be 5 characters or more")
    .required(),
  description: Yup.string().max(1000, "title must be 1000 character or less"),
});

export default function Create() {
  const handleForm = (values: any) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
    validationSchema: createSchema,
    onSubmit: handleForm,
  });
  return (
    <CreateWrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Category
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <Option value="">Select Category</Option>
          <Option value="opinion">Opinion</Option>
          <Option value="descussion">Discusion</Option>
          <Option value="life">Life</Option>
        </Category>

        <InputWrapper>
          <Input
            placeholder="Title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            maxLength={60}
            borderColor={
              formik.errors.title && formik.touched.title ? "red" : "#eff6ff"
            }
          />
        </InputWrapper>
        <Description
          name="description"
          placeholder="Description (optional)"
          maxLength={1000}
          cols={10}
          rows={10}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        <Button
          type="button"
          width="100px"
          margin="15px 0"
          padding="0"
          height="35px"
        >
          SAVE DRAFT
        </Button>
        <Button
          type="submit"
          main
          width="100px"
          margin="0 5px"
          padding="0px"
          height="35px"
          disabled={formik.isSubmitting}
        >
          POST
        </Button>
      </Form>
    </CreateWrapper>
  );
}
