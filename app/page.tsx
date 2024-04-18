import TestDrag from "@/components/TestDrag";
import TestDrop from "@/components/TestDrop";
import TestReactFlow from "@/components/TestReactFlow";

export default function Home() {
  return (
    <div className="flex">
      <TestReactFlow />

      <div className="max-w-sm">
        <TestDrag />
        <TestDrop />
      </div>
    </div>
  );
}
