import MessageNode from "@/components/MessageNode";
import ActionBar from "./ActionBar";

export default function Sidebar() {
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
      <ActionBar />
    </aside>
  );
}
