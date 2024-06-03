/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import {
  Handle,
  Position,
  useOnSelectionChange,
  NodeResizeControl,
} from 'reactflow';

function ResizeIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='#ff0071'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ position: 'absolute', right: 5, bottom: 5 }}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <polyline points='16 20 20 20 20 16' />
      <line x1='14' y1='14' x2='20' y2='20' />
      <polyline points='8 4 4 4 4 8' />
      <line x1='4' y1='4' x2='10' y2='10' />
    </svg>
  );
}

const controlStyle = {
  background: 'transparent',
  border: 'none',
};

function CustomNodeComp(props) {
  const { data, isConnectable } = props;
  const [selectedNodes, setSelectedNodes] = React.useState([]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodes(
        nodes.map((node) => {
          return { id: node.id, data: node.data };
        })
      );
    },
  });

  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div
        style={{
          border: `${
            selectedNodes.length && selectedNodes[0].id === props.id
              ? '1px solid #1976d2'
              : 'none'
          }`,
        }}
      >
        <div className='custom-node__header'>{data.heading.toUpperCase()}</div>
        <div className='custom-node__body'>{data.label}</div>
      </div>
      <Handle
        type='source'
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
}

export const CustomNode = memo(CustomNodeComp);
export default CustomNode;
