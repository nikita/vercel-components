import React, { forwardRef, Ref } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FCC } from "../../react";
import styles from "./Link.module.css";
//import ExternalLink from "../../icons/ExternalLink";

export interface Props {
  type?: string;
  variant?: string;
  external?: string;
  tab?: boolean;
  href?: string;
  className?: string;
  ref?: Ref<any>;

  onClick?: any;

  as?: string;
  passHref?: boolean;
  shallow?: boolean;
  prefetch?: boolean;
}

const isInternalLink = (href: string | URL) => {
  const external =
    "string" === typeof href
      ? href
      : null === href || void 0 === href
      ? void 0
      : href.pathname;

  return !!external;
};

const LinkComponent: FCC<Props> = forwardRef(
  (
    { type, variant, external, tab, href, children, className, ...props },
    ref
  ) => {
    const isExternal = href && isInternalLink(href);

    const isExternal2 =
      tab ||
      external ||
      (href && !isInternalLink(href) && !href.startsWith("#"));
    const variantOrType = variant || type;
    const linkVariantTypeStyle = variantOrType ? styles[variantOrType] : "";

    if (isExternal2) {
      return (
        <a
          href={href}
          rel="noopener"
          target="_blank"
          {...props}
          className={clsx(
            styles.link,
            {
              [styles.external]: Boolean(external),
            },
            linkVariantTypeStyle,
            className
          )}
          ref={ref}
        >
          {children}
          {/*
            TODO
            {Boolean(external) ? (
              <ExternalLink className={styles.externalIcon}  size="1em" />
            ) : null}
          */}
        </a>
      );
    }

    const { as, passHref, shallow, ...props2 } = props;
    const prefetch = props2.prefetch;
    let isPrefetch = prefetch === undefined || prefetch;

    return href || props.onClick ? (
      href ? (
        href.startsWith("#") ? (
          <a
            href={href}
            {...props2}
            className={clsx(styles.link, linkVariantTypeStyle, className)}
            ref={ref}
          >
            {children}
          </a>
        ) : (
          (isExternal || (isPrefetch = false),
          (
            <>
              <Link
                as={as}
                href={href}
                passHref={passHref}
                prefetch={!!isPrefetch && void 0}
                shallow={shallow}
                {...props2}
                className={clsx(styles.link, linkVariantTypeStyle, className)}
                ref={ref}
              >
                {children}
              </Link>
            </>
          ))
        )
      ) : (
        /* ??? */
        <span
          {...props2}
          className={clsx(styles.link, linkVariantTypeStyle, className)}
          onKeyDown={(e) => {
            let cb = props2.onClick;
            if (e.key === "Enter" && cb !== null) cb.call(props2);
          }}
          ref={ref}
          role="link"
          tabIndex={0}
        >
          {children}
        </span>
      )
    ) : (
      /* Disabled Link */
      <span
        {...props2}
        aria-disabled={true}
        className={clsx(styles.disabled, linkVariantTypeStyle, className)}
        ref={ref}
        role="link"
        tabIndex={-1}
      >
        {children}
      </span>
    );
  }
);

LinkComponent.displayName = "Link";
export default LinkComponent;
