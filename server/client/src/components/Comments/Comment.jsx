import React from "react";
import nodpImg from "../../images/nodp.jpg";

import css from "./comments.module.css";

const Comment = ({ comment, currentUserId }) => {
  // const canDelete = currentUserId === comment.user._id;

  //  const deleteComment = (commentId) => {
  //    if (window.confirm("Are you sure you want to remove comment?")) {
  //      deleteCommentApi().then(() => {
  //        const updatedBackendComments = backendComments.filter(
  //          (backendComment) => backendComment.id !== commentId
  //        );
  //        setBackendComments(updatedBackendComments);
  //      });
  //    }
  //  };

  return (
    <div key={comment.id} className={css.comment}>
      <div className={css.comment_image_container}>
        <img src={nodpImg} alt="" />
      </div>
      <div className={css.comment_right_part}>
        <div className={css.comment_content}>
          <div className={css.comment_author}>{comment.user.username}</div>
        </div>
        <div className={css.comment_text}>{comment.comment}</div>
        {/* <div className={css.comment_actions}>
          {canDelete && (
            <div
              className={css.comment_action}
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Comment;
