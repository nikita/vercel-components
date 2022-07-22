import React, { FC, forwardRef, useRef, useContext } from "react";
import clsx from "clsx";
import { mergeRefs } from "react-merge-refs";
import { useHover } from "@react-aria/interactions";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { Spinner } from "../Spinner";
import { IconSizeContext } from "../../contexts/IconSizeContext";
import { DisabledContext } from "../../contexts/DisabledContext";
import reset from "../../styles/reset/reset.module.css";
import styles from "./button.module.css";

type IntrinsicProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface Props extends Omit<IntrinsicProps, "prefix" | "type"> {
  Component?: any;
  typeName?: string;
  href?: string;
  as?: string;
  target?: string;
  rel?: string;

  size?: "small" | "large";
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;
  align?: "start" | "grow" | "flex-grow" | "center";
  type?: "secondary" | "success" | "error" | "warning" | "alert" | "violet";
  shape?: "square" | "circle";
  variant?: "shadow" | "ghost" | "unstyled";
  loading?: boolean;
  width?: string;
  svgOnly?: boolean;
  passthroughOnClick?: any;
  passthroughOnMouseEnter?: any;
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

const Button: FC<Props> = forwardRef(
  (
    {
      Component,
      typeName,
      className,
      href,
      as,
      target,
      rel,
      disabled,
      loading,
      width,
      type,
      size,
      prefix,
      suffix,
      onClick,
      variant,
      shape,
      align,
      children,
      onMouseDown,
      onMouseUp,
      svgOnly,
      passthroughOnClick,
      passthroughOnMouseEnter,
      ...props
    },
    externalRef
  ) => {
    const ComponentNew = Component === undefined ? "button" : Component;
    const typeNameNew = typeName === undefined ? "submit" : typeName;
    const variantNew = variant === undefined ? "invert" : variant;

    const ctxDisabled = useContext(DisabledContext);
    const isDisabled = disabled || loading || ctxDisabled;

    const themeType = getThemedClasses(type, true);
    const ref = useRef<HTMLButtonElement>();
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({
      isDisabled: isDisabled || loading,
    });
    const { buttonProps, isPressed } = useButton(
      {
        isDisabled: disabled,
        target: target,
        rel: rel,
        elementType: ComponentNew,
        // @ts-ignore
        onPress: onClick,
        // @ts-ignore
        onPressStart: onMouseDown,
        // @ts-ignore
        onPressUp: onMouseUp,
      },
      ref
    );

    const iconSizeContextValue = (size) => {
      const sizes = {
        arge: 24,
        small: 16,
        default: 20,
      };

      return sizes[size || "default"];
    };

    return (
      <ComponentNew
        onClick={passthroughOnClick}
        onMouseEnter={passthroughOnMouseEnter}
        ref={mergeRefs([ref, externalRef])}
        className={
          variantNew === "unstyled"
            ? clsx(styles.base, className)
            : clsx(
                styles.base,
                reset.reset,
                styles.button,
                reset.reset,
                className,
                type !== "secondary" ? themeType : null,
                [
                  {
                    [styles.secondary]: type === "secondary",
                    [styles.shape]: shape,
                    [styles.circle]: shape === "circle",
                    [styles.loading]: loading,
                    [styles.small]: size === "small",
                    [styles.large]: size === "large",
                  },
                ],
                variantNew ? styles[variantNew] : undefined
              )
        }
        style={{
          ...props.style,
          minWidth: width,
          maxWidth: width,
        }}
        href={href}
        as={as}
        type={typeNameNew}
        data-hover={!disabled && isHovered ? "" : null}
        data-active={!disabled && isPressed ? "" : null}
        data-focus={!disabled && isFocusVisible ? "" : null}
        data-geist-button=""
        {...hoverProps}
        {...focusProps}
        {...buttonProps}
        {...props}
      >
        <IconSizeContext.Provider value={iconSizeContextValue(size)}>
          {(prefix || loading) && (
            <span className={styles.prefix}>
              {loading ? (
                <Spinner
                  size={iconSizeContextValue(size)}
                  color={"var(--accents-5)"}
                />
              ) : (
                prefix
              )}
            </span>
          )}
          <span
            className={clsx(styles.content, {
              [styles.flex]: svgOnly,
              [styles.start]: align === "start",
              [styles.grow]: align === "grow",
              [styles.flexGrow]: align === "flex-grow",
              [styles.center]: align === "center",
            })}
          >
            {children}
          </span>
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </IconSizeContext.Provider>
      </ComponentNew>
    );
  }
);

Button.displayName = "Button";
export default Button;
