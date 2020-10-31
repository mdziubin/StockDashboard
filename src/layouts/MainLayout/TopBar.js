import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Box,
  Typography
} from '@material-ui/core';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64
  }
});

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Box display="flex">
            <Typography color="textPrimary" variant="h4">
              StockJS
            </Typography>
            <ShowChartIcon style={{ color: 'darkgreen' }} />
          </Box>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
