import { Section } from "./form.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner, {
  Button,
  Form,
  FormTitle,
  IconWrapper,
  Input,
  InputWrapper,
} from "../../styles/global";
import { FaUserLock } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginUser } from "../../store/user/actionCreators";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const registerSchema = Yup.object().shape({
  password: Yup.string().required(),
  userid: Yup.string().required(),
});

export default function Login() {
  const dispatch: Dispatch<any> = useDispatch();
  const { user } = useSelector((state: RootState) => state);

  const handleForm = (values: any) => {
    dispatch(loginUser(values));
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      userid: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleForm,
  });

  const handleGuest = () => {
    dispatch(loginUser({ userid: "josemiguel", password: "password" }));
  };

  return (
    <Section
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      {user.loading ? (
        <Spinner />
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          <FormTitle>Sign In</FormTitle>
          <InputWrapper>
            <IconWrapper>
              <FaUserLock />
            </IconWrapper>
            <Input
              name="userid"
              type="text"
              placeholder="ID"
              value={formik.values.userid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              borderColor={
                formik.errors.userid && formik.touched.userid
                  ? "red"
                  : "#eff6ff"
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
              placeholder="Password"
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
          <Button
            main
            type="button"
            onClick={handleGuest}
            margin=""
            padding="15px"
            width="100%"
          >
            Guest
          </Button>
          <Button
            style={{ marginTop: "5px" }}
            type="submit"
            margin=""
            padding="15px"
            width="100%"
          >
            SIGN IN
          </Button>
        </Form>
      )}
    </Section>
  );
}
