import React, { useState } from "react";
import EditProfileForm from "../../components/Form/EditProfileForm";
import Sidebar from "../../components/Sidebar/Sidebar";

import css from "./profile.module.css";

const EditProfile = () => {
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isProfile, setIsProfile] = useState(true);
  return (
    <>
      <section className={css.editProfileContainer}>
        <div>
          <Sidebar setShow={setShow} isProfile={isProfile} />
        </div>
        <div className={css.maincontainer}>
          <EditProfileForm />
        </div>
      </section>
    </>
  );
};

export default EditProfile;
