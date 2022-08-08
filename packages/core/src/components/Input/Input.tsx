import React from "react";
import clsx from "clsx";
import { useId } from "@hooks";
import { Label } from "@components/Label";
import { Error } from "@components/Error";
import { Spacer } from "@components/Spacer";
import { getThemed } from "@utils/getThemed";
import { defaultIconSize } from "@utils/iconSize";
import { useDisabled } from "@contexts/DisabledContext";
import { IconSizeContext } from "@contexts/IconSizeContext";
import styles from "./input.module.css";

interface Props {
  disabled?: boolean;
  label?: string;
  typeName?: string;
  prefix?: any;
  suffix?: any;
  prefixStyling?: boolean;
  prefixContainer?: boolean;
  suffixStyling?: boolean;
  suffixContainer?: boolean;
  width?: string;
  error?: string;
  type?: string;
  size?: "small" | "large";
  className?: string;
  wrapperClassName?: string;
  spellCheck?: boolean;
  autoCapitalize?: string;
  autoComplete?: string;
  autoCorrect?: string;

  id?: any;
}

const Input = React.memo(
  React.forwardRef(
    (
      {
        disabled,
        label,
        typeName = "text",
        prefix,
        suffix,
        prefixStyling = true,
        prefixContainer = true,
        suffixStyling = true,
        suffixContainer = true,
        width,
        error,
        type,
        size,
        className,
        wrapperClassName,
        spellCheck = false,
        autoCapitalize = "off",
        autoComplete = "off",
        autoCorrect = "off",
        ...props
      }: Props,
      ref
    ) => {
      const Container = label ? Label : React.Fragment;
      const containerProps = {
        ...(label && {
          value: label,
          withInput: true,
          style: {
            width,
          },
          id: props.id,
          wrapperClassName,
        }),
      };

      const ctxDisabled = useDisabled() || disabled;
      const id = useId("input-");

      type = error ? "error" : type;
      const typeThemed = getThemed(type);

      return (
        <Container {...containerProps}>
          <div
            className={clsx(styles.container, typeThemed, {
              [styles.prefix]: prefix,
              [styles.suffix]: suffix,
              [styles.noPrefixStyle]: !prefixStyling,
              [styles.noSuffixStyle]: !suffixStyling,
              [styles.large]: size === "large",
              [styles.small]: size === "small",
            })}
            data-geist-input-wrapper=""
            data-version="v1"
            style={{ width }}
          >
            <IconSizeContext.Provider value={defaultIconSize(size)}>
              <input
                {...props}
                aria-describedby={
                  error ? `${id}-error` : props["aria-describedby"]
                }
                aria-invalid={!!error}
                autoCapitalize={autoCapitalize}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                className={clsx(styles.input, className)}
                data-geist-input=""
                disabled={ctxDisabled}
                // @ts-ignore
                ref={ref}
                spellCheck={spellCheck}
                type={typeName}
              />

              {prefix &&
                (prefixContainer ? (
                  <span data-geist-input-prefix="">{prefix}</span>
                ) : (
                  prefix
                ))}

              {suffix &&
                (suffixContainer ? (
                  <span data-geist-input-suffix="">{suffix}</span>
                ) : (
                  suffix
                ))}
            </IconSizeContext.Provider>

            {error && (
              <React.Fragment>
                <Spacer y={0.5} />
                <Error
                  /* data-testid={props["data-testid"] ? merge(props["data-testid"], "error") : undefined } */
                  error={error}
                  id={`${id}-error`}
                  size={size}
                  style={{ width }}
                />
              </React.Fragment>
            )}
          </div>
        </Container>
      );
    }
  )
);

export default Input;
