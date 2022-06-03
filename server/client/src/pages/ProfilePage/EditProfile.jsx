import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import EditProfileForm from "../../components/Form/EditProfileForm";
import Sidebar from "../../components/Sidebar/Sidebar";

import css from "./profile.module.css";

const EditProfile = () => {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  // const [isProfile, setIsProfile] = useState(true);
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user, shallowEqual);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  return (
    <>
      <section className={css.editProfileContainer}>
        <div>
          <Sidebar />
        </div>
        <div className={css.maincontainer}>
          <EditProfileForm />
        </div>
      </section>
    </>
  );
};

export default EditProfile;
