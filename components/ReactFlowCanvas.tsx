"use client";
import { randomBytes } from "crypto";
import React, { useState, useCallback, DragEventHandler } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Connection,
  ReactFlowInstance,
  MarkerType,
  Position,
} from "reactflow";

export default function ReactFlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (!reactFlowInstance || typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: randomBytes(20).toString("hex"),
        type,
        position,
        data: { label: "Send message" },
        sourcePosition: Position.Left,
        targetPosition: Position.Right,
      };

      setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance]
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
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
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
