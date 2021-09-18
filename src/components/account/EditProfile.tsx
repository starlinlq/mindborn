import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { LayoutWrapper } from "../../layout/layout.styles";
import { RootState } from "../../store/store";
import { Profile } from "../../store/user/userTypes";
import { Button, Input, TextArea, Wrapper } from "../../styles/global";
import { Title } from "../post/post.styles";
import { Div, EditProfileContainer } from "./edit.styles";
import { useFormik } from "formik";
import * as Yup from "yup";

const updateSchema = Yup.object().shape({
  bio: Yup.string().required(),
  name: Yup.string().required(),
  location: Yup.string().required(),
});
export default function EditProfile() {
  const { id } = useSelector((state: RootState) => state.user);
  const [state, setState] = useState({
    bio: "",
    name: "",
    location: "",
  });

  const formik = useFormik({
    initialValues: {
      bio: "",
      name: "",
      location: "",
    },
    validationSchema: updateSchema,
    onSubmit: handleForm,
  });

  async function handleForm() {}

  useEffect(() => {
    let get = async () => {
      try {
        let { profile } = await agent.user.getProfile(id);
        setState(profile);
      } catch (error: any) {
        toast.error(error.msg);
      }
    };
    get();
  }, []);
  return (
    <EditProfileContainer>
      <>
        <Title>Update your Profile</Title>
        <Wrapper width="50%">
          <Div>
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder={`Name: ${state.name}`}
            />
          </Div>

          <TextArea
            cols={10}
            rows={10}
            style={{ border: "1px solid grey" }}
            placeholder={`Bio: ${state.bio}`}
          />

          <Div>
            <Input placeholder={`Location : ${state.location}`} />
          </Div>
          <Button main width="150px" padding="10px" margin="0">
            Save
          </Button>
        </Wrapper>
      </>
    </EditProfileContainer>
  );
}
