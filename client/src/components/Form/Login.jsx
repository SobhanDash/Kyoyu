import React from "react";
import css from "./form.module.css";
import useForm from "../../services/useForm";
import validation from "../../utils/validation";

const Login = () => {
  const { handleChange, handleLogin, errors } = useForm(validation);

  return (
    <>
      <form className={css.form}>
        <header className={css.form_header}>
          <h5 className={css.welcome}>Welcome</h5>
          <h2>Sign in Now</h2>
        </header>
        <main className={css.form_main}>
          <div className={css.email}>
            <label htmlFor="Email address">Email Address</label>
            <input
              type="text"
              placeholder="email@example.com"
              onChange={handleChange}
              id="email"
              name="email"
              emailerror={errors.email}
            />
          </div>
          <div className={css.password}>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              id="password"
              name="password"
              passworderror={errors.password}
            />
          </div>
          <button className={css.login_btn} onClick={handleLogin}>
            Login
          </button>
        </main>
        <footer className={css.form_footer}>
          <div>
            <span className={css.dull}>Dont Have an account?</span>
            <a href="/register" className={css.register_link}>
              Register
            </a>
          </div>
        </footer>
      </form>
    </>
  );
};

export default Login;
