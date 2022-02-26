import React from "react";
import css from "./form.module.css";
import useForm from "../../services/useForm";
import validation from "../../utils/validation";

const Register = () => {
  const { handleRegisterChange, handleRegister } = useForm(validation);

  return (
    <>
      <form className={css.form}>
        <header className={css.register_form_header}>
          <h5 className={css.dull}>Welcome</h5>
          <h2>Register Now</h2>
        </header>
        <main className={css.register_form_main}>
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
          <div className={css.mobileNo}>
            <label htmlFor="Mobile No">Mobile No.</label>
            <input
              type="text"
              placeholder="Enter Your Mobile No."
              id="mobile"
              name="mobile"
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
          <button className={css.register_btn} onClick={handleRegister}>
            Register
          </button>
        </main>
        <footer className={css.register_form_footer}>
          <div>
            <span className={css.dull}>Already Have an account?</span>
            <a href="/login" className={css.register_link}>
              Log In
            </a>
          </div>
        </footer>
      </form>
    </>
  );
};

export default Register;
