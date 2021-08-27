import React from "react";
import styles from "./_header.module.css";

const Header: React.FC = () => (
  <div className={styles.headerContent}>
    <h1>Bubbles</h1>
    <img src="/bubble-gif.gif" alt="bubble-gif" />
  </div>
);

export default Header;
