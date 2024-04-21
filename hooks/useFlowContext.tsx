import { FlowStateType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useSessionStorage } from "usehooks-ts";

const defaultSessionState = {
  tempState: {
    edges: [],
    nodes: [],
  },
  savedState: {
    edges: [],
    nodes: [],
  },
  isChanged: false,
  isErrored: false,
};

export const useFlowContext = () => {
  const [value, setValue] = useSessionStorage<FlowStateType>(
    "flow-context",
    defaultSessionState
  );

  /* Reset entire state to default state */
  const resetSessionState = () => {
    setValue(() => ({ ...defaultSessionState }));
  };

  return {
    sessionState: value,
    setSessionState: setValue as Dispatch<SetStateAction<FlowStateType>>,
    resetSessionState,
  };
};
