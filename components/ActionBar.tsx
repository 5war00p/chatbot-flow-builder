"use client";
import { useFlowContext } from "@/hooks/useFlowContext";
import { checkForReachability } from "@/utils/flowValidations";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ActionBar() {
  const { sessionState, setSessionState, resetSessionState } = useFlowContext();
  const [disableSave, setDisableSave] = useState(sessionState.isChanged);

  useEffect(() => {
    // We have to check whether it is client side or server other next.js throws error
    // Disable save button based on react flow change and unchanged state
    setDisableSave(typeof window !== "undefined" && sessionState.isChanged);
  }, [sessionState]);

  const onSave = useCallback(() => {
    if (checkForReachability(sessionState.tempState)) {
      // Save tempState to savedState
      setSessionState((prev) => ({
        ...prev,
        savedState: prev.tempState,
        isChanged: false,
      }));

      // TODO: Any API logic can be handled here

      toast.success("Saved successfully");
    } else {
      toast.error("Oops, there are unreachable nodes!");
    }
  }, [sessionState, setSessionState]);

  return (
    <div className="flex space-x-2 mt-auto p-4 border-t">
      <button
        className="rounded-md border px-4 py-1.5 text-sm font-medium text-zinc-600 shadow-sm hover:bg-zinc-100"
        onClick={resetSessionState}
      >
        Reset
      </button>
      <button
        disabled={!disableSave}
        className="disabled:opacity-50 disabled:cursor-not-allowed opacity-100 cursor-pointer w-full rounded-md bg-green-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:opacity-80"
        onClick={onSave}
      >
        Save Changes
      </button>
    </div>
  );
}
