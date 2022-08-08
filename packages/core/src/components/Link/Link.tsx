import React, { forwardRef, Ref } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import styles from "./link.module.css";
import ExternalLink from "@icons/ExternalLink";

interface Props {
  type?: string;
  variant?: string;
  external?: boolean | string;
  tab?: boolean;
  href?: string;
  children?: React.ReactNode;
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

const Link = forwardRef(
  (
    {
      type,
      variant,
      external,
      tab,
      href,
      children,
      className,
      ...props
    }: Props,
    ref: React.ForwardedRef<HTMLAnchorElement>
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
          {Boolean(external) ? (
            // @ts-ignore
            <ExternalLink className={styles.externalIcon} size="1em" />
          ) : null}
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
              <NextLink
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
              </NextLink>
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

Link.displayName = "Link";
export default Link;
