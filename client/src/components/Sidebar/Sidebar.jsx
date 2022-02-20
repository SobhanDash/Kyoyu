import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTh,
  faPlus,
  faUser,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import css from "./Sidebar.module.css";
import useForm from "../../services/useForm";
import nodpImg from "../../images/nodp.jpg";
import logo from "../../images/logo2.svg";

const feed = <FontAwesomeIcon icon={faTh} />;
const addPost = <FontAwesomeIcon icon={faPlus} />;
const profileIcon = <FontAwesomeIcon icon={faUser} />;
const logout = <FontAwesomeIcon icon={faSignOutAlt} />;
const editProfileIcon = <FontAwesomeIcon icon={faCog} />;

const Sidebar = ({ setShow, isProfile }) => {
  const history = useHistory();
  const location = useLocation();
  const { getProfile, profile } = useForm();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

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
                {profile.profilePic !== null ? (
                  <img src={profile.profilePic} alt={profile.username} />
                ) : (
                  <img src={nodpImg} alt={profile.username} />
                )}
                {/* <img src={nodpImg} alt={profile.username} /> */}
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
          <Link
            to="/profile"
            className={location.pathname === "/profile" ? css.active : ""}
          >
            <span className={css.icon}>{profileIcon}</span>
            <div className={css.icon_func}>Profile</div>
          </Link>
          <Link
            to="/editProfile"
            className={location.pathname === "/editProfile" ? css.active : ""}
          >
            <span className={css.icon}>{editProfileIcon}</span>
            <div className={css.icon_func}>Edit Profile</div>
          </Link>
          {!isProfile && (
            <Link to={location.pathname} onClick={() => setShow(true)}>
              <span className={css.icon}>{addPost}</span>
              <div className={css.icon_func}>Add Post</div>
            </Link>
          )}
          <Link to="/login" onClick={onLogout}>
            <span className={css.icon}>{logout}</span>
            <div className={css.icon_func}>Log Out</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
