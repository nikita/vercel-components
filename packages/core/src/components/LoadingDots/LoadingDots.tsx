import React from "react";
import clsx from "clsx";
import { CSSProperties } from "react";
import { FCC } from "../../react";
import styles from "./LoadingDots.module.css";

interface Props {
  /**
   * Pixel size of Dots;
   * - defaults to "2px"
   */
  size?: number;
}

/**
 * @usage
 * - `size`: pixel size of dots
 * ```tsx
 * <LoadingDots size={2}/>
 * ```
 */
const LoadingDots: FCC<Props> = ({ size = 2, children }) => {
  return (
    <span
      className={clsx(styles.loading)}
      style={{ "--loading-dots-size": `${size}px` } as CSSProperties}
    >
      {children && <div className={styles.spacer}>{children}</div>}
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
};

export default LoadingDots;
