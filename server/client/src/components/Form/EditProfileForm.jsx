import React from "react";
import useForm from "../../services/useForm";
import css from "./form.module.css";

const EditProfileForm = () => {
  const { handleRegisterChange, handleRegister } = useForm();

  return (
    <>
      <form className={css.eform}>
        <main className={css.eform_main}>
          <div className={css.username}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Your Username"
              id="username"
              name="username"
              onChange={handleRegisterChange}
            />
          </div>
          <div className={css.name}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              id="name"
              name="name"
              onChange={handleRegisterChange}
            />
          </div>
          <div className={css.email}>
            <label htmlFor="Email address">Email Address</label>
            <input
              type="email"
              placeholder="email@example.com"
              id="email"
              name="email"
              onChange={handleRegisterChange}
            />
          </div>
          <div className={css.password}>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              name="password"
              onChange={handleRegisterChange}
            />
          </div>
          <div className={css.confirmPassword}>
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleRegisterChange}
            />
          </div>
          <button className={css.saveChanges} onClick={handleRegister}>
            Save Changes
          </button>
        </main>
      </form>
    </>
  );
};

export default EditProfileForm;
