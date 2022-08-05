import { Icon } from "@contexts/IconSizeContext";

const ArrowRightCircle = () =>
  Icon(
    '<circle cx="12" cy="12" r="10"/><path d="M12 16l4-4-4-4"/><path d="M8 12h8"/>',
    '<circle cx="12" cy="12" r="10" fill="var(--geist-fill)"/><path d="M12 16l4-4-4-4" fill="none" stroke="var(--geist-stroke)"/><path d="M8 12h8" stroke="var(--geist-stroke)"/>'
  );

export default ArrowRightCircle;
