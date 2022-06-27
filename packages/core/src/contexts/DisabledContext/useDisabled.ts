import { useContext } from "react";
import { DisabledContext } from ".";

const useDisabled = (defaultDisabled?: boolean) => {
  const disabled = useContext(DisabledContext);
  return defaultDisabled !== null && defaultDisabled !== undefined
    ? defaultDisabled
    : disabled;
};

export default useDisabled;
