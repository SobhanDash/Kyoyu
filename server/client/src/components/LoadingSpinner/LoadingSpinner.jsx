import React from "react";

import Loading_Spinner from "../../images/spinner.svg"

import styles from "./loader.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.loading}>
      <img src={Loading_Spinner} alt="" />
    </div>
  );
};

export default LoadingSpinner;
