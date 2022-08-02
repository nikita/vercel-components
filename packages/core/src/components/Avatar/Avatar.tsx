import React from "react";
import styles from "./avatar.module.css";

interface Props {
  size: string;
  src: string;
}

const Avatar = ({ size, src }: Props) => {
  return (
    <span className={styles.avatar} style={{ "--size": `${size}px` } as any}>
      <img
        width={size}
        height={size}
        decoding="async"
        loading="lazy"
        {...{ async: true }}
        {...{ importance: "low" }}
        alt="Avatar"
        title="Avatar"
        src={src}
        className={styles.ready}
      />
    </span>
  );
};

export default Avatar;
