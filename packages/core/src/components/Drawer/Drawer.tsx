import React from "react";
import clsx from "clsx";
import useMeasure from "react-use-measure";
import { usePreventScroll } from "@react-aria/overlays";
import Portal from "@reach/portal";
import { FCC } from "../../react";
// import { FocusScope } from "@react-aria/focus";

interface Props {
  show: boolean;
  onDismiss?: () => void;
}

const Drawer: FCC<Props> = ({ children, show, onDismiss }) => {
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
