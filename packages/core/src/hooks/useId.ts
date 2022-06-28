import React from "react";

export const useId = (defaultId?: string) => {
  return defaultId + React.useId();
};
