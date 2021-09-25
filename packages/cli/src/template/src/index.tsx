import React, { lazy } from "react";
import styles from "./index.module.less";
import "./index.less";
const Other = lazy(async () => import("./Button"));

const Button = () => {
  return (
    <div className={styles.root}>
      button
      <Other />
    </div>
  );
};

export default Button;
