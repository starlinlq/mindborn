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
import * as actionTypes from "../../store/post/actionTypes";
import { toast } from "react-toastify";
import socket from "../../socket/socket";
import { useEffect } from "react";
import * as userActions from "../../store/user/actionType";

const commentSchema = Yup.object().shape({
  comment: Yup.string()
    .min(3, "3 characters minumum")
    .max(500, "500 characters minimum")
    .required(),
});

type Props = {
  id: string;
  addReply?: Function;
  recieverId?: string;
};

export default function CreateComment({ id, addReply, recieverId }: Props) {
  const dispatch: Dispatch<any> = useDispatch();
  const { user } = useSelector((state: RootState) => state);

  const handleForm = async (values: any, { resetForm }: any) => {
    if (addReply) {
      dispatch({ type: actionTypes.ADD_COMMNET_COUNT_REPLY, payload: id });

      addReply(values.comment);
      return;
    }

    await sendNotification();
    dispatch(createComment(values.comment, id));
    resetForm();
  };
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: handleForm,
  });

  useEffect(() => {}, []);

  const sendNotification = async () => {
    let data = {
      sender: user.id,
      reciever: recieverId || "",
      type: "comment",
      notification: "Commented on your post",
      belongsTo: id,
    };
    try {
      await agent.post.sendNotification(data);
      socket.emit("sendNotification", {
        ...data,
        sender: {
          id: user.id,
          username: user.username,
          photourl: user.photourl,
        },
      });
      socket.once("getNotification", (notification) => {
        dispatch({
          type: userActions.ADD_NOTIFICATION,
          payload: notification,
        });
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
