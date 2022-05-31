import React, { useEffect, useState } from "react";
import css from "./form.module.css";
import { useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import validation from "../../utils/validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Login = () => {
  const { user, isLoading } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [lValues, setLValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLValues({
      ...lValues,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors(validation(lValues));
    if (lValues.email === "" || lValues.password === "") {
      toast.error("Enter All Fields", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(actionCreators.login(lValues));
      setLValues({ email: "", password: "" });
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
          {/* {errors && <h4>{errors}</h4>} */}
          {console.log(errors)}
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
