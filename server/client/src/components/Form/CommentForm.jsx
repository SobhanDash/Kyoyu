/* eslint-disable eqeqeq */
import { useState } from "react";
import css from "./form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const cancelIcon = <FontAwesomeIcon icon={faTimes} />;
const CommentForm = ({
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  post,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state.postReducer.isLoading,
    shallowEqual
  );
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actionCreators.addComment(post._id, text));
    setText("");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
