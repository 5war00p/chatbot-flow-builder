import cn from "@/utils/cn";
import { Handle, NodeProps, Position } from "reactflow";
import colors from "tailwindcss/colors";
import Image from "next/image";

const handleStyles = {
  backgroundColor: colors.green[500],
};

export default function SendMessage({ selected }: NodeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 shadow-md bg-green-50 rounded-[6px] px-2 py-1 text-green-700 text-sm",
        selected ? "border border-green-500" : "border-[0.5px] border-green-600"
      )}
    >
      <Handle style={handleStyles} type="source" position={Position.Left} />
      <Image src="/whatsapp.svg" width={16} height={16} alt="whatsapp-logo" />
      Send message
      <Handle style={handleStyles} type="target" position={Position.Right} />
    </div>
  );
}
