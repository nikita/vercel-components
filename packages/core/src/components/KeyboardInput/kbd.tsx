import React from "react";
import clsx from "clsx";
import { FCC } from "../../react";

import styles from "./kbd.module.css";

interface KBDProps {
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  ctrl?: boolean;
  small?: boolean;
}

const KBD: FCC<KBDProps> = ({ meta, shift, alt, ctrl, small, children }) => {
  return (
    <kbd className={clsx(styles.kbd, { [styles.small]: small })}>
      {meta && <span>⌘</span>}
      {ctrl && <span>⌃</span>}
      {shift && <span>⇧</span>}
      {alt && <span>⌥</span>}
      {children && <span>{children}</span>}
    </kbd>
  );
};

export default KBD;
