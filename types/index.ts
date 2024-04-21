import { Node, Edge } from "reactflow";

export interface FlowStateType {
  tempState: {
    edges: Edge<any>[];
    nodes: Node<any, string | undefined>[];
  };
  savedState: {
    edges: Edge<any>[];
    nodes: Node<any, string | undefined>[];
  };
  isChanged: boolean;
  isErrored: boolean;
}
