import React, { CSSProperties } from "react";
import clsx from "clsx";
import Portal from "@reach/portal";
import ToastContainer from "./ToastContainer";
import styles from "./toasts.module.css";

interface Props {
  center: boolean;
  setToastMethods: void;
}

interface State {
  hovering: boolean;
  messages: any[];
  offsetBottom: number;
}

class ToastArea extends React.Component<Props, State> {
  success: (e: any) => void;
  clear: any;
  error: any;
  message: any;
  removeToast: any;
  removeToastByKey: any;
  setMessage: any;
  setHiding: any;
  violet: any;
  onViewportChange: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  handleToastHeight: (e: any, t: any) => void;

  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
      messages: [],
      offsetBottom: 0,
    };

    this.componentDidMount = () => {
      var e, t;
      "visualViewport" in window &&
        (window.visualViewport.addEventListener(
          "resize",
          this.onViewportChange
        ),
        this.onViewportChange()),
        null === (t = (e = this.props).setToastMethods) ||
          void 0 === t ||
          t.call(e, {
            clear: this.clear,
            error: this.error,
            message: this.message,
            removeToast: this.removeToast,
            removeToastByKey: this.removeToastByKey,
            setMessage: this.setMessage,
            setHiding: this.setHiding,
            success: this.success,
            violet: this.violet,
            current: {
              clear: this.clear,
              error: this.error,
              message: this.message,
              removeToast: this.removeToast,
              removeToastByKey: this.removeToastByKey,
              setMessage: this.setMessage,
              setHiding: this.setHiding,
              success: this.success,
              violet: this.violet,
            },
            loaded: true,
          });
    };

    this.componentWillUnmount = () => {
      var e, t;
      "visualViewport" in window &&
        window.visualViewport.removeEventListener(
          "resize",
          this.onViewportChange
        ),
        null === (t = (e = this.props).setToastMethods) ||
          void 0 === t ||
          t.call(e, void 0);
    };

    // Adds a toast message
    this.message = (msg) => {
      const message =
        typeof msg === "string"
          ? {
              text: msg,
            }
          : msg;
      const messageId = message.key || String(Date.now());

      this.setState(({ messages }) => {
        return -1 !== messages.findIndex((e) => e.key === messageId)
          ? null
          : {
              messages: [
                ...messages,
                {
                  key: messageId,
                  ...message,
                },
              ],
            };
      });

      return messageId;
    };

    // Set toast message
    this.setMessage = (msg) => {
      const message =
        typeof msg === "string"
          ? {
              text: msg,
            }
          : msg;

      this.setState({
        messages: [message],
      });
    };

    // Sets all toast messages to hide?
    this.setHiding = () => {
      this.setState({
        messages: this.state.messages.map((message) => ({
          ...message,
          shouldHide: true,
        })),
      });
    };

    this.error = (msg) => {
      const message = msg
        ? typeof msg === "string"
          ? {
              text: msg,
            }
          : msg
        : {
            text: "An error occurred.",
          };

      this.message({ ...message, type: "error" });
    };

    this.success = (msg) => {
      const message = msg
        ? typeof msg === "string"
          ? {
              text: msg,
            }
          : msg
        : {
            text: "Success!",
          };

      this.message({ ...message, type: "success" });
    };

    this.violet = (msg) => {
      const message = msg
        ? typeof msg === "string"
          ? {
              text: msg,
            }
          : msg
        : {
            text: "Success!",
          };

      this.message({ ...message, type: "violet" });
    };

    // Set hovering to true
    this.onMouseEnter = () => {
      this.setState({
        hovering: true,
      });
    };

    // Set hovering to false
    this.onMouseLeave = () => {
      this.setState({
        hovering: false,
      });
    };

    // Sticks Toast to bottom of window on scroll, etc
    this.onViewportChange = () => {
      const windowBottom = window.innerHeight - window.visualViewport.height;
      if (this.state.offsetBottom !== windowBottom)
        this.setState({
          offsetBottom: windowBottom,
        });
    };

    // Remove a toast via index
    this.removeToast = (i) => {
      this.setState(({ messages }) => {
        const prevMessages = messages;

        return (
          prevMessages.splice(i, 1),
          {
            messages: prevMessages,
          }
        );
      });
    };

    // Remove a toast via key [key: number || toast object]
    this.removeToastByKey = (key) => {
      const isObject = Array.isArray(key);

      this.setState(({ messages }) => {
        return {
          messages: messages.filter((message) =>
            isObject ? !key.includes(message.key) : message.key !== key
          ),
        };
      });
    };

    // Set a toast height if truthy
    this.handleToastHeight = (height, i) => {
      console.log("handleToastHeight", height, i);
      if (!height) return;

      const { messages } = this.state;
      const prevMessages = messages;

      prevMessages[i].height = height;

      this.setState({
        messages: prevMessages,
      });
    };

    // Clear all toast messages
    this.clear = () => {
      this.setState({
        messages: [],
      });
    };
  }

  render() {
    const { center } = this.props;
    const { messages, offsetBottom } = this.state;

    return messages.length ? (
      <Portal>
        <div
          className={clsx("toast-area", styles.toastArea, {
            [styles.center]: center,
            [styles.multiple]: messages.length > 1,
          })}
          // "data-testid"={(0,l.C)("toasts", "list")}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onTouchEnd={this.onMouseLeave}
          onTouchStart={this.onMouseEnter}
          style={{ "--offset-bottom": offsetBottom + "px" } as CSSProperties}
        >
          {messages.map((message, i) => (
            <ToastContainer
              heights={messages.map((message) => message.height).reverse()}
              hovering={this.state.hovering}
              onMount={(e) => this.handleToastHeight(e, i)}
              position={messages.length - i - 1}
              remove={() => this.removeToast(i)}
              {...message}
            >
              {message.key}
            </ToastContainer>
          ))}
        </div>
      </Portal>
    ) : null;
  }
}

export default ToastArea;
