import { Edge, Node } from "reactflow";

/**
 * Check whether it is a Directed Connected Graph (Digraph)
 * A directed graph (or digraph) is a set of nodes connected by edges, where the edges have a direction associated with them.
 *
 * Condition: Simple condition is total edges must be greater than or equal to total nodes - 1
 * Eg: nodes=5, minimum 4 edges required to make the graph connected
 */
export const checkForReachability = ({
  edges,
  nodes,
}: {
  edges: Edge[];
  nodes: Node[];
}) => {
  return edges.length >= nodes.length - 1;
};
