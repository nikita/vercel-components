import React from "react";
import clsx from "clsx";
import { LinkOld } from "../Link";
import XIcon from "../../icons/XIcon";
import { default as useBanner } from "./useBanner";
import styles from "./Banner.module.css";
import { IconSizeContext } from "../../contexts/IconSizeContext";

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

const Banner: React.ComponentType<Props> = ({
  title,
  desc,
  href,
  as,
  linkText,
  icon,
  special,
  localStorageKey,
  hideTitleOnMobile,
}) => {
  const [showBanner, handleClose] = useBanner(localStorageKey);

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



        // Sends metrics to Google?
        onClick={reportMetrics({
          category: "Marketing",
          action: "Clicked on banner",
          label: "Banner CTA",
        })}
        */
  return showBanner ? (
    <div
      role="banner"
      className={clsx(styles.banner, styles.hidden, {
        [styles["invert-theme"]]: special,
      })}
    >
      <LinkOld as={as} href={href}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <span
          className={clsx([
            styles.title,
            { "geist-hide-on-mobile": hideTitleOnMobile },
          ])}
        >
          {title}
        </span>
        <span className={styles.subtitle}>{desc}</span>
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
        className={styles.close}
        aria-label="Hide banner"
        onClick={handleClose}
      >
        <IconSizeContext.Provider value={{ size: 18 }}>
          <XIcon />
        </IconSizeContext.Provider>
      </button>
    </div>
  ) : null;
};

export default Banner;
