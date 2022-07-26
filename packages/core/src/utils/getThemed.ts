export const getThemed = (type, fill = false, n = false) =>
  type
    ? [
        "geist-themed",
        `geist-${type}`,
        fill ? `geist-${type}-fill` : null,
        n ? `geist-${type}-${n}` : null,
      ]
    : "";
