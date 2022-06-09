import React from "react";
import { useIconSize } from "../contexts/IconSizeContext";

const MoreVertical = ({
  color = "var(--geist-foreground)",
  size,
  weight = "",
}) => {
  const iconSize = useIconSize();
  return (
    <svg
      viewBox="0 0 24 24"
      width={size || iconSize}
      height={size || iconSize}
      stroke="currentColor"
      strokeWidth={weight == "light" ? "1" : "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ color }}
    >
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
};

export default MoreVertical;
