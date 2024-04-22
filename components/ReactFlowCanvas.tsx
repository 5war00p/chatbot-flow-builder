"use client";
import { useFlowContext } from "@/hooks/useFlowContext";
import { randomBytes } from "crypto";
import React, {
  useState,
  useCallback,
  DragEventHandler,
  useEffect,
  useMemo,
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
  Node as ReactFlowNode,
} from "reactflow";
import SendMessage from "./custom-nodes/SendMessage";

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

  const nodeTypes = useMemo(() => ({ sendMessage: SendMessage }), []);

  //  When user changes any node or edge in flow we update tempState in sessionState
  useEffect(() => {
    if (edges.length === 0 && nodes.length === 0) {
      setSessionState((prev) => ({
        ...prev,
        tempState: {
          edges: [],
          nodes: [],
        },
        isChanged: false,
      }));
    } else {
      setSessionState((prev) => ({
        ...prev,
        tempState: {
          edges,
          nodes,
        },
        isChanged: true,
      }));
    }
  }, [edges, nodes, setSessionState]);

  /**
   * When user clicks reset button we need to reset local state of edges and nodes to empty
   * As resetSessionState calls at Actionbar - Reset button, we need to listen changes and reset here
   */
  useEffect(() => {
    if (
      sessionState.tempState.edges.length === 0 &&
      sessionState.tempState.nodes.length === 0
    ) {
      setEdges([]);
      setNodes([]);
    }
  }, [
    sessionState.tempState.edges.length,
    sessionState.tempState.nodes.length,
    setEdges,
    setNodes,
  ]);

  // When edges are drawn between nodes set connections
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Trigger when user drags nodes from components panel
  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Trigger when user drops nodes into reactflow canvas
  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if reactFlowInstance is initialized and the dropped element is valid
      if (!reactFlowInstance || typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: ReactFlowNode = {
        id: randomBytes(20).toString("hex"),
        type,
        position,
        data: { label: "Send message" },
        sourcePosition: Position.Left,
        targetPosition: Position.Right,
        className: "sendMessage",
      };

      setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="h-screen w-11/12">
      <ReactFlow
        nodeTypes={nodeTypes}
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
        // Hiding React flow attribution to make it looks like official pro version
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls position="bottom-right" />
        <MiniMap position="top-right" />
      </ReactFlow>
    </div>
  );
}
