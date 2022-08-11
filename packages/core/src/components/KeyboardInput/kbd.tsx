import React from "react";
import clsx from "clsx";
import { getThemed } from "@utils/getThemed";
import styles from "./kbd.module.css";

interface Props {
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  ctrl?: boolean;
  small?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: string;
}

// TODO: Finish
const KBD = ({
  meta,
  shift,
  alt,
  ctrl,
  small,
  children,
  className,
  type,
  ...props
}: Props) => {
  const themed = getThemed(type, true);

  return (
    <kbd
      className={clsx(styles.kbd, { [styles.small]: small, themed, className })}
      data-geist-kbd=""
      {...props}
    >
      {meta && <span>⌘</span>}
      {shift && <span>⇧</span>}
      {alt && <span>⌥</span>}
      {ctrl && <span>⌃</span>}
      {children && <span>{children}</span>}
    </kbd>
  );
};

export default KBD;
