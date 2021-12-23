import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTh,
  faSearch,
  faPlus,
  faUser,
  faBell,
  faPaperPlane,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import css from "./Sidebar.module.css";
import useForm from "../Form/useForm";
import nodpImg from "../../images/nodp.jpg";

const feed = <FontAwesomeIcon icon={faTh} />;
const explore = <FontAwesomeIcon icon={faSearch} />;
const addPost = <FontAwesomeIcon icon={faPlus} />;
const profileIcon = <FontAwesomeIcon icon={faUser} />;
const notification = <FontAwesomeIcon icon={faBell} />;
const message = <FontAwesomeIcon icon={faPaperPlane} />;
const logout = <FontAwesomeIcon icon={faSignOutAlt} />;

const Sidebar = ({ setShow, isProfile }) => {
  const history = useHistory();
  const location = useLocation();
  const { getProfile, profile } = useForm();

  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   getProfile();
  // }, [getProfile]);

  const onLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <>
      <div className={css.sidebar}>
        <div className={css.logo}>
          <h1>Kyoyu</h1>
        </div>
        {/* profile img */}
        <div className={css.profile}>
          <div className={css.profile_img}>
            {/* {profile.profilePic !== null ? (
              <img src={profile.profilePic} alt={profile.username} />
            ) : (
              <img src={nodpImg} alt={profile.username} />
            )} */}
            <img src={nodpImg} alt={profile.username} />
          </div>
          <div className={css.name}>
            <h1>{profile.name}</h1>
          </div>
          <div className={css.pro_username}>
            <span>@{profile.username}</span>
          </div>
        </div>
        {/* about */}
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
        {/* menu */}
        <div className={css.menu}>
          <Link to="/" className={location.pathname === "/" ? css.active : ""}>
            <span className={css.icon}>{feed}</span>
            <div className={css.icon_func}>Feed</div>
          </Link>
          <Link
            to="/profile"
            className={
              location.pathname === "/profile" ||
              location.pathname === "/editProfile"
                ? css.active
                : ""
            }
          >
            <span className={css.icon}>{profileIcon}</span>
            <div className={css.icon_func}>Profile</div>
          </Link>
          {!isProfile && (
            <Link to={location.pathname} onClick={() => setShow(true)}>
              <span className={css.icon}>{addPost}</span>
              <div className={css.icon_func}>Add Post</div>
            </Link>
          )}
          <Link to="/">
            <span className={css.icon}>{notification}</span>
            <div className={css.icon_func}>Notification</div>
          </Link>
          <Link to="/">
            <span className={css.icon}>{message}</span>
            <div className={css.icon_func}>Message</div>
          </Link>
          <a href="/" onClick={onLogout}>
            <span className={css.icon}>{logout}</span>
            <div className={css.icon_func}>Log Out</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
