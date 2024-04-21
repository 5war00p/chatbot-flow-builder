"use client";
import { useFlowContext } from "@/hooks/useFlowContext";
import { randomBytes } from "crypto";
import React, {
  useState,
  useCallback,
  DragEventHandler,
  useEffect,
} from "react";
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
  const { sessionState, setSessionState } = useFlowContext();
  const [nodes, setNodes, onNodesChange] = useNodesState(
    sessionState.tempState.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    sessionState.tempState.edges
  );
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  useEffect(() => {
    if (nodes.length !== 0)
      setSessionState((prev) => ({
        ...prev,
        tempState: {
          ...prev.tempState,
          nodes,
        },
        isChanged: true,
      }));

    if (edges.length !== 0)
      setSessionState((prev) => ({
        ...prev,
        tempState: {
          ...prev.tempState,
          edges,
        },
        isChanged: true,
      }));

    if (edges.length === 0 && nodes.length === 0) {
      setSessionState((prev) => ({
        ...prev,
        isChanged: false,
      }));
    }
  }, [edges, nodes, setSessionState]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
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
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="h-screen w-11/12">
      <ReactFlow
        nodes={sessionState.tempState.nodes}
        edges={sessionState.tempState.edges}
        defaultEdgeOptions={{
          markerEnd: {
            type: MarkerType.ArrowClosed,
            // Tailwind Zinc 300
            color: "#d4d4d8",
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
