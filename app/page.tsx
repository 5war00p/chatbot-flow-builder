import Sidebar from "@/components/Sidebar";
import ReactFlowCanvas from "@/components/ReactFlowCanvas";

export default function Home() {
  return (
    <div className="flex">
      <ReactFlowCanvas />
      <Sidebar />
    </div>
  );
}
