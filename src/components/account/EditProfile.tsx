import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { RootState } from "../../store/store";
import Spinner, { Button, Input, TextArea, Wrapper } from "../../styles/global";
import { Title } from "../post/post.styles";
import { Div, EditProfileContainer, Img } from "./edit.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as actionTypes from "../../store/user/actionType";
import { Dispatch } from "redux";

const updateSchema = Yup.object().shape({
  bio: Yup.string().required().max(150).min(10),
  name: Yup.string().required().max(15).min(2),
  location: Yup.string().required().max(15).min(2),
});
export default function EditProfile() {
  const { id } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch<any>>();
  const [profilePic, setProfilePic] = useState("");
  const [photo, setPhoto] = useState<File | any>();
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [state, setState] = useState({
    bio: "",
    name: "",
    location: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      bio: "",
      name: "",
      location: "",
    },
    validationSchema: updateSchema,
    onSubmit: handleForm,
  });

  async function handleForm(
    { bio, name, location }: { bio: string; location: string; name: string },
    { resetForm }: any
  ) {
    setUpdating(true);

    try {
      await agent.user.updateProfile({
        bio,
        name,
        location,
        photourl: profilePic,
      });
      setState({ bio, location, name });
      toast.info("profile updated");
      resetForm();

      setUpdating(false);
      dispatch({
        type: actionTypes.UPDATE_PHOTO,
        payload: { photourl: profilePic },
      });
    } catch (error: any) {
      toast.error(error.message);
      setUpdating(false);
    }
  }
  async function handleClick() {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }
  const handleFile = async (e: any) => {
    if (e.target.files[0]) {
      setUploading(true);
      let data = new FormData();
      data.append("photo", e.target.files[0]);
      try {
        let { url } = await agent.user.upload(data);
        setUploading(false);
        setProfilePic(url);
      } catch (error: any) {
        toast.error(error.messsage);
        setUploading(false);
      }
    }
  };

  useEffect(() => {
    let get = async () => {
      try {
        let { profile } = await agent.user.getProfile(id);
        setProfilePic(profile.photourl);
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
        <Title style={{ marginBottom: "20px" }}>Update your Profile</Title>
        {updating ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Wrapper width="50%" flex="flex" content="center">
              <Input
                value={photo}
                style={{ display: "none" }}
                ref={inputRef}
                accept="image/*"
                type="file"
                onChange={handleFile}
              />
              {uploading ? (
                <Spinner />
              ) : (
                <Img onClick={handleClick} src={profilePic} />
              )}
            </Wrapper>
            <Wrapper width="50%">
              <Div>
                <Input
                  name="name"
                  minLength={2}
                  maxLength={15}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder={`Name: ${state.name}`}
                />
              </Div>

              <TextArea
                minLength={10}
                maxLength={150}
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                cols={10}
                rows={10}
                style={{ border: "1px solid grey" }}
                placeholder={`Bio: ${state.bio}`}
              />

              <Div>
                <Input
                  name="location"
                  minLength={2}
                  maxLength={15}
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  placeholder={`Location : ${state.location}`}
                />
              </Div>
            </Wrapper>
            <Button type="submit" main width="150px" padding="10px" margin="0">
              Save
            </Button>
          </form>
        )}
      </>
    </EditProfileContainer>
  );
}
