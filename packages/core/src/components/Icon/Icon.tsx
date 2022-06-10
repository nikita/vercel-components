import React, { FC } from "react";
import useIconSize from "../../contexts/IconSizeContext/useIconSize";

interface IIcon {
  color?: string;
  secondary?: string;
  size?: number | string;
  fill?: string;
  viewBox?: string;

  weight?: string;
  align?: any;
}

export interface IconWrapperProps {
  size?: number | string;
  color?: string;
  secondary?: string;
  weight?: string;
  fill?: string;
  align?: string;

  style?: object;
}

const defaultIconSize = 24;
const defaultViewBox = `0 0 ${defaultIconSize} ${defaultIconSize}`;
const defaultStroke = "round";

const Icon = (
  icon: any,
  htmlIcon?: boolean | string,
  {
    color: _color,
    secondary: _secondary,
    size: _size,
    fill: _fill,
    viewBox = defaultViewBox,
  }: IIcon = {}
) => {
  const IconWrapper: FC<IconWrapperProps> = ({
    size = useIconSize() || _size || defaultIconSize,
    color = _color || "currentColor",
    secondary = _secondary || "var(--geist-background)",
    weight = "normal",
    fill = _fill,
    align,
    ...props
  }) => {
    const weightMemo = React.useMemo(
      () => (weight === "bold" ? 2 : weight === "light" ? 1 : 1.5),
      [weight]
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
        {...props}
        dangerouslySetInnerHTML={{
          __html: !0 === htmlIcon ? icon : htmlIcon,
        }}
        style={{
          ...props.style,
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
        {...props}
        dangerouslySetInnerHTML={{ __html: icon }}
        style={{
          ...props.style,
          color,
          verticalAlign: alignMemo || undefined,
        }}
      />
    );
  };

  const memoizedIcon = React.memo(IconWrapper);
  // @ts-ignore
  memoizedIcon.hasFill = !!htmlIcon;
  return memoizedIcon;
};

export default Icon;
