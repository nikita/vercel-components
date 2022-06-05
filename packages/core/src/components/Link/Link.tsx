import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { UrlObject } from "url";
import { FCC } from "../../react";
import styles from "./Link.module.css";

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
}

const filterProps = (props, ignore) => {
  const newProps = {};

  for (const prop of Object.keys(props)) {
    if (!ignore.includes(prop)) newProps[prop] = props[prop];
  }

  return newProps;
};

const LinkComponent: FCC<Props> = (
  {
    href,
    as,
    shallow,
    passHref,
    color,
    underline,
    className,
    prefetch,
    children,
  },
  props
) => {
  const filteredProps: any = filterProps(props, [
    "as",
    "href",
    "passHref",
    "shallow",
    "color",
    "underline",
    "children",
    "className",
  ]);

  let isPrefetch = prefetch === null || prefetch;

  const hrefPath = typeof href === "string" ? href : href.pathname;
  if (hrefPath && hrefPath.startsWith("/")) isPrefetch = false;

  const text = (
    <a
      {...filteredProps}
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
      children={text}
    ></Link>
  ) : (
    text
  );
};

export default LinkComponent;
