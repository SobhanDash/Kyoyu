import React, { useEffect, useState } from "react";
import useForm from "../../services/useForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faCamera } from "@fortawesome/free-solid-svg-icons";
import nodpImg from "../../images/nodp.jpg";
import css from "./profile.module.css";

const feed = <FontAwesomeIcon icon={faTh} />;
const camera = <FontAwesomeIcon icon={faCamera} />;

const UserProfile = () => {
  // eslint-disable-next-line no-unused-vars
  const [isProfile, setIsProfile] = useState(true);
  const { getProfile, profile, userposts, setUserPosts } = useForm();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts/getsubpost", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserPosts(result.posts);
      });
  }, [setUserPosts]);

  return (
    <section className={css.profileContainer}>
      <div>
        <Sidebar isProfile={isProfile} />
      </div>
      <div className={css.profileData}>
        {/* Profile Image */}
        <div className={css.profile}>
          <div className={css.profileImg}>
            {profile.profilePic !== null ? (
              <img src={profile.profilePic} alt="" />
            ) : (
              <img src={nodpImg} alt={profile.username} />
            )}
            {/* <img src={nodpImg} alt={profile.username} /> */}
          </div>
          <div className={css.name}>
            <h1>{profile.name}</h1>
          </div>
          <span>@{profile.username}</span>
        </div>

        {/* About */}
        <div className={css.about}>
          <div className={css.box}>
            <h3>{profile.posts.length}</h3>
            <span>Posts</span>
          </div>
          <div className={css.box}>
            <h3>{profile.followers.length}</h3>
            <span>Followers</span>
          </div>
          <div className={css.box}>
            <h3>{profile.following.length}</h3>
            <span>Following</span>
          </div>
        </div>

        {/* Posts */}
        <div className={css.posts}>
          <h4>
            <span className={css.icon}>{feed}</span> POSTS
          </h4>
          <div className={css.postContainer}>
            {profile.posts.length !== 0 &&
              userposts.map((post) => {
                return (
                  <div className={css.card} key={post._id}>
                    <img src={post.image} alt={post.caption} />
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

export default UserProfile;
