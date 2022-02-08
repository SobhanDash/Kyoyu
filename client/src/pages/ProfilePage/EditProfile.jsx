import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

import css from "./profile.module.css";

const EditProfile = () => {
  return (
    <div className={css.editProfile_container}>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default EditProfile;
