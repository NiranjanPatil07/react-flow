"use client";
import DragHandleNode from "@/components/react-flow/DragHandleNode";
import Sidebar from "@/components/react-flow/Sidebar";
import UpdateNode, { Root } from "@/components/react-flow/UpdateNode";
import { Toaster } from "@/components/ui/toaster";
import { useCallback, useRef, useState } from "react";
import ReactFlow, { Background, Controls, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

//* Initial set of nodes for the React Flow graph
const initialNodes = [
  {
    id: crypto?.randomUUID(), // Unique ID for the node
    type: "custom", // Custom node type
    data: { message: "Welcome to message flow", emoji: "⚡", source: true },
    position: { x: 0, y: 50 },
  },
];

// Define custom node types
const nodeTypes = {
  custom: DragHandleNode,
};

export default function Home() {
  const reactFlowWrapper = useRef(null); // Reference to the React Flow wrapper div
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes); // State management for nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState([]); // State management for edges
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null); // React Flow instance
  const [updateNode, setUpdateNode] = useState<Root | null>(null); // Node data for update
  const [updateVisible, setUpdateVisible] = useState(false); // Toggle visibility for node update UI

  // Handle drag over event
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle connection between nodes
  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), []);

  // Handle drop event for new nodes
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // Get the position of the drop in the flow
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create a new node at the dropped position
      const newNode = {
        id: crypto?.randomUUID(),
        type: "custom",
        position,
        data: {
          id: crypto?.randomUUID(),
          message: `Message node ${nodes?.length + 1}`,
          name: "Message Node",
        },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // Handle node click to show update UI
  const handleNodeClick = (e: any, val: any) => {
    setUpdateNode(val);
    setUpdateVisible(true);
  };

  // Handle node update
  const handleUpdateNode = (node: Root) => {
    const updatedNodes = nodes?.map((item: any) =>
      item?.id === node?.id ? { ...item, data: { ...item?.data, message: node?.data?.message } } : item
    );
    setNodes(updatedNodes);
    setUpdateVisible(false);
  };

  return (
    <div className='h-[82vh]'>
      <ReactFlowProvider>
        <div className='flex'>
          <div className='h-[85vh] w-[75vw]' ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={(e, val) => handleNodeClick(e, val)}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
          {updateVisible ? (
            <UpdateNode data={updateNode} handleCancel={() => setUpdateVisible(false)} handleUpdateNode={handleUpdateNode} />
          ) : (
            <Sidebar nodes={nodes} edges={edges} />
          )}
        </div>
      </ReactFlowProvider>
      <Toaster />
    </div>
  );
}
