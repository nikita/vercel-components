import React from "react";
import clsx from "clsx";
import styles from "./note.module.css";
import { getThemed } from "@utils/getThemed";
import { GeistText } from "@components/Text";

interface Props {
  children?: React.ReactNode;
  className?: string;
  type?: "secondary" | "success" | "error" | "warning";
  fill?: boolean;
  label?: false | string;
  size?: "small" | "large";
  center?: boolean;
  variant?: "contrast";
  action?: React.ReactNode;
}

const Note = ({
  children,
  className,
  type,
  fill,
  label,
  size,
  center,
  variant,
  action,
  ...props
}: Props) => {
  // @ts-ignore
  const themed = getThemed(type, fill, variant);

  return (
    <div
      className={clsx(styles.note, className, themed, {
        [styles.small]: "small" === size,
        [styles.large]: "large" === size,
        [styles.fill]: fill,
        [styles.center]: center,
      })}
      {...props}
      data-geist-note=""
      data-version="v1"
    >
      <span>
        {label !== false && (
          <GeistText bold={true} span={true}>
            {(label && `${label}:`) ||
              (type === "success" && "Success: ") ||
              (type === "error" && "Error: ") ||
              (type === "warning" && "Warning: ") ||
              "Note: "}
          </GeistText>
        )}
        {children}
      </span>
      {action && <div>{action}</div>}
    </div>
  );
};

export default Note;
