import React from "react";
import clsx from "clsx";
import useMeasure from "react-use-measure";
import { usePreventScroll } from "@react-aria/overlays";
import Portal from "@reach/portal";
// import { FocusScope } from "@react-aria/focus";

interface Props {
  children?: React.ReactNode;
  show: boolean;
  onDismiss?: () => void;
}

const Drawer = ({ children, show, onDismiss }: Props) => {
  usePreventScroll({ isDisabled: !show });

  // useMeasure will update through window resize
  const [ref2, bounds] = useMeasure();

  return (
    <Portal>
      <div className={clsx("geist-drawer", { show: show })}>
        <div
          className={clsx("geist-drawer-overlay")}
          onClick={() => {
            onDismiss?.();
          }}
        />
        <div
          className={clsx("geist-drawer-container")}
          style={{
            height: bounds.height + 20,
            transform: `translate3d(0px, ${show ? "0px" : "100%"}, 102px)`,
          }}
        >
          <div>
            <div ref={ref2}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Drawer;
