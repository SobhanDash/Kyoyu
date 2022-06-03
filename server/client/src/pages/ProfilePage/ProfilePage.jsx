import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faCamera } from "@fortawesome/free-solid-svg-icons";
import nodpImg from "../../images/nodp.jpg";
import css from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const feed = <FontAwesomeIcon icon={faTh} />;
const camera = <FontAwesomeIcon icon={faCamera} />;

const ProfilePage = () => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, profile, isLoading } = useSelector(
    (state) => state.userReducer
  );

  const redirectToPost = (id) => {
    history.push(`/post/${id}`);
  };
  const onEditClick = (e) => {
    e.preventDefault();
    history.push("/editprofile");
  };

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      dispatch(actionCreators.getProfile());
    }
  }, [dispatch, history, user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className={css.profileContainer}>
      <div>
        <Sidebar isProfile={profile} />
      </div>
      <div className={css.profileData}>
        {/* Profile Image */}
        <div className={css.profile}>
          <div className={css.profileImg}>
            {profile.about.profilepic !== null ? (
              <img src={profile.about.profilepic} alt="" />
            ) : (
              <img src={nodpImg} alt={profile.username} />
            )}
          </div>
          <div className={css.details}>
            <div className={css.pbtns}>
              <div className={css.uname}>
                <h1>@{profile.username}</h1>
              </div>

              <button className={css.epl} onClick={onEditClick}>
                Edit Profile
              </button>
            </div>
            <div className={css.about}>
              <h2 className={css.name}>{profile.name}</h2>
              <p className={css.about__text}>{profile.about.bio}</p>
            </div>
          </div>
        </div>

        {/* Numbers */}
        <ul className={css.numbers}>
          <li className={css.box} aria-label=" posts ">
            <h3>{profile.posts.length}</h3>
            <span>Posts</span>
          </li>
          <li
            className={css.box}
            aria-label=" followers "
            onClick={() => history.push("/followers")}
          >
            <h3>{profile.followers.length}</h3>
            <span>Followers</span>
          </li>
          <li
            className={css.box}
            aria-label=" following "
            onClick={() => history.push("/following")}
          >
            <h3>{profile.following.length}</h3>
            <span>Following</span>
          </li>
        </ul>

        {/* Posts */}
        <div className={css.posts}>
          <h4>
            <span className={css.icon}>{feed}</span> POSTS
          </h4>
          <div className={css.postContainer}>
            {profile.posts.length !== 0 &&
              profile.posts.map((post) => {
                // const timeDif = (new Date().getTime() - post.createdAt);
                return (
                  <div
                    className={css.card}
                    key={post._id}
                    onClick={() => redirectToPost(post._id)}
                  >
                    <img src={post.image} alt={post.caption} />
                    {/* {timeDif < 60000 && <p>{((new Date().getTime() - post.createdAt) / 1000).toFixed(0)} seconds ago</p>}
                    {(timeDif >= 60000 && timeDif < 3.6e+6) && <p>{((new Date().getTime() - post.createdAt) / 60000).toFixed(0)} minutes ago</p>}
                    {(timeDif >= 3.6e+6 && timeDif < 8.64e+7) && <p>{((new Date().getTime() - post.createdAt) / 3.6e+6).toFixed(0)} hours ago</p>}
                    {(timeDif >= 8.64e+7 && timeDif < 6.048e+8) && <p>{((new Date().getTime() - post.createdAt) / 8.64e+7).toFixed(0)} days ago</p>}
                    {timeDif >= 6.048e+8 && <p>{((new Date().getTime() - post.createdAt) / 6.048e+8).toFixed(0)} weeks ago</p>} */}
                  </div>
                );
              })}
          </div>
          {profile.posts.length === 0 && (
            <div className={css.no_post_container}>
              <div className={css.cameraContainer}>
                <span className={css.iconCamera}>{camera}</span>
              </div>
              <p className={css.noPost}>No Posts Yet</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
