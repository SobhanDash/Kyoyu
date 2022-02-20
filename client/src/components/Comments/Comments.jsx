import React, { useEffect } from "react";
import css from "./comments.module.css";
import CommentForm from "../Form/CommentForm";
import Comment from "../Comments/Comment";
import { getComments as getCommentsApi } from "../Comments/api";
import useForm from "../../services/useForm";

const Comments = ({ commentsUrl, currentUserId }) => {
  const {
    activeComment,
    setActiveComment,
    setBackendComments,
    getReplies,
    addComment,
    deleteComment,
    updateComment,
    rootComments,
  } = useForm();

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(rootComments);
  return (
    <div className={css.commentSection}>
      <header className={css.cname}>Comments</header>
      <CommentForm submitLabel="Post" handleSubmit={addComment} />
      <div className={css.comments_container}>
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
