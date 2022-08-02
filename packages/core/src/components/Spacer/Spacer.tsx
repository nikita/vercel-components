import { FC, memo } from "react";
import clsx from "clsx";

interface Props {
  y?: number;
  x?: number;
  expand?: boolean;
  className?: string;
  inline?: boolean;
  padding?: string;
}

const Spacer = memo(
  ({ x = 1, y = 1, expand, className, inline, padding }: Props) => {
    return (
      <span
        aria-hidden="true"
        className={clsx("geist-spacer", className, {
          padding,
          inline,
          expand,
        })}
        style={{
          marginLeft: x !== 1 ? x * 24 - 1 : undefined,
          marginTop: y === 1 || inline ? undefined : 24 * y - 1,
          paddingLeft: padding ? x * 24 - 1 : undefined,
          paddingTop: padding && !inline ? y * 24 - 1 : undefined,
        }}
      ></span>
    );
  }
);

Spacer.displayName = "Spacer";

export default Spacer;
