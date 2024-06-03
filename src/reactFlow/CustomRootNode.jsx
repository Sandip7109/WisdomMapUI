/* eslint-disable react/prop-types */
import { memo, useState } from 'react';
import { Handle, Position, useOnSelectionChange } from 'reactflow';
import { Box } from '@mui/material';

function CustomRootNodeComp(props) {
  const { data, isConnectable } = props;

  const [selectedNodes, setSelectedNodes] = useState([]);
  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodes(
        nodes.map((node) => {
          return { id: node.id, data: node.data, position: node.position };
        })
      );
    },
  });
  return (
    <>
      <Box
        style={{
          display: 'flex',
          border: `1px solid ${
            selectedNodes.length && selectedNodes[0].id === props.id
              ? '#1976d2'
              : 'lightgrey'
          } `,
        }}
      >
        <Handle
          type='source'
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
        <div className='custom-node__header'>{data.label}</div>
        <Handle
          type='source'
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
        <Handle
          type='source'
          position={Position.Bottom}
          // id='man'
          isConnectable={isConnectable}
        />
      </Box>
    </>
  );
}

export const CustomRootNode = memo(CustomRootNodeComp);
export default CustomRootNode;
