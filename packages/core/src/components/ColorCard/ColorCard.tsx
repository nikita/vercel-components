import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { GeistText } from "../../components/Text";
import { useToasts } from "../../components/Toast";
import { useTheme } from "next-themes";
import styles from "./color-card.module.css";

const rgbToHex = (rgb: string) =>
  rgb
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
    )
    .substring(1)
    .match(/.{2}/g)
    .map((hex) => parseInt(hex, 16));

const getRGB = (rgb: string) => {
  if (!rgb) return false;
  let b = rgbToHex(rgb);
  return (299 * b[0] + 587 * b[1] + 114 * b[2]) / 1000 < 128;
};

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => setLoading(true), []);
  return loading;
};

const computeBgColor = (variable: string) =>
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(variable.replace("var(", "").replace(")", ""))
    .trim();

const ColorCardSnippet = ({ text }: { text: string }) => {
  const toasts = useToasts();

  const copyCb = useCallback(() => {
    navigator.clipboard.writeText(text);
    toasts.success(`Copied \`${text}\` to clipboard!`);
  }, [toasts, text]);

  return (
    <span className={styles.snippet} onClick={copyCb}>
      <GeistText Component="p" code={true} small={true}>
        {text}
      </GeistText>
    </span>
  );
};

const ColorCard = ({
  name,
  variable,
  dark,
}: {
  name: string;
  variable: string;
  dark?: boolean;
}) => {
  const loading = useLoading();
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState(computeBgColor(variable));

  useEffect(() => {
    setTimeout(() => setBgColor(computeBgColor(variable)), 1);
  }, [theme, variable]);

  const bgColorHex = dark ? dark : getRGB(bgColor);

  return loading ? (
    <div
      className={clsx(styles.color, {
        [styles.dark]: bgColorHex,
      })}
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <div>
          <GeistText h4={true} noMargin={true}>
            {name}
          </GeistText>
        </div>

        <div>
          <ColorCardSnippet text={variable} />
        </div>
        <div>
          <ColorCardSnippet text={bgColor.toUpperCase()} />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.placeholder} />
  );
};

export default ColorCard;
