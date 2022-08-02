import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { UrlObject } from "url";
import styles from "./LinkOld.module.css";

declare type Url = string | UrlObject;

interface Props {
  href?: Url | null;
  as?: Url;
  shallow?: boolean;
  passHref?: boolean;
  color?: string;
  underline?: string;
  className?: string;
  prefetch?: boolean;
  children?: React.ReactNode;
}

const LinkOld = ({
  href,
  as,
  shallow,
  passHref,
  color,
  underline,
  className,
  prefetch,
  children,
  ...props
}: Props) => {
  let isPrefetch = prefetch === null || prefetch;

  const hrefPath = typeof href === "string" ? href : href.pathname;
  if (hrefPath && hrefPath.startsWith("/")) isPrefetch = false;

  const text = (
    <a
      {...props}
      className={clsx(className, styles.internal, {
        [styles["color"]]: color,
        [styles["underline"]]: underline,
      })}
      children={children}
    />
  );

  return href ? (
    <Link
      as={as}
      href={href}
      legacyBehavior={true}
      passHref={passHref}
      prefetch={isPrefetch && undefined}
      shallow={shallow}
    >
      {text}
    </Link>
  ) : (
    text
  );
};

export default LinkOld;
