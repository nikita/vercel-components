import React from "react";
import clsx from "clsx";
import throttle from "lodash-es/throttle";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import styles from "./scroller.module.css";

interface Props {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  className?: string;
  scrollerClassName?: string;
  overlayClassName?: string;
  childrenContainerClassName?: string;
  gradient?: any;
}

const Scroller = ({
  width = "100%",
  height = "100%",
  children,
  className,
  scrollerClassName,
  overlayClassName,
  childrenContainerClassName,
  gradient,
}: Props) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [ref, { width: mWidth, height: mHeight }] = useMeasure({
    polyfill: ResizeObserver,
  });

  const [scroll, setScroll] = React.useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });

  const scroller = React.useMemo(
    () =>
      throttle(() => {
        if (!scrollRef.current) return;

        const currentRef = scrollRef.current;
        const scrollTop = currentRef.scrollTop;
        const scrollLeft = currentRef.scrollLeft;
        const isScrolledDown = scrollTop > 5;
        const scrollHeight =
          scrollTop + currentRef.clientHeight + 5 < currentRef.scrollHeight;
        const isScrolledSide = scrollLeft > 5;
        const scrollWidth =
          scrollLeft + currentRef.clientWidth + 5 < currentRef.scrollWidth;

        setScroll((prevScroll) =>
          prevScroll.top === isScrolledDown &&
          prevScroll.bottom === scrollHeight &&
          prevScroll.left === isScrolledSide &&
          prevScroll.right === scrollWidth
            ? prevScroll
            : {
                top: isScrolledDown,
                right: scrollWidth,
                bottom: scrollHeight,
                left: isScrolledSide,
              }
        );
      }, 100),
    []
  );

  React.useEffect(() => {
    scroller();
  }, [mWidth, mHeight]);

  return (
    <div
      className={clsx(styles.overlayContainer, className)}
      data-geist-scroller=""
      data-version="v1"
      style={{ width, height }}
    >
      <div
        className={clsx(styles.overlay, scroll, overlayClassName)}
        data-geist-scroller-overlay=""
        style={
          gradient
            ? {
                // @ts-ignore
                "--scroller-gradient": gradient,
              }
            : undefined
        }
      />
      <div
        className={(styles.scroller, scrollerClassName)}
        data-geist-scroller-container=""
        data-geist-scroller-overflowing={
          Object.values(scroll).filter(Boolean).length ? "" : undefined
        }
        onScroll={scroller}
        ref={scrollRef}
      >
        <div className={childrenContainerClassName} ref={ref}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Scroller;
