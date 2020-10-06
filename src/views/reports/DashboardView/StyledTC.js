import React from 'react';
import { TableCell, colors, makeStyles } from '@material-ui/core';
import { TrendingDown, TrendingUp, TrendingFlat } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  down: {
    color: colors.red[900]
  },
  up: {
    color: colors.green[900]
  }
}));

const StyledTC = props => {
  const classes = useStyles();

  let tcType = 'neutral';
  let icon = <TrendingFlat style={{ verticalAlign: 'middle' }} />;
  if (props.val < 0) {
    tcType = 'down';
    icon = <TrendingDown style={{ verticalAlign: 'middle' }} />;
  }
  if (props.val > 0) {
    tcType = 'up';
    icon = <TrendingUp style={{ verticalAlign: 'middle' }} />;
  }

  let txt = props.val;
  let suffix = '';
  if (props.percent) {
    txt *= 100;
    suffix = '%';
  }
  txt = (txt <= 0 ? '' : '+') + txt.toFixed(2);

  return (
    <TableCell className={classes[tcType]}>
      {txt + suffix}
      {props.icon && icon}
    </TableCell>
  );
};

export default StyledTC;
