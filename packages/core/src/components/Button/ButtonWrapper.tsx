import React, { forwardRef } from "react";
import Link from "next/link";
import { FCC } from "../../react";
import Button from "./Button";

type IntrinsicProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface Props extends Omit<IntrinsicProps, "prefix" | "type"> {
  href?: string;
  as?: string;
  tab?: boolean;
  shallow?: boolean;
  loading?: boolean;
}

interface BtnRefProps {
  children?: any;
}

// Vercel uses defined array of paths - href.pathname.startsWith("/support") || href.pathname.startsWith("/docs") ...
const isInternal = (href: string) => href.startsWith("/");

const ButtonWrapper: React.ComponentType<Props> = ({
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

  const BtnRef = forwardRef<FCC, BtnRefProps>(
    // @ts-ignore
    ({ children, onClick, onMouseEnter, ...props }, ref) => {
      return (
        <Button
          // @ts-ignore
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
        // @ts-ignore
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
