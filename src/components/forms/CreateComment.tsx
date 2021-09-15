import { Section } from "./form.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextArea } from "../../styles/global";
import { loginUser } from "../../store/user/actionCreators";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { createComment } from "../../store/post/actionCreators";
import agent from "../../api/agent";

const commentSchema = Yup.object().shape({
  comment: Yup.string()
    .min(3, "3 characters minumum")
    .max(500, "500 characters minimum")
    .required(),
});

type Props = {
  id: string;
  addReply?: Function;
};

export default function CreateComment({ id, addReply }: Props) {
  const dispatch: Dispatch<any> = useDispatch();
  const { user } = useSelector((state: RootState) => state);

  const handleForm = (values: any) => {
    if (addReply) {
      addReply(values.comment);
      return;
    }
    dispatch(createComment(values.comment, id));
  };
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: handleForm,
  });
  if (user.isAuth) {
  }

  return (
    <Section
      style={{
        marginTop: "20px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <p
          style={{
            margin: "5px 0",
            fontFamily: `'Roboto', sans-serif`,
            fontSize: "12px",
            letterSpacing: "0.03em",
          }}
        >
          Comment as{" "}
          <span style={{ color: "blue", cursor: "pointer" }}>
            {user.username}
          </span>
        </p>
        <TextArea
          value={formik.values.comment}
          name="comment"
          placeholder="What are your thoughts ?"
          maxLength={500}
          cols={10}
          rows={8}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          valid={formik.errors.comment && formik.touched.comment ? true : false}
        />
        <Button
          main
          type="submit"
          width="150px"
          margin="0"
          padding="0"
          height="30px"
          disabled={formik.isSubmitting}
        >
          Comment
        </Button>
      </form>
    </Section>
  );
}
