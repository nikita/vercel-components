import clsx from "clsx";
import { FC, forwardRef } from "react";
import styles from "./stack.module.css";

interface Props {
  as?: any;
  children?: any;
  gap?: number | { sm: any; md: any; lg: any };
  direction?: string | { sm: any; md: any; lg: any };
  align?: string;
  justify?: string;
  flex?: string;
  debug?: any;
  style?: any;
  className?: string;
}

const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

function b(e, t) {
  return typeof t !== "number"
    ? ""
    : y[t]
    ? `margin-${(function (e) {
        switch (e) {
          case "row":
            return "left";
          case "row-reverse":
            return "right";
          case "column":
          default:
            return "top";
          case "column-reverse":
            return "bottom";
        }
      })(e)}: ${4 * t}px;`
    : "";
}

const v = ["sm", "md", "lg"];

function g(e, t) {
  const n = {};
  return (
    "object" !== typeof e
      ? e && (n["--".concat(t)] = e)
      : v.forEach((r) => {
          const o = e[r],
            i = "--".concat(r, "-").concat(t);
          null != o && (n[i] = o);
        }),
    n
  );
}

const Stack: FC<Props> = forwardRef(
  (
    {
      as = "div",
      children,
      gap,
      direction = "column",
      align = "stretch",
      justify = "flex-start",
      flex = "initial",
      debug,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const Tag = as;

    return (
      <Tag
        ref={ref}
        style={{
          ...style,
          "--flex": flex,
          ...g(direction, "direction"),
          ...g(align, "align"),
          ...g(justify, "justify"),
        }}
        {...props}
        className={
          // @ts-ignore
          (props && null != props.className && props.className) ||
          clsx(styles.stack, "stack", className, {
            [styles.debug]: debug,
          }) ||
          ""
        }
      >
        {children}
        <style jsx>{`
          @media screen and (min-width: 961px) {
            .stack > :global(* + *) {
              ${b(
                typeof direction === "string"
                  ? direction
                  : direction === null || direction === undefined
                  ? undefined
                  : direction.lg,
                typeof gap === "number"
                  ? gap
                  : gap === null || gap === undefined
                  ? undefined
                  : gap.lg
              )}\n
            }
          }
          @media screen and (min-width: 601px) and (max-width: 960px) {
            .stack > :global(* + *) {
              ${b(
                typeof direction === "string"
                  ? direction
                  : direction === null || direction === undefined
                  ? undefined
                  : direction.md,
                typeof gap === "number"
                  ? gap
                  : gap === null || gap === undefined
                  ? undefined
                  : gap.md
              )}\n
            }
          }
          @media screen and (max-width: 600px) {
            .stack > :global(* + *) {
              ${b(
                typeof direction === "string"
                  ? direction
                  : direction === null || direction === undefined
                  ? undefined
                  : direction.sm,
                typeof gap === "number"
                  ? gap
                  : gap === null || gap === undefined
                  ? undefined
                  : gap.sm
              )}
              \n
            }
          }
        `}</style>
      </Tag>
    );
  }
);

export default Stack;
