import { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Panel,
} from 'reactflow';
import CustomNode from './reactFlow/CustomNode';
import CustomRootNodeComp from './reactFlow/CustomRootNode';
import RightSidePanel from './reactFlow/RightSidePanel';
import { Box } from '@mui/material';

import 'reactflow/dist/style.css';
import './App.css';
import Header from './reactFlow/Header';

const nodeTypes = {
  custom: CustomNode,
  rootNode: CustomRootNodeComp,
};

// const nodeColor = (node) => {
//   switch (node.type) {
//     case 'input':
//       return '#6ede87';
//     case 'output':
//       return '#6865A5';
//     default:
//       return '#ff0072';
//   }
// };

const getNodeId = () => `${String(+new Date()).slice(6)}`;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleAddNewNode = (topic) => {
    const id = getNodeId();

    const newNode = {
      id,
      type: 'rootNode',
      data: { label: `${topic}` },
      // position: {
      //   x: 600,
      //   y: 50 + (nodes.length + 1) * 20,
      // },
      position: {
        x: 0,
        y: 0,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleAddToExploration = (data, targetNode, heading) => {
    const id = getNodeId();
    const newNode = {
      id,
      type: 'custom',
      data: { label: `${data}`, heading },
      position: {
        x: 200,
        y: 200 + (nodes.length + nodes.length) * 20,
      },
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) =>
      addEdge(
        {
          id: getNodeId(),
          label: heading,
          source: targetNode.id,
          target: id,
        },
        eds
      )
    );
  };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const defaultViewport = { x: 0, y: 0, zoom: 1 };

  return (
    <>
      <Header />
      <Box component='div' sx={{ width: '100vw', height: '90vh', mt: 8 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultViewport={defaultViewport}
          // fitView
          multiSelectionKeyCode={null}
        >
          <Controls
            position='bottom-left'
            showFitView={true}
            showInteractive={false}
          />
          <Background variant='dots' gap={12} size={1} />
          <Panel position='middle-right'>
            <RightSidePanel
              handleAddRootNode={handleAddNewNode}
              onAddToExploration={handleAddToExploration}
              isDisable={nodes.length === 0}
            />
          </Panel>
        </ReactFlow>
      </Box>
    </>
  );
}
