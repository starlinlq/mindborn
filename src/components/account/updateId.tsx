import { useDispatch } from "react-redux";
import { Input, Button } from "../../styles/global";
import { Title } from "../menu/menu.styles";
import { Form } from "./edit.styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import * as actionTypes from "../../store/user/actionType";

const updatePassSchema = Yup.object().shape({
  newId: Yup.string().min(4).max(15).required(),
  currentPassword: Yup.string().min(8).max(15).required(),
});

type Props = {
  setSelected: Function;
};

export default function UpdateId({ setSelected }: Props) {
  const dispatch = useDispatch<Dispatch<any>>();
  const formik = useFormik({
    initialValues: {
      newId: "",
      currentPassword: "",
    },
    validationSchema: updatePassSchema,
    onSubmit: handleForm,
  });

  async function handleForm(values: any, { resetForm }: any) {
    try {
      await agent.user.updateId(values);
      toast.info("id updated");
      setSelected("");
      resetForm();
      dispatch({ type: actionTypes.UPDATE_ID, payload: values.newId });
    } catch (error: any) {
      resetForm();
      toast.error(error.msg);
    }
  }
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Title style={{ padding: "0" }}>Update your ID</Title>
      <Input
        type="password"
        minLength={4}
        maxLength={15}
        value={formik.values.currentPassword}
        name="currentPassword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Current password"
        style={{ border: "1px solid #1C1C1C", margin: "10px 0" }}
      />
      <Input
        type="text"
        minLength={7}
        maxLength={15}
        value={formik.values.newId}
        name="newId"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="New ID"
        style={{ border: "1px solid #1C1C1C", margin: "10px 0" }}
      />
      <Button type="submit" width="150px" padding="8px" margin="0">
        Save
      </Button>
    </Form>
  );
}
