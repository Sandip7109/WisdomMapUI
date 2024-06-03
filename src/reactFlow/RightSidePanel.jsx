/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from 'react';
import { useOnSelectionChange } from 'reactflow';
import { Box, Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import NewTopic from '../reactFlow/NewTopic';
import WhatPopUp from './WhatPopUp';
import Drawer from '@mui/material/Drawer';
import { getData } from '../api/fetchData';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DownloadButton from './Download';
import SelectPrompts from './SelectPrompts';
import { Categories } from './constants';
import AddIcon from '@mui/icons-material/Add';

function RightSidePanel({ handleAddRootNode, onAddToExploration, isDisable }) {
  const [selectedButton, setSelectedButton] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedNodes, setSelectedNodes] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedEdges, setSelectedEdges] = React.useState([]);
  const [content, setContent] = React.useState('');
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState('knowledge');

  const fetchData = async () => {
    const targetNodeValue = selectedNodes[0].data.label;
    const data = await getData(targetNodeValue, selectedButton);
    if (data) {
      setContent(data);
    }
  };

  React.useEffect(() => {
    if (selectedButton && selectedButton !== 'new') {
      fetchData();
    }
  }, [selectedButton]);

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setSelectedNodes(
        nodes.map((node) => {
          return { id: node.id, data: node.data, position: node.position };
        })
      );
      setSelectedEdges(edges.map((edge) => edge.id));
    },
  });

  const handleAddToExploration = (data, heading) => {
    onAddToExploration(data, selectedNodes[0], heading);
    setContent('');
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExplore = (topic) => {
    handleAddRootNode(topic);
    handleClose();
  };

  const handleClick = (event, optionClicked) => {
    setAnchorEl(event.currentTarget);
    setSelectedButton(optionClicked);
  };

  return (
    <>
      <Box
        component={'div'}
        sx={{
          border: '1px solid lightgrey',
          position: 'relative',
          backgroundColor: 'white',
          height: 100,
          alignContent: 'center',
          right: -13,
        }}
        onClick={() => {
          setOpenDrawer((openDrawer) => !openDrawer);
        }}
      >
        <div style={{ position: 'relative', top: '35px', right: '2px' }}>
          <ChevronLeftIcon />
        </div>
      </Box>
      <Drawer
        sx={{
          top: '20px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='right'
        open={openDrawer}
        onClose={() => {
          setOpenDrawer((openDrawer) => !openDrawer);
        }}
      >
        <div className='right_panel'>
          <Box
            sx={{
              p: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            {/* <Typography>Knowledge Explorer</Typography> */}
            <DownloadButton isDisable={isDisable} />
            <IconButton
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Button
            onClick={(e) => {
              handleClick(e, 'new');
            }}
            style={{
              width: '100%',
              marginBottom: '30px',
              backgroundColor: '#1976d2',
              color: 'white',
            }}
            variant='filled'
            startIcon={<AddIcon />}
          >
            NEW
          </Button>
          <SelectPrompts
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {Categories[selectedCategory].map((tag) => {
              return (
                <Button
                  onClick={(e) => {
                    handleClick(e, tag.name);
                  }}
                  disabled={tag.label !== 'New' && selectedNodes.length === 0}
                  style={{
                    textAlign: 'left',
                    marginRight: '4px',
                    marginBottom: '4px',
                    backgroundColor: `${
                      tag.label !== 'New' && selectedNodes.length === 0
                        ? 'lightgrey'
                        : '#1976d2'
                    }`,
                    borderColor: `${
                      tag.label !== 'New' && selectedNodes.length === 0
                        ? 'lightgrey'
                        : '#1976d2'
                    }`,
                    color: `${
                      tag.label !== 'New' && selectedNodes.length === 0
                        ? 'black'
                        : 'white'
                    }`,
                  }}
                  key={tag.id}
                >
                  {tag.label}
                </Button>
              );
            })}
          </div>
        </div>
      </Drawer>
      {selectedButton && (
        <Popover
          id={id}
          open={open}
          onClose={handleClose}
          anchorReference='anchorPosition'
          //sx={{ width: `${selectedButton === 'new' ? '80%' : '50%'}` }}
          anchorPosition={{ top: 500, left: 600 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {selectedButton === 'new' && (
            <NewTopic handleClose={handleClose} onAddRootNode={handleExplore} />
          )}
          {selectedButton !== 'new' && (
            <WhatPopUp
              handleClose={handleClose}
              onAddToExploration={handleAddToExploration}
              content={content}
              heading={selectedButton}
              targetNodeValue={
                selectedNodes.length ? selectedNodes[0].data.label : ''
              }
            />
          )}
        </Popover>
      )}
    </>
  );
}

export default RightSidePanel;
