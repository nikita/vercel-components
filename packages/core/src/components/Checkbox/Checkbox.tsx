import React, { FC, memo } from "react";
import clsx from "clsx";
import { useId } from "@react-aria/utils";
import { Label } from "../Label";
import { useDisabled } from "../../contexts/DisabledContext";
import styles from "./Checkbox.module.css";

const CheckedIcon = () => (
  <path
    d="M14 7L8.5 12.5L6 10"
    stroke="var(--geist-background)"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  />
);

const IndeterminateIcon = () => (
  <line
    stroke="var(--checkbox-color)"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    x1="5"
    x2="15"
    y1="10"
    y2="10"
  />
);

interface Props {
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  className?: any;
  children?: string | JSX.Element;
  indeterminate?: boolean;
  style?: React.CSSProperties;
  fullWidth?: boolean;

  onChange?: any;
}

const Checkbox: FC<Props> = ({
  label,
  disabled,
  checked = false,
  className,
  children,
  indeterminate,
  style,
  fullWidth,
  ...props
}) => {
  const checkboxId = "select-" + useId();
  const ctxDisabled = useDisabled() || disabled;

  const CheckboxContainer = label ? Label : React.Fragment;
  const ElementType = label === undefined ? "label" : "span";

  return (
    <CheckboxContainer
      {...(label
        ? {
            value: label,
            withInput: true,
            id: checkboxId,
          }
        : undefined)}
    >
      <ElementType
        className={clsx(styles.container, className, {
          [styles.disabled]: disabled,
          [styles.fullWidth]: fullWidth,
        })}
        style={style}
      >
        <span className={styles.check}>
          {children && <React.Fragment>{"\u200b"}</React.Fragment>}
          <input
            {...props}
            checked={checked}
            className={clsx("geist-sr-only", styles.input)}
            disabled={ctxDisabled}
            id={checkboxId}
            type="checkbox"
          />
          <span
            aria-hidden={true}
            className={clsx(styles.icon, {
              [styles.indeterminate]: indeterminate && !checked,
            })}
          >
            <svg fill="none" height={16} viewBox="0 0 20 20" width={16}>
              {checked ? (
                <CheckedIcon />
              ) : indeterminate ? (
                <IndeterminateIcon />
              ) : null}
            </svg>
          </span>
        </span>
        {children && <span className={styles.text}>{children}</span>}
      </ElementType>
    </CheckboxContainer>
  );
};

export default memo(Checkbox);
