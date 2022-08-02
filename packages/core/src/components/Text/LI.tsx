import React from "react";
import clsx from "clsx";
import styles from "./list.module.css";

const LI = ({
  children,
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => {
  return (
    <li className={clsx(styles.li, className)} {...props}>
      {children}
    </li>
  );
};

export default LI;
