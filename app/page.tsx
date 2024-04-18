import Sidebar from "@/components/Sidebar";
import TestReactFlow from "@/components/TestReactFlow";

export default function Home() {
  return (
    <div className="flex">
      <TestReactFlow />
      <Sidebar />
    </div>
  );
}
