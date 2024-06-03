/* eslint-disable react/prop-types */
import React from 'react';
import Divider from '@mui/material/Divider';
import { Button, Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Resizable } from 're-resizable';

function WhatPopUp({ onAddToExploration, heading, content, handleClose }) {
  const handleClick = () => {
    onAddToExploration(content, heading);
  };

  return (
    <Box
      component={'div'}
      style={{
        fontSize: '10px',
        padding: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <h3>{heading.toUpperCase()}</h3>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          size='small'
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box
        style={{
          marginBottom: '20px',
        }}
      >
        <Resizable
          defaultSize={{
            width: 320,
            height: '100',
          }}
          style={{ overflow: 'hidden' }}
          minHeight={20}
        >
          {content ? content : <LinearProgress />}
        </Resizable>
      </Box>
      <Divider />
      <Button
        disabled={!content}
        onClick={handleClick}
        style={{
          marginRight: '2px',
          marginBottom: '1px',
          fontSize: '10px',
          backgroundColor: '#1976d2',
          borderColor: 'grey',
          color: 'white',
          width: '100%',
        }}
      >
        Add to Exploration
      </Button>
    </Box>
  );
}

export default WhatPopUp;
