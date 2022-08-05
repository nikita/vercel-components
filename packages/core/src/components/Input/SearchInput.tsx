import React from "react";
import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import SearchIcon from "@icons/Search";
import styles from "./SearchInput.module.css";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const SearchInput = ({ className, ...props }: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>
        <SearchIcon />
      </span>
      <div className={styles.input_wrapper}>
        <input className={clsx(className, styles.input)} {...props} />
      </div>
    </div>
  );
};

export default SearchInput;
