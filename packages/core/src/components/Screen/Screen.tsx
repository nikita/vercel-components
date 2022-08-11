import React from "react";
import clsx from "clsx";
import styles from "./screen.module.css";

interface Props {
  className?: string;
  disableScroll?: boolean;
  children?: React.ReactNode;
}

const Screen = ({ disableScroll, className, children }: Props) => (
  <div
    className={clsx(styles.geist_screen, className, {
      [styles.disable_scroll]: disableScroll,
    })}
  >
    {children}
  </div>
);

export default Screen;
