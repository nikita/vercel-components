import React, { FC, forwardRef } from "react";
import clsx from "clsx";

interface TextTypeProps {
  noMargin?: boolean;
  weight?: number | string;
  code?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
  center?: boolean;
  Component?: any;
  children?: React.ReactNode;
  className?: string;
  preset?: string;
  maxWidth?: string | number;
  style?: object;
}

interface ApplyTextStylesProps {
  mark?: boolean;
  underline?: boolean;
  strike?: boolean;
  bold?: boolean;
  italic?: boolean;
}

interface ForwardRefProps {
  defaultFill?: any;
  hasFill?: any;
}

interface RefContainerProps {
  className?: any;
  forwardedRef?: any;

  type?: any;
  fill?: any;
}

const ForwardRef = (
  Component: any,
  { defaultFill, hasFill, ...props }: ForwardRefProps
) => {
  const getTheme = (type: any, fill: any) =>
    type
      ? [
          "geist-themed",
          "geist-".concat(type),
          fill ? "geist-".concat(type, "-fill") : null,
        ]
      : null;

  const RefContainer = ({
    className,
    forwardedRef,
    ...props
  }: RefContainerProps) => {
    const { type } = props;
    const fill = props.fill || defaultFill;

    return (
      <Component
        className={clsx(getTheme(type, fill), className)}
        {...props}
        ref={forwardedRef}
      />
    );
  };

  const d = (props: any, ref: any) => (
    <RefContainer {...props} forwardedRef={ref}></RefContainer>
  );
  d.displayName = Component.displayName || Component.name;

  return forwardRef(d);
};

const applyTextStyles = (
  children: any,
  { mark, underline, strike, bold, italic }: ApplyTextStylesProps
) => {
  function l(applyStyle?: boolean, children?: React.ReactNode, type?: string) {
    if (applyStyle !== undefined && applyStyle)
      return React.createElement(type!, {}, children || null);
    return children;
    /*  let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
          , e = arguments.length > 1 ? arguments[1] : void 0
          , n = arguments.length > 2 ? arguments[2] : void 0;
        return t ? React.createElement(n, {}, e) : e */
  }

  let s = children;
  return (
    (s = l(mark, children, "mark")),
    (s = l(underline, children, "u")),
    (s = l(strike, children, "s")),
    (s = l(bold, children, "b")),
    (s = l(italic, children, "i")),
    s
  );
};

const createTextType = (type: string) => {
  const TextType = ({
    noMargin,
    weight,
    code,
    uppercase,
    capitalize,
    center,
    Component = type,
    children,
    className,
    preset,
    maxWidth,
    style,
    ...props
  }: TextTypeProps) => {
    return (
      <Component
        className={clsx(
          className,
          "geist-text",
          {
            ["geist-text-no-margin"]: noMargin,
            ["geist-text-mono"]: code,
            ["geist-text-upper"]: uppercase,
            ["geist-text-capitalize"]: capitalize,
            ["geist-text-center"]: center,
          },
          preset || type,
          weight ? `w-${weight}` : null
        )}
        style={{ maxWidth, ...style }}
        {...props}
      >
        {children}
      </Component>
    );
  };
  TextType.displayName = `Text_${type}`;
  return TextType;
};

const _h1 = createTextType("h1");
const _h2 = createTextType("h2");
const _h3 = createTextType("h3");
const _h4 = createTextType("h4");
const _h5 = createTextType("h5");
const _h6 = createTextType("h6");
const _p = createTextType("p");
const _small = createTextType("small");
const _span = createTextType("span");

const componentTypes = [_h1, _h2, _h3, _h4, _h5, _h6, _p, _small, _span];

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  Component?: React.ReactNode;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  small?: boolean;
  span?: boolean;
  mark?: boolean;
  underline?: boolean;
  strike?: boolean;
  bold?: boolean;
  italic?: boolean;

  type?: string;
  weight?: number | string;
}

const Text = ({
  Component,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  small,
  span,
  mark,
  underline,
  strike,
  bold,
  italic,
  children,
  ...props
}: TextProps) => {
  const ComponentInternal =
    componentTypes[[h1, h2, h3, h4, h5, h6, p, small, span].indexOf(true)] ||
    _p;

  return (
    <ComponentInternal Component={Component} {...props}>
      {applyTextStyles(children, { mark, underline, strike, bold, italic })}
    </ComponentInternal>
  );
};

export default ForwardRef(Text, { hasFill: false });
