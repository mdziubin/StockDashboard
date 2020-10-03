import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Typography, Grid } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 0,
    padding: theme.spacing(2, 4, 2),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <Grid container justify="space-between" spacing={3}>
        <Grid item>
          <Typography color="textPrimary" variant="body1">
            Something went wrong...
          </Typography>
        </Grid>
        <Grid item>
          <ErrorOutlineIcon />
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Modal open={props.open} onClose={props.modalClosed}>
        {body}
      </Modal>
    </div>
  );
}
