import React from "react";
import clsx from "clsx";
import { toPixels } from "@utils/toPixels";
import styles from "./skeleton.module.css";

interface Props {
  width?: React.CSSProperties["width"];
  height?: number;
  boxHeight?: number;
  rounded?: boolean;
  squared?: boolean;
  style?: any;
  show?: boolean;
  block?: boolean;
  className?: string;
  vcenter?: boolean;
  children?: React.ReactNode;
  autoSize?: boolean;
  animated?: boolean;
}

const Skeleton = ({
  width = 24,
  height = 24,
  boxHeight = height,
  rounded,
  squared,
  style,
  show = true,
  block = true,
  className,
  vcenter,
  children,
  autoSize = false,
  animated = true,
}: Props) => {
  const shouldWrap = autoSize || Boolean(!!children && !(width || height));
  const margin = shouldWrap ? 0 : Number(boxHeight) - Number(height);

  return (
    <span
      className={clsx(styles.skeleton, className, {
        [styles.show]: show,
        [styles.wrapper]: shouldWrap,
        [styles.loaded]: !shouldWrap && !!children,
        [styles.inline]: !block,
        [styles.rounded]: rounded,
        [styles.squared]: squared,
        [styles.noAnimation]: !animated,
      })}
      data-geist-skeleton=""
      /* data-testid={formatTestId("legacy", "skeleton")} */
      data-version="v1"
      style={
        shouldWrap
          ? style
          : {
              width: toPixels(width),
              minHeight: toPixels(height),
              marginBottom: (vcenter ? margin / 2 : margin) || undefined,
              marginTop: (vcenter ? margin / 2 : undefined) || undefined,
              ...style,
            }
      }
    >
      {children}
    </span>
  );
};

export default Skeleton;
