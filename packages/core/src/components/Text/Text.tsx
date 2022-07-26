import React from "react";
import clsx from "clsx";
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
  | "wv-green"
  | "wv-orange"
  | "wv-red";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /** The content, duh. */
  children: React.ReactNode;
  /** The root element. Default: `p` */
  as?: TAs;
  /** The font size. Default: `14` */
  size?: 10 | 12 | 14 | 16 | 20 | 24 | 32 | 40 | 48;
  /** The line height. */
  lineHeight?: 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56;
  /** The font weight. */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  /** Text alignment short hand. */
  transform?: "capitalize" | "uppercase" | "lowercase" | "initial";
  /** Text alignment short hand. */
  align?: "left" | "center" | "right";
  /** The text color. Strictly limited to colors of our design system. Default: `geist-foreground` */
  color?: TColor;
  /** Truncate a single or multiple line(s). If you pass truncate, make sure to pass `title` so that the full value is shown on hover. */
  truncate?: number | boolean;
  /** The root class name. */
  className?: string;
  /** The root element inline styles. */
  style?: React.CSSProperties;
  /** If text is `truncated`, this should be the full text. */
  title?: string;
  /** Whether the text should wrap lines. Default: `true` */
  wrap?: boolean;
  /** See https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */
  dangerouslySetInnerHTML?: { __html: string };
}

const Text: React.FC<Props> = ({
  children,
  as: Tag = "p",
  size = 14,
  lineHeight,
  weight,
  color = "geist-foreground",
  transform,
  align,
  truncate,
  wrap = true,
  className,
  style,
  ...props
}) => {
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
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Text;
