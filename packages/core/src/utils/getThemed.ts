export const getThemed = (type, fill = false, variant = false) =>
  type
    ? [
        "geist-themed",
        `geist-${type}`,
        fill ? `geist-${type}-fill` : null,
        variant ? `geist-${type}-${variant}` : null,
      ]
    : "";
