"use client";
import { useRef } from "react";
import { useDrop } from "react-dnd";

export default function TestDrop() {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "card",
    drop(item) {
      console.log(">>> item", item);
    },
  });
  drop(ref);

  return <div className="w-[500px] h-[500px] border-rose-600">Here</div>;
}
