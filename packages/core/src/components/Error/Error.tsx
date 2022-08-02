import React from "react";
import clsx from "clsx";
import AlertCircle from "@icons/AlertCircle";
import styles from "./error.module.css";

interface Props {
  label?: string;
  children?: React.ReactNode;
  size?: "small" | "large";
}

const Error = ({ label = "Error", children, size }: Props) => {
  return (
    <div
      className={clsx(styles.error, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
      })}
    >
      <div aria-hidden="true">
        <AlertCircle color="var(--geist-error)" size={20} />
      </div>
      <div className={styles.text}>
        <b>{label}:</b>
        <span
          aria-hidden="true"
          className={clsx("geist-spacer", "inline")}
          style={{ marginLeft: "5px" }}
        />
        {children}
      </div>
    </div>
  );
};

export default Error;
