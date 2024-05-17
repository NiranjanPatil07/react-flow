import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const Sidebar: FC<any> = ({ nodes, edges }) => {
  const { toast } = useToast();
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType, `Message Node`);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleSave = () => {
    if (nodes?.length - 1 !== edges?.length)
      toast({
        variant: "destructive",
        title: "Uh oh! Flow not saved.",
        description: "One or more nodes cannot have empty target edge.",
        duration: 2000,
      });
    else
      toast({
        variant: "default",
        title: "Hurray! 🎉",
        description: "Flow saved successfully!",
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

          {/* <Handle type='target' position={Position.Top} className='w-16 !bg-teal-500 rounded-none h-1' /> */}
          {/* <Handle type='source' position={Position.Bottom} className='w-16 !bg-teal-500 rounded-none h-1' /> */}
        </div>
      </div>

      <Button size={"lg"} className='w-full' onClick={() => handleSave()}>
        Save Flow
      </Button>
    </aside>
  );
};

export default Sidebar;
