import { memo, DetailedHTMLProps, SelectHTMLAttributes } from "react";
import clsx from "clsx";
import { useId } from "../../hooks";
import { FCC } from "../../react";
import { Label } from "../Label";
import { getThemed } from "../../utils/getThemed";
import { IconSizeContext } from "../../contexts/IconSizeContext";
import { useDisabled } from "../../contexts/DisabledContext";
import ChevronDown from "../../icons/ChevronDown";
import styles from "./Select.module.css";

type newAttributes = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  size?: string;
};

interface Props extends DetailedHTMLProps<newAttributes, HTMLSelectElement> {
  className?: string;
  disabled?: boolean;
  label?: string;
  width?: string;
  suffix?: any;
  prefix?: any;
  placeholder?: string;
  type?: string;

  value?: any;
}

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
  const selectId = useId("select-");
  const ctxDisabled = useDisabled(disabled);

  const isCustomLabel = Boolean(label);
  const LabelComponent = isCustomLabel ? Label : "label";
  const labelProps = isCustomLabel
    ? {
        value: label,
        withInput: true,
        wrapperClassName: className,
        id: selectId,
      }
    : { className, htmlFor: selectId };

  return (
    <LabelComponent {...labelProps} style={{ width }}>
      <div
        className={clsx(styles.container, getThemed(type), {
          [styles.disabled]: ctxDisabled,
        })}
        data-geist-select=""
      >
        <IconSizeContext.Provider value={18}>
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
    </LabelComponent>
  );
};

export default memo(Select);
