import React from "react";
import clsx from "clsx";
import styles from "./list.module.css";

const OL = ({
  children,
  className,
  ...props
}: React.OlHTMLAttributes<HTMLOListElement>) => {
  return (
    <ol className={clsx(styles.ol, className)} {...props}>
      {children}
    </ol>
  );
};

export default OL;
