import { CSSProperties } from "react";
import clsx from "clsx";
import { FCC } from "../../react";
import { formatPx } from "../../utils/formatPx";
import styles from "./LoadingDots.module.css";

interface Props {
  /**
   * Pixel size of Dots;
   * - defaults to "2px"
   */
  size?: number | string;
  height?: number | string;
}

/**
 * @usage
 * - `size`: pixel size of dots
 * ```tsx
 * <LoadingDots size={2}/>
 * ```
 */
const LoadingDots: FCC<Props> = ({ size = 2, height, children }) => {
  return (
    <span
      className={clsx(styles.loading)}
      data-geist-loading-dots=""
      style={
        {
          "--loading-dots-height": height ? formatPx(height) : undefined,
          "--loading-dots-size": size !== 2 ? formatPx(size) : undefined,
        } as CSSProperties
      }
    >
      {children && <div className={styles.spacer}>{children}</div>}
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
};

export default LoadingDots;
