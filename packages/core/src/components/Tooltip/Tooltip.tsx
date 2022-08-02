import {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import Portal from "@reach/portal";
import { throttle } from "lodash-es";
import { useId } from "@hooks";
import { getThemed } from "@utils/getThemed";
import styles from "./tooltip.module.css";

interface Props {
  boxAlign?: string;
  center?: boolean;
  children?: React.ReactNode;
  className?: string;
  cursor?: any;
  delay?: boolean;
  delayTime?: number;
  disableTriggers?: boolean;
  fill?: boolean;
  hideOnClick?: boolean;
  invert?: boolean;
  maxWidth?: string;
  padding?: any;
  position?: string;
  shown?: number;
  sticky?: boolean;
  style?: any;
  text: JSX.Element | string;
  tip?: boolean;
  type?: any;
  wrap?: boolean;
}

const Tooltip = ({
  boxAlign = "center",
  center = true,
  children,
  className,
  cursor,
  delay = true,
  delayTime = 0,
  disableTriggers = false,
  fill = true,
  hideOnClick = false,
  invert = true,
  maxWidth = "250px",
  padding,
  position = "top",
  shown = 0,
  sticky = false,
  style,
  text,
  tip = true,
  type,
  wrap = true,
}: Props) => {
  const [isShown, setIsShown] = useState(shown);
  const [scrollLocation, setScroll] = useState({
    top: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  });
  const ref = useRef(null);
  const typeFillStyle = getThemed(type, fill);
  const id = useId("tooltip-");

  const sizeCb = useCallback(() => {
    if (ref === null || ref === undefined ? undefined : ref.current) {
      // @ts-ignore
      const rect = ref.current.getBoundingClientRect();
      const { height, width } = rect;

      let { top, left, right } = rect;
      let a = window.innerWidth - right;

      top += window.scrollY;
      left += window.scrollX;
      a -= window.scrollX;

      setScroll({
        top: top,
        right: a,
        left: left,
        height: height,
        width: width,
      });
    }
  }, [setScroll]);

  const U = useCallback(
    (e: any) => {
      disableTriggers || (sizeCb(), setIsShown((prevShown) => prevShown | e));
    },
    [sizeCb, disableTriggers]
  );

  const H = useRef();

  const F = useCallback(
    (e: any) => {
      const t = setTimeout(() => U(e), delay ? delayTime : 0);
      // @ts-ignore
      H.current = t;
    },
    [delay, delayTime, U]
  );

  useEffect(() => {
    if (H.current) clearTimeout(H.current);
  }, []);

  const onBlur = useCallback(
    (e: any) => {
      disableTriggers ||
        (H.current && clearTimeout(H.current), setIsShown((t) => t & ~e));
    },
    [disableTriggers]
  );

  useEffect(() => {
    sizeCb();
    setIsShown(shown);
  }, [sizeCb, setIsShown, shown]);

  const onCloseKey = useCallback(
    (e: any) => {
      if (e.key === "Escape") onBlur(3);
    },
    [onBlur]
  );

  const memoizedSize = useMemo(() => throttle(sizeCb, 150), [sizeCb]);

  useEffect(() => {
    const cleanupListeners = () => {
      window.removeEventListener("keydown", onCloseKey);
      window.removeEventListener("resize", memoizedSize);
    };

    if (isShown > 0) {
      window.addEventListener("keydown", onCloseKey);
      window.addEventListener("resize", memoizedSize);
    } else cleanupListeners();

    return cleanupListeners;
  }, [onCloseKey, memoizedSize, isShown]);

  const memoizedTransformStyle = useMemo(() => {
    switch (position) {
      case "top":
        return boxAlign !== "center"
          ? "translate(\n            calc(0px),\n            calc(-100% - 10px)\n          )"
          : `translate(\n          calc(-50% + ${Math.ceil(
              scrollLocation.width / 2
            )}px),\n          calc(-100% - 10px)\n        )`;
      case "bottom":
        return boxAlign !== "center"
          ? `translate(\n            calc(0px),\n            calc(${~~scrollLocation.height}px + 10px)\n          )`
          : `translate(\n          calc(-50% + ${Math.ceil(
              scrollLocation.width / 2
            )}px),\n          calc(${~~scrollLocation.height}px + 10px)\n        )`;
      case "left":
        return `translate(\n          calc(-100% - 10px),\n          calc(-50% + ${Math.ceil(
          scrollLocation.height / 2
        )}px)\n        )`;
      case "right":
        return `translate(\n          calc(${Math.ceil(
          scrollLocation.width
        )}px + 10px),\n          calc(-50% + ${Math.ceil(
          scrollLocation.height / 2
        )}px)\n        )`;
      default:
        return "";
    }
  }, [position, boxAlign, scrollLocation]);

  const memoizedStyles = useMemo(
    () =>
      (position !== "bottom" && position !== "top") || boxAlign !== "right"
        ? {
            padding: padding,
            maxWidth: maxWidth,
            transform: memoizedTransformStyle,
            top: scrollLocation.top,
            left: scrollLocation.left,
          }
        : {
            padding: padding,
            maxWidth: maxWidth,
            transform: memoizedTransformStyle,
            top: scrollLocation.top,
            right: scrollLocation.right,
          },
    [
      boxAlign,
      scrollLocation.left,
      scrollLocation.right,
      scrollLocation.top,
      maxWidth,
      padding,
      position,
      memoizedTransformStyle,
    ]
  );

  return (isShown === 0 && disableTriggers) || text === undefined ? (
    <Fragment>{children}</Fragment>
  ) : (
    <span
      aria-describedby={isShown ? id : undefined}
      className={clsx(styles.container, className)}
      // "data-testid": (0, l.C)("legacy", "tooltip-trigger"),
      onBlur={() => onBlur(2)}
      onFocus={(e) => {
        if (hideOnClick) {
          onBlur(1);
          e.target.blur();
        }

        if (e.target === ref.current && sticky && !disableTriggers) F(2);
      }}
      onPointerEnter={() => F(1)}
      onPointerLeave={() => onBlur(1)}
      ref={ref}
      style={{
        cursor,
        ...style,
      }}
      tabIndex={0}
    >
      {isShown > 0 && (
        <Portal>
          <div
            className={clsx(styles.tooltip, typeFillStyle, {
              [styles.top]: position === "top",
              [styles.left]: position === "left",
              [styles.right]: position === "right",
              [styles.bottom]: position === "bottom",
              [styles["box-align-left"]]:
                (position === "bottom" || position === "top") &&
                boxAlign === "left",
              [styles["box-align-right"]]:
                (position === "bottom" || position === "top") &&
                boxAlign === "right",
              [styles.delay]: delay,
              [styles.tip]: tip,
              [styles.wrap]: wrap,
              "invert-theme": invert,
              [styles.center]: center,
            })}
            id={id}
            role="tooltip"
            style={memoizedStyles}
          >
            {tip && <i className={styles.triangle} />}
            {text}
          </div>
        </Portal>
      )}
      {children}
    </span>
  );
};

export default Tooltip;
