import React from 'react';
import { CircularProgress, CardContent, Typography } from '@material-ui/core';

const CContent = props => {
  let body = <CircularProgress />;
  if (props.err) {
    body = (
      <Typography color="textPrimary" variant="body1">
        Something went wrong...
      </Typography>
    );
  }
  return (
    <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
      {body}
    </CardContent>
  );
};

export default CContent;
