import { Icon } from "@contexts/IconSizeContext";

const Info = Icon(
  '<circle cx="12" cy="12" r="10" fill="var(--geist-fill)"/><path d="M12 16v-4" stroke="var(--geist-stroke)"/><path d="M12 8h.01" stroke="var(--geist-stroke)"/>',
  true,
  {
    color: "var(--accents-2)",
    secondary: "var(--geist-foreground)",
    size: 14,
    fill: true,
  }
);

export default Info;
