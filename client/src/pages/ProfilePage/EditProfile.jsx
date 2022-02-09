import React from "react";
import EditProfileForm from "../../components/Form/EditProfileForm";
import Sidebar from "../../components/Sidebar/Sidebar";

import css from "./profile.module.css";

const EditProfile = () => {
  return (
    <>
      <section className={css.editProfileContainer}>
        <div className={css.maincontainer}>
          <EditProfileForm />
        </div>
      </section>
      <div>
        <Sidebar />
      </div>
    </>
  );
};

export default EditProfile;
