import { createContext } from "react";

const DisabledContext = createContext(false);

DisabledContext.displayName = "DisabledContext";

export default DisabledContext;
