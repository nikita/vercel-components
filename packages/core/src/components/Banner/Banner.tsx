import React from "react";
import clsx from "clsx";
import useSWR from "swr";
import Head from "next/head";
import transliterate from "@sindresorhus/transliterate";
import XIcon from "@icons/X";
import { LinkOld } from "@components/Link";
import localStorage from "./localStorage";
import styles from "./Banner.module.css";

const replaceAndRegex = /[|\\{}()[\]^$+*?.-]/g;

const replaceAnd = (str) => {
  if ("string" != typeof str) throw TypeError("Expected a string");
  return str.replace(replaceAndRegex, "\\$&");
};

const transform = (string: string) => {
  var b, c;

  if (typeof string !== "string") {
    throw new TypeError(`Expected a string, got \`${typeof string}\``);
  }

  b = transliterate(string, {
    customReplacements: [["&", " and "]],
  })
    .replace(/([A-Z]{2,})([a-z\d]+)/g, "$1 $2")
    .replace(/([a-z\d]+)([A-Z]{2,})/g, "$1 $2")
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1 $2")
    .toLowerCase()
    .replace(/[^a-z\d]+/g, "-")
    .replace(/\\/g, "");

  c = replaceAnd("-");

  return b
    .replace(RegExp(c + "{2,}", "g"), "-")
    .replace(RegExp("^" + c + "|" + c + "$", "g"), "");
};

/* 
// Function recovered from Vercel page
function({category, action, label}) {
    try {
        window.ga("send", {
            hitType: "event",
            eventCategory: category,
            eventAction: action,
            eventLabel: label
        })
    } catch (r) {
        console.error("Cannot report metrics: event", r)
    }
}
*/

interface Props {
  title?: string;
  desc?: string;
  href?: string;
  as?: string;
  linkText?: string;
  icon?: string;
  special?: string;
  localStorageKey?: string;
  hideTitleOnMobile?: boolean;
}

const Banner = React.memo(
  ({
    title,
    desc,
    href,
    as,
    linkText,
    icon,
    special,
    localStorageKey,
    hideTitleOnMobile,
  }: Props) => {
    const [bannerScript, handleClose, bannerHidden] = (function (a, b, c) {
      const { data, mutate } = useSWR(
        ["localStorage", b],
        () => localStorage.getItem(b) || (c ? "1" : "0"),
        {
          shouldRetryOnError: false,
          // @ts-ignore
          errorMessage: false,
        }
      );

      if (a)
        React.useEffect(() => {
          data !== "1" || document.documentElement.classList.contains(a)
            ? data === "0" &&
              document.documentElement.classList.contains(a) &&
              document.documentElement.classList.remove(a)
            : document.documentElement.classList.add(a);
        }, [data, a]);

      const cb = React.useCallback(() => {
        mutate((a) => {
          a = a === "1" ? "0" : "1";
          localStorage.setItem(b, a);
          return a;
        });
      }, [b, mutate]);

      return [
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `;(function(){\n            try{\n              if(+(localStorage.getItem('${b}')||'${
                c ? "1" : "0"
              }')) {\n                document.documentElement.classList.add(\"${a}")\n              }\n            }catch(err){}\n          })()`,
            }}
          />
        </Head>,
        cb,
        data,
      ];
    })(
      "banner-hidden",
      `banner-hidden-${as ? transform(as) : localStorageKey}`,
      false
    );

    React.useEffect(
      () => document.documentElement.classList.remove("has-banner"),
      []
    );

    return bannerHidden === "1" ? null : (
      <div
        className={clsx(styles.banner, styles.hidden, {
          [styles["invert-theme"]]: special,
        })}
        role="banner"
      >
        {bannerScript}

        <LinkOld
          as={as}
          href={href}
          /*
          onClick: () => {
            (0, q.B)({
              category: "Marketing",
              action: "Clicked on banner",
              label: "Banner CTA",
            })
        }
        */
        >
          {/* Banner Icon */}
          {icon ? <span className={styles.icon}>{icon}</span> : null}

          {/* Banner Title */}
          <span
            className={clsx([
              styles.title,
              { "geist-hide-on-mobile": hideTitleOnMobile },
            ])}
          >
            {title}
          </span>

          {/* Banner SubTitle */}
          <span className={styles.subtitle}>{desc}</span>

          {/* Banner Link */}
          <span
            className={clsx(styles.link, {
              [styles["link-hide-title-on-mobile"]]: hideTitleOnMobile,
              [styles["hide-title"]]: !title,
            })}
          >
            {linkText || "Learn More"}
          </span>
        </LinkOld>

        <button
          aria-label="Hide banner"
          className={styles.close}
          onClick={handleClose}
        >
          <XIcon size={18} />
        </button>

        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html:
                ";(function(){document.documentElement.classList.add('has-banner')})()",
            }}
          />
        </Head>
      </div>
    );
  }
);

export default Banner;
