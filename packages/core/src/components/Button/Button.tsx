import React, { FC, forwardRef, useRef, useContext } from "react";
import clsx from "clsx";
import { mergeRefs } from "react-merge-refs";
import { useHover } from "@react-aria/interactions";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { Spinner } from "@components/Spinner";
import { getThemed } from "@utils/getThemed";
import { IconSizeContext } from "@contexts/IconSizeContext";
import { DisabledContext } from "@contexts/DisabledContext";
import styles from "./button.module.css";

type IntrinsicProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const w = (e) => (e ? "" : undefined);

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

const Button: FC<Props> = forwardRef(
  (
    {
      Component = "button",
      typeName = "submit",
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
      variant = "invert",
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
    const ctxDisabled = useContext(DisabledContext);
    const isDisabled = disabled || loading || ctxDisabled;

    const themeType = getThemed(type, true);
    const ref = useRef<HTMLButtonElement>();
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({
      isDisabled,
    });
    const { buttonProps, isPressed } = useButton(
      {
        isDisabled,
        target,
        rel,
        elementType: Component,
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
      <Component
        onClick={passthroughOnClick}
        onMouseEnter={passthroughOnMouseEnter}
        {...hoverProps}
        {...focusProps}
        {...buttonProps}
        {...props}
        as={as}
        className={
          variant === "unstyled"
            ? clsx(styles.base, className)
            : clsx(
                styles.base,
                styles.button,
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
                styles[variant]
              )
        }
        data-active={disabled ? undefined : w(isPressed)}
        data-focus={disabled ? undefined : w(isFocusVisible)}
        data-geist-button=""
        data-hover={disabled ? undefined : w(isHovered)}
        // data-testid={props["data-testid"]}
        data-version="v1"
        href={href}
        ref={mergeRefs([ref, externalRef])}
        style={{
          ...props.style,
          minWidth: width,
          maxWidth: width,
        }}
        type={typeName}
      >
        <IconSizeContext.Provider value={iconSizeContextValue(size)}>
          {(prefix || loading) && (
            <span className={styles.prefix}>
              {loading ? (
                <Spinner
                  color={"var(--accents-5)"}
                  size={iconSizeContextValue(size)}
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
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
