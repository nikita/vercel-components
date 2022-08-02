// Convert numbers or strings to pixel value
// Helpful for styled-jsx when using a prop
// height: ${toPixels(height)}; (supports height={20} and height="20px")

export const toPixels = (value: string | number) =>
  typeof value === "number" ? `${value}px` : value;
