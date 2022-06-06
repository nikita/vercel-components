import React from "react";
import clsx from "clsx";
import styles from "./Screen.module.css";
import { FCC } from "../../react";

interface Props {
  className?: string;
  disableScroll?: boolean;
}

const Screen: FCC<Props> = ({ disableScroll, className, children }) => {
  return (
    <div
      className={clsx(styles.geist_screen, className, {
        [styles.disable_scroll]: disableScroll,
      })}
    >
      {children}
    </div>
  );
};

export default Screen;
