import { createContext, useContext, useState, Component } from "react";
import ToastArea from "./ToastArea";

let env = "developement";

type ToastType = "success" | "error" | "violet";

export interface IToast {
  height: number;
  key: string;
  preserve?: boolean;
  text: string;
  type?: ToastType;
  action?: string;
  cancelAction?: string;
}

interface IToastsContext {
  current?: {
    clear: void;
    error: (message: Partial<IToast> | string) => void;
    message: (message: Partial<IToast> | string) => void;
    removeToast: (key: string) => void;
    removeToastByKey: (key: string) => void;
    setMessage: (message: Partial<IToast> | string) => void;
    setHiding: void;
    success: (message: Partial<IToast> | string) => void;
    violet: (message: Partial<IToast> | string) => void;
  };
  clear: void;
  error: (message: Partial<IToast> | string) => void;
  message: (message: Partial<IToast> | string) => void;
  removeToast: (key: string) => void;
  removeToastByKey: (key: string) => void;
  setMessage: (message: Partial<IToast> | string) => void;
  setHiding: void;
  success: (message: Partial<IToast> | string) => void;
  violet: (message: Partial<IToast> | string) => void;
  loaded: boolean;
}

const throwerFn = (e: any) => {
  if ("production" !== env) {
    const t =
      typeof e === "number" || Array.isArray(e)
        ? null
        : typeof e === "string"
        ? e
        : null === e || undefined === e
        ? undefined
        : e.text;
    throw t
      ? new Error(
          "Toast with message ".concat(
            t,
            " can't display because there is no ToastsContext.Provider"
          )
        )
      : new Error(
          "Cannot call Toasts methods because there is no ToastsContext.Provider."
        );
  }
  return "";
};

export const defaultToasts = {
  clear: throwerFn,
  error: throwerFn,
  message: throwerFn,
  removeToast: throwerFn,
  removeToastByKey: throwerFn,
  setMessage: throwerFn,
  setHiding: throwerFn,
  success: throwerFn,
  violet: throwerFn,
};

export const ToastsContext = createContext<IToastsContext>(undefined);

/*
export const ToastsProviderBackup = (NotSure) => {
  const TP = (t) => {
    const toasts = useContext(ToastsContext);
    const [toastMethods, setToastMethods] = useState();

    return toasts ? (
      <NotSure {...t} />
    ) : (
      <ToastsContext.Provider value={toastMethods}>
        <NotSure {...t} />
        <ToastArea setToastMethods={setToastMethods} />
      </ToastsContext.Provider>
    );
  };

  TP.getInitialProps = NotSure.getInitialProps;
  TP.getLayout = NotSure.getLayout;
  return TP;
};
*/

const ToastsProvider = ({ children }) => {
  const [toastMethods, setToastMethods] = useState();

  return (
    <ToastsContext.Provider value={toastMethods}>
      {children}
      {/* @ts-ignore */}
      <ToastArea setToastMethods={setToastMethods} />
    </ToastsContext.Provider>
  );
};

export default ToastsProvider;
