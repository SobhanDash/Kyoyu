import { useState } from "react";
import css from "./form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const cancelIcon = <FontAwesomeIcon icon={faTimes} />;
const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
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
    // <form className={css.cinputdiv}>
    //           <input
    //             type="text"
    //             placeholder="Write Your comment Here"
    //             className={css.cip}
    //             name="comment"
    //             id="comment"
    //             onChange={handleComment}
    //           />
    //           <button className={css.cpost}>Post</button>
    //         </form>
  );
};

export default CommentForm;
