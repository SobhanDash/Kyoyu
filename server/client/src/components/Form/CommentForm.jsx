/* eslint-disable eqeqeq */
import { useState } from "react";
import css from "./form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const cancelIcon = <FontAwesomeIcon icon={faTimes} />;
const CommentForm = ({
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  post,
  userposts,
  setUserPosts,
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const addComment = (text, postId) => {
    fetch("/api/posts/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = userposts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setUserPosts(newData);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(text, post._id);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className={css.cinputdiv}>
      <textarea
        className={css.cip}
        value={text}
        placeholder="Write Your comment Here"
        onChange={(e) => setText(e.target.value)}
      />
      <button className={css.cpost} disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className={`${css.cpost} ${css.comment_form_cancel_button}`}
          onClick={handleCancel}
        >
          {cancelIcon}
        </button>
      )}
    </form>
  );
};

export default CommentForm;
