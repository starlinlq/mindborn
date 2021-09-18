import { Input, Button } from "../../styles/global";
import { Title } from "../menu/menu.styles";
import { Form } from "./edit.styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import agent from "../../api/agent";
import { toast } from "react-toastify";

const updatePassSchema = Yup.object().shape({
  newPassword: Yup.string().min(5).required(),
  currentPassword: Yup.string().min(6).max(15).required(),
  confirmPassword: Yup.string().min(6).max(15).required(),
});

type Props = {
  setSelected: Function;
};
export default function UpdatePassword({ setSelected }: Props) {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePassSchema,
    onSubmit: handleForm,
  });

  async function handleForm(
    { currentPassword, newPassword, confirmPassword }: any,
    { resetForm }: any
  ) {
    if (newPassword === confirmPassword) {
      try {
        await agent.user.updatePassword({
          currentPassword,
          newPassword,
        });
        resetForm();
        toast.info("password updated");
        setSelected("");
      } catch (error: any) {
        toast.error(error.msg);
      }
    }
  }
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Title style={{ padding: "0" }}>Update your password</Title>
      <Input
        type="password"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        name="currentPassword"
        placeholder="Current password"
        style={{ border: "1px solid #1C1C1C", margin: "10px 0" }}
        onBlur={formik.handleBlur}
      />
      <Input
        minLength={8}
        onBlur={formik.handleBlur}
        maxLength={15}
        type="password"
        value={formik.values.newPassword}
        name="newPassword"
        placeholder="New password"
        onChange={formik.handleChange}
        style={{ border: "1px solid #1C1C1C", margin: "10px 0" }}
        borderColor={
          formik.errors.newPassword && formik.touched.newPassword
            ? "red"
            : "#eff6ff"
        }
      />
      <Input
        minLength={8}
        maxLength={15}
        type="password"
        value={formik.values.confirmPassword}
        onBlur={formik.handleBlur}
        name="confirmPassword"
        placeholder="Confim password"
        borderColor={
          formik.errors.confirmPassword && formik.touched.confirmPassword
            ? "red"
            : "#eff6ff"
        }
        onChange={formik.handleChange}
        style={{ border: "1px solid #1C1C1C", margin: "10px 0" }}
      />
      <Button type="submit" width="150px" padding="8px" margin="0">
        Save
      </Button>
    </Form>
  );
}
