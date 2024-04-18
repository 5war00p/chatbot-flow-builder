"use client";

import { useRef } from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";

export default function TestDrag() {
  const text = "testing";
  const ref = useRef(null);
  const [{ opacity }, drag] = useDrag({
    type: "card",
    item: {
      text,
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref);

  const notify = () => toast("Here is your toast.");

  return (
    <div
      ref={ref}
      className="border-gray-600 p-2 rounded-md"
      style={{ opacity }}
    >
      {text}
      <button onClick={notify}>Make me a toast</button>
    </div>
  );
}
