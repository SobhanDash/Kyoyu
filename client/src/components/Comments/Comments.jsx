import React, { useContext } from "react";
import css from "./comments.module.css";
import CommentForm from "../Form/CommentForm";
import Comment from "../Comments/Comment";
import { UserContext } from "../../App";
import useForm from "../../services/useForm";

const Comments = ({ profile, userposts, post, setUserPosts }) => {
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
        {/* {console.log("post.comments", post.comments)} */}
        {post.comments.map((rootComment) => (
          // console.log(state)
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
