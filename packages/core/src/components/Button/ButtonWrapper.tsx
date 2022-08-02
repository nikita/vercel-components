import React, { forwardRef } from "react";
import Link from "next/link";
import Button from "./Button";

type IntrinsicProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface Props extends Omit<IntrinsicProps, "type"> {
  href?: string;
  as?: string;
  tab?: boolean;
  shallow?: boolean;
  loading?: boolean;
}

interface BtnRefProps extends Omit<IntrinsicProps, "type"> {
  Component?: string;
  href?: string | null;
  rel?: string | null;
  target?: string | null;
  children?: React.ReactNode;
}

// Vercel uses defined array of paths - href.pathname.startsWith("/support") || href.pathname.startsWith("/docs") ...
const isInternal = (href: string) => href.startsWith("/");

const ButtonWrapper: React.FC<Props> = ({
  // custom props
  href,
  as,
  tab,
  shallow,
  children,
  ...props
}) => {
  if (props.disabled || props.loading)
    return <Button {...props}>{children}</Button>;

  // Link is not internal
  if (typeof href === "string" && (tab || (href && !isInternal)))
    return (
      <Button
        Component="a"
        href={props.disabled ? undefined : href}
        rel={tab ? "noopener" : undefined}
        target={tab ? "_blank" : undefined}
      ></Button>
    );

  const BtnRef = React.forwardRef(
    (
      { children, onClick, onMouseEnter, ...props }: BtnRefProps,
      ref: React.ForwardedRef<HTMLButtonElement>
    ) => {
      return (
        <Button
          ref={ref}
          {...props}
          passthroughOnClick={onClick}
          passthroughOnMouseEnter={onMouseEnter}
        >
          {children}
        </Button>
      );
    }
  );

  return (
    <Link
      as={as}
      href={href}
      legacyBehavior={true}
      passHref={!!href}
      shallow={shallow}
    >
      <BtnRef
        Component="a"
        href={props.disabled ? null : href}
        rel={tab ? "noopener" : null}
        target={tab ? "_blank" : null}
        {...props}
      >
        {children}
      </BtnRef>
    </Link>
  );
};

ButtonWrapper.displayName = "ButtonWrapper";
export default ButtonWrapper;
