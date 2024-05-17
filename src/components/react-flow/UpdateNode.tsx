import { FC, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface Root {
  id: string;
  type: string;
  data: Data;
  position: Position;
  width: number;
  height: number;
  selected: boolean;
  dragging: boolean;
  positionAbsolute: PositionAbsolute;
}

export interface Data {
  name: string;
  message: string;
  emoji: string;
  source: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface PositionAbsolute {
  x: number;
  y: number;
}

const UpdateNode: FC<any> = ({ data, handleCancel, handleUpdateNode }) => {
  const [nodeData, setNodeData] = useState<Root>(data);

  //? Update node function which updates the message
  const changeMessage = (val: any) => {
    setNodeData({ ...nodeData, data: { ...nodeData?.data, message: val?.target?.value } });
  };
  return (
    <aside className='m-2 ml-8 w-full max-w-72'>
      <div className='text-lg font-bold mb-4'>Update Node</div>
      <p className='text-sm pb-1'>Message: </p>
      <Input value={nodeData?.data?.message} className='w-full' onChange={(val) => changeMessage(val)} />
      <div className='flex space-x-4 mt-4'>
        <Button variant='outline' onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button onClick={() => handleUpdateNode(nodeData)}>Update</Button>
      </div>
    </aside>
  );
};

export default UpdateNode;
