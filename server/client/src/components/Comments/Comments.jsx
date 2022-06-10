import React, { useEffect } from "react";
import css from "./comments.module.css";
import CommentForm from "../Form/CommentForm";
import Comment from "../Comments/Comment";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

const Comments = ({ profile, post }) => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const comments = useSelector(
    (state) => state.postReducer.comments,
    shallowEqual
  );

  useEffect(() => {
    dispatch(actionCreators.getComments(post._id));
  }, [dispatch, post.comments.length, post._id]);

  return (
    <div className={css.commentSection}>
      <header className={css.cname}>Comments</header>
      {/* handleSubmit={addComment} */}
      <CommentForm submitLabel="Post" profile={profile} post={post} />
      <div className={css.comments_container}>
        {comments.map((rootComment) => {
          return (
            <Comment
              key={rootComment._id}
              comment={rootComment}
              currentUserId={rootComment.user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
