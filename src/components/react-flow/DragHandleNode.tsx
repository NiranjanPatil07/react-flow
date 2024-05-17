import React, { FC, memo } from "react";
import { Handle, Position } from "reactflow";

const DragHandleNode: FC<any> = ({ data }) => {
  return (
    <div className='px-4 py-2 shadow-md bg-card border-2 border-stone-500 min-w-64'>
      <div className='flex'>
        <div className='rounded-full w-12 h-12 flex justify-center items-center '>{data?.emoji ?? "💬"}</div>
        <div className='ml-2'>
          <div className='text-base text-primary font-bold'>Send Message</div>
          <div className='text-muted-foreground'>{data?.message}</div>
        </div>
      </div>
      {data?.source ? null : (
        <Handle type='target' position={Position.Top} className='w-full !bg-teal-500 rounded-none !border-teal-500 h-1.5' />
      )}
      <Handle type='source' position={Position.Bottom} className='w-full !bg-teal-500 rounded-none !border-teal-500 h-1.5' />
    </div>
  );
};

export default memo(DragHandleNode);
