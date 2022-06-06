import React from "react";
import clsx from "clsx";
import styles from "./Label.module.css";

interface Props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  value?: string;
  withInput?: boolean;
  wrapperClassName?: string;
}

const Label: React.ComponentType<Props> = ({
  children,
  className,
  id,
  style,
  value,
  withInput,
  wrapperClassName,
}) => {
  return (
    <label className={wrapperClassName} htmlFor={id} style={style}>
      <div
        className={clsx(styles.label, className, { [styles.input]: withInput })}
        {...{ style }}
      >
        {value}
      </div>
      {children}
    </label>
  );
};

export default Label;
