import React from "react";
import { useHistory } from "react-router-dom";
import css from "./login.module.css";
import Loginform from "../../components/Form/Login";

const LoginPage = () => {
  // const history = useHistory();

  // if (localStorage.getItem("token")) {
  //   history.push("/");
  // }

  return (
    <>
      <div className={css.login_bg}>
        <section className={css.container}>
          <section className={css.maincontainer}>
            <div className={`${css.half} ${css.left}`}></div>
            <div className={`${css.half} ${css.right}`}>
              <Loginform />
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
