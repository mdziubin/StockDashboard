import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './StockCard';

import { getList, getPrices } from '../../../services/stock-service';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  stockCard: {
    height: '100%'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const [stocks, setStocks] = useState([]);
  const [filter, setFilter] = useState('');

  const loadData = async filter => {
    const stockArray = await getList(1, filter);
    if (stockArray.length === 0) return;
    const info = await getPrices(stockArray);
    console.log(info);
    setStocks(info);
  };

  useEffect(() => {
    loadData(filter);
  }, [filter]);

  const searchHandler = value => {
    setFilter(value);
  };

  return (
    <Page className={classes.root} title="Stocks">
      <Container maxWidth={false}>
        <Toolbar search={searchHandler} />
        <Box mt={3}>
          <Grid container spacing={3}>
            {stocks.map(({ quote }) => (
              <Grid item key={quote.symbol} xs={12} sm={6} lg={4}>
                <ProductCard className={classes.stockCard} stock={quote} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
