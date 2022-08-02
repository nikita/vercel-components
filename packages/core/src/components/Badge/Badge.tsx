import React from "react";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import styles from "./Badge.module.css";

interface Props {
  children?: React.ReactNode;
  className?: HTMLAttributes<HTMLSpanElement>["className"];
  type?: "success" | "error" | "warning" | "violet" | "secondary";
  variant?: "contrast";
  outline?: boolean;
  size?: "small" | "large";
}

const Badge = ({
  children,
  className,
  type,
  variant,
  outline,
  size,
}: Props) => {
  return (
    <span
      className={clsx(
        styles.badge,
        {
          [styles[type]]: !!type,
          [styles[variant]]: !!variant,
          [styles.outline]: outline,
          [styles[size]]: !!size,
        },
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
