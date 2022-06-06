import { useContext } from "react";
import clsx from "clsx";
import { useId } from "@react-aria/utils";
import ChevronDown from "../../icons/ChevronDown";
import { FCC } from "../../react";
import { Label } from "../Label";
import { IconSizeContext } from "../../contexts/IconSizeContext";
import { DisabledContext } from "../../contexts/DisabledContext";

import styles from "./Select.module.css";

interface Props {
  className?: string;
  disabled?: boolean;
  label?: string;
  width?: string;
  suffix?: string;
  prefix?: string;
  placeholder?: string;
  type?: string;
  size?: string;
}

const getThemedClasses = (type, e = null, n = null) =>
  type
    ? [
        "geist-themed",
        `geist-${type}`,
        e ? `geist-${type}-fill` : null,
        n ? `geist-${type}-${n}` : null,
      ]
    : "";

const withDisabled = (disabled?: boolean) => {
  const ctxDisabled = useContext(DisabledContext);
  return disabled ? disabled : ctxDisabled;
};

const Select: FCC<Props> = ({
  className,
  disabled,
  label,
  width,
  suffix,
  prefix,
  placeholder,
  type,
  size,
  children,
  ...props
}) => {
  const selectId = "select-" + useId();
  const ctxDisabled = withDisabled(disabled);

  return (
    <Label
      {...(label
        ? {
            value: label,
            withInput: true,
            wrapperClassName: className,
            id: selectId,
          }
        : { className, htmlFor: selectId })}
      style={{ width }}
    >
      <div
        className={clsx(styles.container, getThemedClasses(type), {
          [styles.disabled]: ctxDisabled,
        })}
        data-geist-select=""
      >
        <IconSizeContext.Provider value={{ size: 18 }}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <select
            className={clsx(styles.select, {
              [styles.large]: size === "large",
              [styles.small]: size === "small",
              // @ts-ignore
              [styles.placeholder]: placeholder === props.value,
            })}
            defaultValue={placeholder}
            disabled={ctxDisabled}
            id={selectId}
            {...props}
          >
            {placeholder && (
              <option disabled={false} label={placeholder} value={placeholder}>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <span className={styles.suffix}>
            {suffix || <ChevronDown size={18} />}
          </span>
        </IconSizeContext.Provider>
      </div>
    </Label>
  );
};

export default Select;
