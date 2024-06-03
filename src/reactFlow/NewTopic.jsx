/* eslint-disable react/prop-types */
import React from 'react';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function NewTopic({ onAddRootNode, handleClose }) {
  const [topic, setTopic] = React.useState('');

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleExplore = () => {
    onAddRootNode(topic);
  };

  return (
    <Box
      style={{
        fontSize: '15px',
        padding: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'item',
        }}
      >
        <h5>What topic or link would you like to explore today?</h5>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box style={{ mt: 10 }}>
        <TextField
          variant='outlined'
          onChange={handleTopicChange}
          value={topic}
          hiddenLabel
          placeholder='Enter Topic'
          sx={{
            fontSize: '15px',
            '& input::placeholder': { fontSize: '10px' },
            width: '100%',
          }}
          id='filled-hidden-label-small'
          size='small'
        />
      </Box>
      <Divider />
      <Button
        onClick={handleExplore}
        disabled={!topic}
        style={{
          marginTop: '4px',
          marginRight: '2px',
          marginBottom: '1px',
          fontSize: '8px',
          backgroundColor: '#1976d2',
          borderColor: 'grey',
          color: 'white',
          width: '100%',
        }}
      >
        Explore
      </Button>
    </Box>
  );
}

export default NewTopic;
