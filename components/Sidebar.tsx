"use client";

import MessageNode from "@/components/MessageNode";
import toast from "react-hot-toast";

export default function Sidebar() {
  return (
    <div className="border-l w-1/4 h-screen overflow-hidden">
      {/* Header */}
      <div className="border-b p-4">
        <h3 className="font-medium">Components</h3>
        <p className="text-gray-400 text-xs">
          Nodes that can be dragged to create a flow
        </p>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-137px)] overflow-scroll">
        <MessageNode />
      </div>

      {/* <TestDrop /> */}

      {/* Footer */}
      <div className="mt-auto p-4">
        <button
          type="button"
          className="w-full rounded-md bg-orange-100 px-2.5 py-1.5 text-sm font-medium text-orange-600 shadow-sm hover:bg-orange-200"
          onClick={() => toast("Saving..")}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
