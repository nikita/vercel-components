import React from "react";
import clsx from "clsx";
import styles from "./list.module.css";

const UL = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul className={clsx(styles.ul, className)} {...props}>
      {children}
    </ul>
  );
};

export default UL;
