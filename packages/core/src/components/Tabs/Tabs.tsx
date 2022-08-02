import React from "react";
import styles from "./Tabs.module.css";

const Tabs = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.tabs}>{children}</div>;
};

export default Tabs;
