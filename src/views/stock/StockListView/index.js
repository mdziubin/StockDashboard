import React, { useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './StockCard';
import data from './data';

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
  const [stocks, setStocks] = useState(data);

  const searchHandler = event => {
    const regex = new RegExp(event.target.value, 'i');
    const filteredStocks = data.filter(
      stock => regex.test(stock.symbol) || regex.test(stock.companyName)
    );

    setStocks(filteredStocks);
  };

  return (
    <Page className={classes.root} title="Stocks">
      <Container maxWidth={false}>
        <Toolbar onType={searchHandler} />
        <Box mt={3}>
          <Grid container spacing={3}>
            {stocks.map(stock => (
              <Grid item key={stock.id} xs={12} sm={6} lg={4}>
                <ProductCard className={classes.stockCard} stock={stock} />
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
