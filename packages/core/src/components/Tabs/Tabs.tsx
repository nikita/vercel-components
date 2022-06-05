import React from "react";
import { FCC } from "../../react";
import styles from "./Tabs.module.css";

interface Props {}

const Tabs: FCC<Props> = ({ children }) => {
  return <div className={styles.tabs}>{children}</div>;
};

export default Tabs;
