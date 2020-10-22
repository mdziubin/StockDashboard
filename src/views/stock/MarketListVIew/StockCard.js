import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import StyledT from './StyledT';
import AsyncAddButton from '../../../components/UI/AsyncAddButton';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  controlItem: {
    display: 'flex',
    alignItems: 'center'
  },
  stockNumbers: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
}));

const ProductCard = ({ className, stock, addFav }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-around">
          <Grid item xs={6}>
            <Typography color="textPrimary" gutterBottom variant="h4">
              {stock.symbol}
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              {stock.companyName}
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item className={classes.stockNumbers}>
            <Typography>{'$ ' + stock.latestPrice}</Typography>
            <StyledT change={stock.change} percent={stock.changePercent} />
          </Grid>
        </Grid>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <AsyncAddButton addClick={addFav} />
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  stock: PropTypes.object.isRequired
};

export default ProductCard;
