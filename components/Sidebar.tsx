"use client";

import MessageNode from "@/components/MessageNode";
import { useFlowContext } from "@/hooks/useFlowContext";
import { FlowStateType } from "@/types";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Sidebar() {
  const { sessionState, setSessionState, resetSessionState } = useFlowContext();
  const [disableSave, setDisableSave] = useState(sessionState.isChanged);

  useEffect(() => {
    // Set save button disable state based on react flow changes
    setDisableSave(sessionState.isChanged);
  }, [sessionState.isChanged]);

  const onSave = useCallback(() => {
    setSessionState((prev) => ({
      ...prev,
      savedState: prev.tempState,
      isChanged: false,
    }));
    // Any API logic can be handled here
  }, [setSessionState]);

  return (
    <aside className="border-l w-1/4 h-screen overflow-hidden">
      {/* Header */}
      <div className="border-b p-4">
        <h3 className="font-medium">Components</h3>
        <p className="text-gray-400 text-xs">
          Drag n Drop into left side to create a flow
        </p>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-137px)] overflow-scroll">
        <MessageNode />
      </div>

      {/* Footer */}
      <div className="flex space-x-2 mt-auto p-4 border-t">
        <button
          className="rounded-md border px-4 py-1.5 text-sm font-medium text-zinc-600 shadow-sm hover:bg-zinc-100"
          onClick={resetSessionState}
        >
          Reset
        </button>
        <button
          type="button"
          disabled={!disableSave}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full rounded-md bg-green-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:opacity-80"
          onClick={onSave}
        >
          Save Changes
        </button>
      </div>
    </aside>
  );
}
