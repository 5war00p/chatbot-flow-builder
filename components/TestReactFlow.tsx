"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Controls,
  MiniMap,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-screen w-11/12">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultEdgeOptions={{
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        {/* Hiding React flow attribution to make it looks like official pro version */}
        <style>
          {`.react-flow__attribution {
                visibility: hidden;
            }`}
        </style>
        <Background />
        <Controls position="bottom-right" />
        <MiniMap position="top-right" />
      </ReactFlow>
    </div>
  );
}
