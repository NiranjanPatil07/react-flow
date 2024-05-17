"use client";
import DragHandleNode from "@/components/react-flow/DragHandleNode";
import Sidebar from "@/components/react-flow/Sidebar";
import UpdateNode, { Root } from "@/components/react-flow/UpdateNode";
import { Toaster } from "@/components/ui/toaster";
import { useCallback, useRef, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: crypto?.randomUUID(),
    type: "custom",
    data: { message: "Welcome to message flow", emoji: "⚡", source: true },
    position: { x: 0, y: 50 },
  },
];

const nodeTypes = {
  custom: DragHandleNode,
};

export default function Home() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [updateNode, setUpdateNode] = useState<Root | null>(null);
  const [UpdateVisible, setUpdateVisible] = useState(false);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
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

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const handleNodeClick = (e: any, val: any) => {
    setUpdateNode(val);
    setUpdateVisible(true);
  };

  const handleUpdateNode = (node: Root) => {
    const TEMP_DATA = nodes?.map((item: any) => {
      if (item?.id === node?.id) return { ...item, data: { ...item?.data, message: node?.data?.message } };
      else return item;
    });
    setNodes(TEMP_DATA);
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
          {UpdateVisible ? (
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
