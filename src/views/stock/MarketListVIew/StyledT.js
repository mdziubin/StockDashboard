import React from 'react';
import { colors, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  down: {
    color: colors.red[700]
  },
  up: {
    color: colors.green[700]
  }
}));

const StyledT = props => {
  const classes = useStyles();

  let tType = 'neutral';
  if (props.change < 0) {
    tType = 'down';
  }
  if (props.change > 0) {
    tType = 'up';
  }

  const change = props.change;
  let txt = '-';

  if (change) {
    const pChange = ' (' + (props.percent * 100).toFixed(2) + '%)';
    txt = (change <= 0 ? '' : '+') + change.toFixed(2) + pChange;
  }

  return <Typography className={classes[tType]}>{txt}</Typography>;
};

export default StyledT;
