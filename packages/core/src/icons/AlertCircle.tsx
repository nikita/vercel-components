import { Icon } from "../components/Icon";

const AlertCircle = Icon(
  '<circle cx="12" cy="12" r="10" fill="var(--geist-fill)"/><path d="M12 8v4" stroke="var(--geist-stroke)"/><path d="M12 16h.01" stroke="var(--geist-stroke)"/>',
  true,
  // @ts-ignore
  {
    color: "var(--geist-warning)",
    secondary: "var(--geist-background)",
  }
);

export default AlertCircle;
