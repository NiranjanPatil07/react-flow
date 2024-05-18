import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface NodeData {
  message?: string;
  emoji?: string;
  source?: boolean;
  id?: string;
  name?: string;
}

interface Node {
  id: string;
  type: string;
  data: NodeData;
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  selected?: boolean;
  positionAbsolute?: {
    x: number;
    y: number;
  };
  dragging?: boolean;
}

interface Edge {
  source: string;
  sourceHandle: string | null;
  target: string;
  targetHandle: string | null;
  id: string;
}

const Sidebar: FC<any> = ({ nodes, edges }) => {
  const { toast } = useToast();

  //drag function for the sidebar node panel
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType, `Message Node`);
    event.dataTransfer.effectAllowed = "move";
  };

  //?handle save of update message and display toast based on the condition
  const handleSave = () => {
    // Step 1: Create a set of all node IDs
    const allNodeIds = new Set(nodes?.map((node: Node) => node?.id));

    // Step 2: Create a set of node IDs that are targets in the edges array
    const targetNodeIds = new Set(edges?.map((edge: Edge) => edge?.target));

    // Step 3: Check if every node has a source
    // A node has a source if it is a target node or if it's the source node with data.source set to true
    let sourceNodeId: string | null = null;
    for (const node of nodes) {
      if (node?.data && node?.data?.source) {
        sourceNodeId = node?.id;
        break;
      }
    }

    const allNodesHaveSource = Array.from(allNodeIds).every((nodeId) => targetNodeIds.has(nodeId) || nodeId === sourceNodeId);

    if (allNodesHaveSource)
      toast({
        variant: "success",
        title: "Hurray! 🎉",
        description: "Flow saved successfully!",
        duration: 2000,
      });
    else
      toast({
        variant: "destructive",
        title: "Uh oh! Flow not saved.",
        description: "One or more nodes cannot have empty target edge.",
        duration: 2000,
      });
  };

  return (
    <aside className='m-2 ml-8 flex flex-col-reverse w-full max-w-72 justify-between'>
      <div>
        <div className='text-lg font-bold mb-4'>Nodes Panel</div>
        <div
          className='px-4 py-2 shadow-md rounded bg-card border-2 border-stone-400 min-w-64'
          onDragStart={(event) => onDragStart(event, "custom")}
          draggable
        >
          <div className='flex'>
            <div className='rounded-full w-12 h-12 flex justify-center items-center '>{"💬"}</div>
            <div className='ml-2'>
              <div className='text-lg text-primary font-bold'>{"Message Node"}</div>
              <div className='text-muted-foreground'>{"Drag to add"}</div>
            </div>
          </div>
        </div>
      </div>

      <Button size={"lg"} className='w-full' onClick={() => handleSave()}>
        Save Flow
      </Button>
    </aside>
  );
};

export default Sidebar;
