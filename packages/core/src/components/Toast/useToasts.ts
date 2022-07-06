import { useContext, useMemo } from "react";
import { ToastsContext, defaultToasts } from "./ToastsProvider";

export const useToasts = () => {
  const toasts = useContext(ToastsContext);

  return useMemo(() => {
    const current = toasts
      ? {
          clear: toasts.clear,
          error: toasts.error,
          message: toasts.message,
          removeToast: toasts.removeToast,
          removeToastByKey: toasts.removeToastByKey,
          setMessage: toasts.setMessage,
          setHiding: toasts.setHiding,
          success: toasts.success,
          violet: toasts.violet,
        }
      : { ...defaultToasts };

    return { ...current, ...{ current, loaded: Boolean(toasts) } };
  }, [toasts]);
};
