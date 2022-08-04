import React from "react";

export const IconSizeContext = React.createContext(null);
IconSizeContext.displayName = "IconSizeContext";

export const useIconSize = () => React.useContext(IconSizeContext);

const defaultIconSize = 24;
const defaultViewBox = `0 0 ${defaultIconSize} ${defaultIconSize}`;
const defaultStroke = "round";

export interface Props {
  color?: string;
  secondary?: string;
  size?: number | string;
  fill?: string;
  viewBox?: string;

  weight?: string;
  align?: any;

  style?: object;
}

export const Icon = (
  icon: any,
  htmlIcon?: boolean | string,
  {
    color: _color,
    secondary: _secondary,
    size: _size,
    fill: _fill,
    viewBox = defaultViewBox,
  }: Props = {}
) => {
  const IconWrapper = React.memo((props: Props) => {
    const iconSize = useIconSize();
    const {
      size = iconSize || _size || defaultIconSize,
      color = _color || "currentColor",
      secondary = _secondary || "var(--geist-background)",
      weight = "normal",
      fill = _fill,
      align,
      ...restProps
    } = props;

    const weightMemo = React.useMemo(
      () => (weight === "bold" ? 2 : weight === "light" ? 1 : 1.5),
      [weight, props.weight]
    );
    const alignMemo = React.useMemo(
      () =>
        align
          ? align === "top"
            ? "text-top"
            : align === "bottom"
            ? "text-bottom"
            : align === "middle"
            ? "middle"
            : align
          : null,
      [align]
    );

    return fill && htmlIcon ? (
      <svg
        data-testid="geist-icon"
        height={size}
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap={defaultStroke}
        strokeLinejoin={defaultStroke}
        strokeWidth={weightMemo}
        viewBox={viewBox}
        width={size}
        {...restProps}
        dangerouslySetInnerHTML={{
          __html: htmlIcon === true ? icon : htmlIcon,
        }}
        style={{
          ...restProps.style,
          color,
          // @ts-ignore
          "--geist-fill": "currentColor",
          "--geist-stroke": secondary,
          verticalAlign: alignMemo || undefined,
        }}
      />
    ) : (
      <svg
        data-testid="geist-icon"
        fill="none"
        height={size}
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap={defaultStroke}
        strokeLinejoin={defaultStroke}
        strokeWidth={weightMemo}
        viewBox={viewBox}
        width={size}
        {...restProps}
        dangerouslySetInnerHTML={{ __html: icon }}
        style={{
          ...restProps.style,
          color,
          verticalAlign: alignMemo || undefined,
        }}
      />
    );
  });

  // @ts-ignore
  IconWrapper.hasFill = !!htmlIcon;

  return IconWrapper;
};
