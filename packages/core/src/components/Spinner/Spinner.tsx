import { CSSProperties } from "react";
import clsx from "clsx";
import { formatPx } from "../../utils/formatPx";
import styles from "./spinner.module.css";

interface SpinnerProps {
  color?: string;
  className?: string;
  size?: number;
}

const bars = Array(12).fill(0);

const Spinner = ({ color, className, size = 20 }: SpinnerProps) => {
  return (
    <div
      className={styles.wrapper}
      data-geist-spinner=""
      style={
        {
          "--spinner-size": formatPx(size),
          "--spinner-color": color,
        } as CSSProperties
      }
    >
      <div className={clsx(styles.spinner, className)}>
        {bars.map((_, i) => (
          <div key={`spinner-bar-${i}`} className={styles.bar}></div>
        ))}
      </div>
    </div>
  );
};

export default Spinner;
