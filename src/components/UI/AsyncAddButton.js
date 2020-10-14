import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const AsyncAddButton = props => {
  const [tTip, setTTip] = useState('Add to favorites');

  const clickHandler = async () => {
    try {
      setTTip('Loading');
      await props.addClick();
      setTTip('Added');
    } catch (error) {
      setTTip('Already added');
    }
  };

  return (
    <Box>
      <Tooltip title={tTip}>
        <IconButton onClick={clickHandler}>
          <AddCircleIcon color="action" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default AsyncAddButton;
