import React from "react";
import clsx from "clsx";
import AlertCircle from "@icons/AlertCircle";
import styles from "./error.module.css";
import { defaultIconSize } from "@utils/iconSize";
import { Spacer } from "@components/Spacer";
import { Link } from "@components/Link";

interface ErrorObj {
  message: string;
  link?: string;
  action?: string;
}

interface Props {
  id?: string;
  style?: React.CSSProperties;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  size?: "small" | "large";
  error?: ErrorObj | React.ReactNode;
}

const Error = ({
  id,
  style,
  label = "Error",
  className,
  children,
  size,
  error,
  ...props
}: Props) => {
  const iconSize = defaultIconSize(size);

  console.log("children", children);
  console.log("error", error);

  const ActionLink = React.useMemo(() => {
    if (children) return children;
    if (React.isValidElement(error)) return error;

    if (error && typeof error == "object") {
      return (
        <React.Fragment>
          {/* @ts-ignore */}
          {error.message}
          {/* @ts-ignore */}
          {error.link ? (
            <React.Fragment>
              <span className={styles["action-link"]}>
                {/* @ts-ignore */}
                <Link external={true} href={error.link} type="blend">
                  {/* @ts-ignore */}
                  {error.action ? error.action : "Learn More"}
                </Link>
              </span>
            </React.Fragment>
          ) : null}
        </React.Fragment>
      );
    }

    return error;
  }, [children, error]);
  console.log("ActionLink", ActionLink);

  return (
    <div
      aria-atomic="true"
      className={clsx(styles.error, className, {
        [styles.label]: !!label,
        [styles.large]: size === "large",
        [styles.small]: size === "small",
      })}
      data-geist-error=""
      /* data-testid={props["data-testid"]} */
      data-version="v1"
      id={id}
      role="alert"
      style={style}
    >
      <div aria-hidden={true}>
        <AlertCircle
          align="bottom"
          color="var(--geist-error)"
          size={iconSize}
          weight="bold"
        />
      </div>

      {/* @ts-ignore */}
      <div className={styles.text}>
        {label && <b>{label}:</b>}
        <Spacer inline={true} x={0.25} />
        {ActionLink}
      </div>
    </div>
  );
};

Error.displayName = "Error";
export default React.memo(Error);
