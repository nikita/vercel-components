import React from "react";
import Link from "next/link";
import Button from "./Button";

type IntrinsicProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends Omit<IntrinsicProps, "type"> {
  href?: string;
  as?: string;
  tab?: boolean;
  shallow?: boolean;
  scroll?: boolean;
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
BtnRef.displayName = "ButtonWrapper";

const ButtonWrapper: React.FC<Props> = ({
  href,
  as,
  tab,
  shallow,
  scroll,
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
        {...props}
      >
        {children}
      </Button>
    );

  return (
    <Link
      as={as}
      href={href}
      legacyBehavior={true}
      passHref={!!href}
      scroll={scroll}
      shallow={shallow}
    >
      <BtnRef
        Component="a"
        rel={tab ? "noopener" : undefined}
        target={tab ? "_blank" : undefined}
        {...props}
      >
        {children}
      </BtnRef>
    </Link>
  );
};

export default ButtonWrapper;
