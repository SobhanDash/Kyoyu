import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import DpModal from "../Modal/DpModal";
import css from "./form.module.css";

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { profile, isLoading } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  // console.log(profile.about.profilepic);
  // console.log(profile.about.bio);
  const [editProfile, setEditProfile] = useState({
    username: profile && profile.username,
    name: profile && profile.name,
    email: profile && profile.email,
    phone: profile && profile.phone,
    profilepic: profile && profile.about.profilepic,
    bio: profile && profile.about.bio,
  });

  const profileChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: value,
    });
  };

  const editUserProfile = () => {
    // console.log(editProfile.profilepic);
    // console.log(editProfile.bio);
    dispatch(actionCreators.editProfile(editProfile));
  };

  useEffect(() => {
    dispatch(actionCreators.getProfile());
    setEditProfile({
      username: profile && profile.username,
      name: profile && profile.name,
      email: profile && profile.email,
      phone: profile && profile.phone,
      profilepic: profile && profile.about.profilepic,
      bio: profile && profile.about.bio,
    });
    // eslint-disable-next-line
  }, [
    profile.username,
    profile.name,
    profile.email,
    profile.about.profilepic,
    profile.about.bio,
    dispatch,
  ]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <form className={css.eform} onSubmit={editUserProfile}>
        <main className={css.eform_main}>
          <div className={css.img__wrapper}>
            <div className={css.dpchange}>
              <img
                src={editProfile.profilepic}
                alt={profile.name}
                className={css.dp}
                onClick={() => setShow(true)}
              />
            </div>
          </div>
          <div className={css.username}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Your Username"
              id="username"
              name="username"
              value={editProfile.username}
              onChange={profileChange}
            />
          </div>
          <div className={css.name}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              id="name"
              name="name"
              value={editProfile.name}
              onChange={profileChange}
            />
          </div>
          {/* <div className={css.mobileNo}>
            <label htmlFor="Mobile No">Mobile No.</label>
            <input
              type="text"
              placeholder="Enter Your Mobile No."
              id="mobile"
              name="mobile"
              value={editProfile.phone}
              onChange={profileChange}
            />
          </div> */}
          <div className={css.email}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              placeholder="email@example.com"
              id="email"
              name="email"
              value={editProfile.email}
              onChange={profileChange}
            />
          </div>
          <div className={css.bio}>
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              placeholder="Enter Bio"
              id="bio"
              name="bio"
              value={editProfile.bio}
              onChange={profileChange}
            />
          </div>
          <button className={css.saveChanges}>Save Changes</button>
        </main>
      </form>
      {show && <DpModal setShow={setShow} profile={profile && profile} />}
    </>
  );
};

export default EditProfileForm;
