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
import useForm from "../../services/useForm";
import nodpImg from "../../images/nodp.jpg";
import logo from "../../images/logo2.svg";
//
import {
  getComments as getCommentsApi,
  profileApi,
  userpostsApi,
} from "../Comments/api";
//
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
  const { getProfile, profile, setProfile, setUserPosts } = useForm();

  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   getProfile();
  // }, [getProfile]);
  //
  useEffect(() => {
    profileApi().then((data) => {
      setProfile(...data);
    });
    userpostsApi().then((d) => {
      setUserPosts(d);
    });
  }, []);
  //

  const onLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <>
      <div className={css.sidebar}>
        <div className={css.logo}>
          <img src={logo} alt="logo" />
        </div>
        {/* profile details */}
        {!isProfile && (
          <div className={css.sideProf}>
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
          </div>
        )}
        {/* menu */}
        <div className={css.menu}>
          <Link to="/" className={location.pathname === "/" ? css.active : ""}>
            <span className={css.icon}>{feed}</span>
            <div className={css.icon_func}>Feed</div>
          </Link>

          {location.pathname === "/profile" ? (
            <Link
              to="/editProfile"
              className={
                location.pathname === "/profile" ||
                location.pathname === "/editProfile"
                  ? css.active
                  : ""
              }
            >
              <span className={css.icon}>{profileIcon}</span>
              <div className={css.icon_func}>Edit Profile</div>
            </Link>
          ) : (
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
          )}
          {!isProfile && (
            <Link to={location.pathname} onClick={() => setShow(true)}>
              {/* <Link to="" onClick={() => setShow(true)}> */}
              <span className={css.icon}>{addPost}</span>
              <div className={css.icon_func}>Add Post</div>
            </Link>
          )}
          {/* 
          <Link to="/">
            <span className={css.icon}>{message}</span>
            <div className={css.icon_func}>Message</div>
          </Link> */}
          <Link to="/" onClick={onLogout}>
            <span className={css.icon}>{logout}</span>
            <div className={css.icon_func}>Log Out</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
