import React from "react";

export const DisabledContext = React.createContext(false);
DisabledContext.displayName = "DisabledContext";

export const useDisabled = (defaultDisabled?: boolean) => {
  const disabled = React.useContext(DisabledContext);
  return defaultDisabled ? defaultDisabled : disabled;
};
