import React from "react";
import clsx from "clsx";

type Direction = "column" | "row";

interface Props {
  children?: React.ReactNode;
  flex?: number;
  /**
   * ignored if the `direction` prop is specified
   */
  row?: boolean;
  /**
   * [sm → md → lg]
   */
  direction?: Direction | Direction[];
  /**
   * This a multiplier, * `--geist-gap` (24px)
   */
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
  /**
   * not compatible with `direction`
   */
  hcenter?: boolean;
  /**
   * not compatible with `direction`
   */
  vcenter?: boolean;
  /**
   * not compatible with `direction`
   */
  vbaseline?: boolean;
  /** specify one of: `left | center | right` */
  left?: boolean;
  /** specify one of: `left | center | right` */
  center?: boolean;
  /** specify one of: `left | center | right` */
  right?: boolean;
  noWrap?: boolean;
  /**
   * `wrapper ? "geist-wrapper" : "geist-container"`
   */
  wrapper?: boolean;

  top?: string;
  bottom?: string;
  halfGap?: boolean;
  inline?: boolean;
  full?: boolean;
  classNames?: any;
  styleSets?: any;
  Component?: any;
}

const cfg = {
  row: {
    align: {
      top: "flex-start",
      bottom: "flex-end",
      center: "center",
      default: "stretch",
      baseline: "baseline",
    },
    justify: {
      left: "flex-start",
      right: "flex-end",
      center: "center",
      default: "flex-start",
    },
  },
  column: {
    align: {
      left: "flex-start",
      right: "flex-end",
      center: "center",
      default: "stretch",
    },
    justify: {
      top: "flex-start",
      bottom: "flex-end",
      center: "center",
      default: "flex-start",
      baseline: "baseline",
    },
  },
};

const g = {
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop",
};

const m = Object.keys(g).length;
const rowOptions = Array(m).fill("row");
const columnOptions = Array(m).fill("column");

const Container = (
  {
    row,
    direction,
    left,
    right,
    top,
    bottom,
    hcenter,
    vcenter,
    vbaseline,
    center,
    noWrap,
    wrapper,
    halfGap,
    gap,
    children,
    flex = 1,
    inline,
    full,
    classNames = [],
    styleSets = null,
    Component = "div",
    className,
    style,
    ...props
  }: Props,
  ref
) => {
  let justifyContent;
  let alignItems;

  const _justifyContent = left
    ? "left"
    : right
    ? "right"
    : hcenter || center
    ? "center"
    : "default";
  const _alignItems = top
    ? "top"
    : bottom
    ? "bottom"
    : vcenter || center
    ? "center"
    : vbaseline
    ? "baseline"
    : "default";

  if (row) {
    justifyContent = cfg.row.justify[_justifyContent];
    alignItems = cfg.row.align[_alignItems];
  } else {
    justifyContent = cfg.column.justify[_alignItems];
    alignItems = cfg.column.align[_justifyContent];
  }

  const currentGap = halfGap ? 0.5 : gap === undefined ? 1 : gap;
  const currentDirection =
    (direction === "row"
      ? rowOptions
      : direction === "column"
      ? columnOptions
      : direction) || (row ? rowOptions : columnOptions);

  const container = (
    <Component
      data-version="v1"
      ref={ref}
      style={{
        ...style,
        "--flex": flex,
        "--justify-content": justifyContent,
        "--align-items": alignItems,
      }}
      {...props}
      className={
        (props && className) ||
        clsx(
          "geist-container",
          {
            "sm-row": currentDirection[0] === "row",
            "md-row": (currentDirection[1] || currentDirection[0]) === "row",
            "lg-row":
              (currentDirection[2] ||
                currentDirection[1] ||
                currentDirection[0]) === "row",
            nowrap: noWrap,
            inline: inline,
          },
          ...classNames,
          className
        ) ||
        ""
      }
    >
      {children}
      <style jsx>{`
        .geist-container > :global(*) {
          --gap-ratio: ${currentGap};
        }
      `}</style>
      {styleSets}
    </Component>
  );

  return wrapper ? (
    <div className={clsx("geist-wrapper", { full: full })}>{container}</div>
  ) : (
    container
  );
};

Container.displayName = "Container";
export default React.forwardRef(Container);
