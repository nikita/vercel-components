import React from "react";
import { Button, ButtonProps } from "@components/Button";
import { useMenu } from "./menu-context";

export const MenuButton = ({ children, onClick, ...props }: ButtonProps) => {
  const { menuId, buttonId, buttonRef, setOpen, open } = useMenu();

  return (
    <Button
      id={buttonId}
      aria-haspopup={true}
      aria-describedby={menuId}
      aria-expanded={open}
      data-geist-menu-button=""
      ref={buttonRef}
      onClick={(e) => {
        onClick?.(e);
        setOpen(true);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
