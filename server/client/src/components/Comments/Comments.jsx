import React, { useContext } from "react";
import css from "./comments.module.css";
import CommentForm from "../Form/CommentForm";
import Comment from "../Comments/Comment";
import { UserContext } from "../../App";


const Comments = ({ profile, userposts, post, setUserPosts }) => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);

  return (
    <div className={css.commentSection}>
      <header className={css.cname}>Comments</header>
      {/* handleSubmit={addComment} */}
      <CommentForm
        submitLabel="Post"
        profile={profile}
        userposts={userposts}
        post={post}
        setUserPosts={setUserPosts}
      />
      <div className={css.comments_container}>
        {post.comments.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            currentUserId={state._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
