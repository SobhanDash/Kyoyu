import React from "react";
import { useHistory } from "react-router-dom";
import css from "./register.module.css";
import Registerform from "../../components/Form/Register";

const LoginPage = () => {
  // const history = useHistory();

  // if (localStorage.getItem("token")) {
  //   history.push("/");
  // }

  return (
    <>
      <div className={css.register_bg}>
        <section className={css.container}>
          <section className={css.maincontainer}>
            <Registerform />
          </section>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
