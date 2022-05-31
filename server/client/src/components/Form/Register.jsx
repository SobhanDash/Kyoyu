import React, { useEffect, useState } from "react";
import css from "./form.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Register = () => {
  const { user, isLoading } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [isError, setIsError] = useState({ status: false, message: "" });
  const [rvalues, setRvalues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRvalues({
      ...rvalues,
      [name]: value,
    });
  };

  const onRegister = (e) => {
    e.preventDefault();
    if (
      rvalues.username === "" ||
      rvalues.name === "" ||
      rvalues.email === "" ||
      rvalues.password === "" ||
      rvalues.confirmPassword === ""
    ) {
      toast.error("Enter All Fields", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (rvalues.password === rvalues.confirmPassword) {
      dispatch(actionCreators.register(rvalues));
      setRvalues({
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setIsError({
        status: true,
        message: "Password and confirm password must be same!",
      });
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      history.push("/");
    }
  }, [user, isLoading, history]);

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
          <button className={css.register_btn} onClick={onRegister}>
            Register
          </button>
          {isError.status === true && (
            <h4 className={css.errorMsg}>{isError.message}</h4>
          )}
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
