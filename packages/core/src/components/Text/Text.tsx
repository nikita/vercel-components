import React, { CSSProperties } from "react";
import clsx from "clsx";
import { forwardRef } from "react";

import styles from "./text.module.css";

type TAs =
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "legend"
  | "p"
  | "small"
  | "span"
  | "strong";

type TColor =
  | "inherit"
  | "accents-1"
  | "accents-2"
  | "accents-3"
  | "accents-4"
  | "accents-5"
  | "accents-6"
  | "accents-7"
  | "accents-8"
  | "geist-success-lighter"
  | "geist-success-light"
  | "geist-success"
  | "geist-success-dark"
  | "geist-error-lighter"
  | "geist-error-light"
  | "geist-error"
  | "geist-error-dark"
  | "geist-warning-lighter"
  | "geist-warning-light"
  | "geist-warning"
  | "geist-warning-dark"
  | "geist-violet-lighter"
  | "geist-violet-light"
  | "geist-violet"
  | "geist-violet-dark"
  | "geist-foreground"
  | "geist-background"
  | "geist-secondary"
  | "wv-green"
  | "wv-orange"
  | "wv-red";

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** default: p */
  as?: TAs;
  /** default: 14 */
  size?: 10 | 12 | 14 | 16 | 20 | 24 | 32 | 40 | 48;
  lineHeight?: 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  transform?: "capitalize" | "uppercase" | "lowercase" | "initial";
  align?: "left" | "center" | "right";
  color?: TColor;
  truncate?: number | boolean;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  wrap?: boolean;
  dangerouslySetInnerHTML?: { __html: string };
}

/**
 * @Note see `globals.css` for `.geist-text` styles
 */
const Text = forwardRef<unknown, Props>(
  (
    {
      children,
      as = "p",
      size = 14,
      lineHeight,
      weight,
      color = "geist-foreground",
      transform,
      align,
      truncate,
      wrap = !0,
      className,
      style,
      ...props
    },
    ref: any
  ) => {
    const Tag = as;
    const textColor = color === "inherit" ? "inherit" : `var(--${color})`;

    return (
      <Tag
        className={clsx(styles.wrapper, className, {
          [styles[`s-${size}`]]: size,
          [styles[`w-${weight}`]]: weight,
          [styles[`lh-${lineHeight}`]]: lineHeight,
          [styles[transform]]: transform,
          [styles[align]]: align,
          [styles.truncate]: typeof truncate === "boolean",
          [styles.clamp]: typeof truncate === "number",
          [styles.nowrap]: !wrap,
        })}
        style={
          {
            ...(typeof truncate === "number" && {
              "--clamp": truncate,
            }),
            ...(color && {
              "--color": textColor,
            }),
            ...style,
          } as CSSProperties
        }
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

export default Text;
