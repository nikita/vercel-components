import clsx from "clsx";
import styles from "./fade-in.module.css";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

const FadeIn = ({ children, className, ...props }: Props) => (
  <span className={clsx(styles["fade-in"], className)} {...props}>
    {children}
  </span>
);

export default FadeIn;
