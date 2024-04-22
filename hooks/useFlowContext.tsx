import { FlowStateType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useSessionStorage } from "usehooks-ts";

const defaultSessionState = {
  // Temporary state (can be reset) that records all the nodes and edges changes
  tempState: {
    edges: [],
    nodes: [],
  },
  // Saved state that contains nodes and edges data that received from an API
  savedState: {
    edges: [],
    nodes: [],
  },
  // To detect changes on canvas, to enable/disable save button
  isChanged: false,
};

/**
 * To provide best UX we store user actions to flow in sessionStorage,
 * it provides accessing previous work until single session (until browser tab) is closed.
 * @returns sessionState, setSessionState, resetSessionState
 */
export const useFlowContext = () => {
  const [value, setValue] = useSessionStorage<FlowStateType>(
    "flow-context",
    defaultSessionState
  );

  /* Reset entire state to the default state */
  const resetSessionState = () => {
    setValue(defaultSessionState);
  };

  return {
    sessionState: value,
    setSessionState: setValue as Dispatch<SetStateAction<FlowStateType>>,
    resetSessionState,
  };
};
