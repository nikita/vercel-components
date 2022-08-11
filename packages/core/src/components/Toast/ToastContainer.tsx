import React from "react";
import clsx from "clsx";
import { Button } from "@components/Button";
import styles from "./toasts.module.css";

interface Props {
  action?: boolean;
  preserve?: boolean;
  onMount?: (height: number) => void;
  shouldHide?: boolean;
  remove?: () => void;
  position?: number;
  heights?: number[];
  invertTheme?: boolean;
  type: string;
  text: string;
  onAction?: any;
  cancelAction?: any;
  onCancelAction?: any;
}

interface State {
  visible: boolean;
  hiding: boolean;
  hovering: boolean;
}

export default class ToastContainer extends React.Component<Props, State> {
  ref: React.RefObject<any>;
  hider: any;

  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      visible: false,
      hiding: false,
      hovering: false,
    };
  }

  componentDidMount() {
    const currentRef = this.ref.current;
    const { height } = currentRef.getBoundingClientRect();

    this.props.onMount(height);
    setTimeout(() => this.setState({ visible: true }), 10);

    this.props.action ||
      this.props.preserve ||
      (this.hider = setTimeout(this.hide, 3500));
  }

  componentWillUnmount() {
    clearTimeout(this.hider);
  }

  componentDidUpdate(_, prevState: State) {
    if (this.props.shouldHide)
      return (this.hider = setTimeout(this.hider, 300));

    this.props.preserve ||
      this.props.action ||
      (this.state.hovering
        ? clearTimeout(this.hider)
        : prevState.hovering &&
          !this.state.hovering &&
          (this.hider = setTimeout(this.hide, 3500)));
  }

  hide = () => {
    this.setState({ hiding: true }, () =>
      setTimeout(() => this.props.remove(), 200)
    );
  };

  calculateHeight() {
    const { heights, position } = this.props;

    if (position === 0) return;

    // @ts-ignore
    const height = position * -20;

    return {
      maxHeight: 50,
      transform:
        "translate3d(\n        0,\n        /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- TODO: Fix ESLint Error (#13355) */\n        calc(-"
          // @ts-ignore
          .concat(heights[0], "px + 100% + ")
          // @ts-ignore
          .concat(height, "px),\n        -")
          // @ts-ignore
          .concat(position, "px\n      ) scale(")
          // @ts-ignore
          .concat(1 - (position / 100) * 5, ")"),
    };
  }

  static getDerivedStateFromProps(state) {
    return state.hovering
      ? {
          hovering: true,
        }
      : {
          hovering: false,
        };
  }

  render() {
    const {
      text,
      action,
      onAction,
      cancelAction,
      onCancelAction,
      type,
      position,
      heights,
      invertTheme,
    } = this.props;
    const { visible } = this.state;

    const posHeight =
      0 === position
        ? 0
        : heights
            .slice(0, position)
            .filter(Boolean)
            .reduce((e, t) => (e && t ? e + t : e), 20 * position);

    return (
      /* ToastContainer */
      <div
        data-geist-toast=""
        ref={this.ref}
        style={
          visible
            ? { maxHeight: heights[position], ...this.calculateHeight() }
            : undefined
        }
        /* Dynamic jsx + styles */
        className={
          clsx("toast-container", styles.toastContainer, {
            "invert-theme": invertTheme,
            [styles.visible]: visible,
            [styles.error]: type === "error",
            [styles.success]: type === "success",
            [styles.violet]: type === "violet",
          }) || ""
        }
      >
        <div className={styles.toast}>
          {/* Toast Message */}
          <div
            /* Dynamic jsx */
            className={
              clsx(styles.message, {
                [styles.action]: action,
                [styles.cancel]: cancelAction,
              }) || ""
            }
          >
            {text}
          </div>

          {/* Cancel action button */}
          {cancelAction && (
            <Button
              className={type ? "dark-theme" : undefined}
              onClick={() => {
                onCancelAction === null ||
                  onCancelAction === undefined ||
                  onCancelAction();
                this.hide();
              }}
              /* small={true} */
              style={{ marginRight: 10 }}
              type="secondary"
            >
              {cancelAction || "Cancel"}
            </Button>
          )}

          {/* Action button */}
          {action && (
            <Button
              className={type ? "dark-theme" : undefined}
              onClick={() => {
                onAction === null || onAction === undefined || onAction();
                this.hide();
              }}
              /* small={true} */
            >
              {action}
            </Button>
          )}
        </div>

        <style jsx>{`
         :global(.toast-area:hover) .toast-container {
          max-height:${heights[position]}px!important;
          -webkit-transform:translate3d(0,${
            -1 * (posHeight || 0)
          }px,-${position}px)scale(1)!important;
          -moz-transform:translate3d(0,${
            -1 * (posHeight || 0)
          }px,-${position}px)scale(1)!important;
          transform:translate3d(0,${
            -1 * (posHeight || 0)
          }"px,-${position}px)scale(1)!important;
        }
        `}</style>
      </div>
    );
  }
}
