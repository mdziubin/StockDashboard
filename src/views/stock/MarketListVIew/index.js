import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './StockCard';
import CContentLoading from '../../../components/CContentLoading';

import { getList, getPrices, addFav } from '../../../services/stock-service';

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
  const [pg, setPg] = useState(1);
  const [pgLength, setPgLength] = useState(1);

  const [isLoading, setLoading] = useState(true);
  const [err, setError] = useState(false);

  const loadData = async (pg, filter) => {
    setLoading(true);
    const { stocks, pages } = await getList(pg, filter);
    if (stocks.length === 0) return setStocks([]);
    const info = await getPrices(stocks);
    console.log(info);
    setStocks(info);
    setPgLength(pages);
  };

  useEffect(() => {
    loadData(pg, filter)
      .then(() => setLoading(false))
      .catch(() => setError(true));
  }, [pg, filter]);

  const searchHandler = value => {
    // Note: useEffect only called once because React batch updates state in handlers
    setPg(1);
    setFilter(value);
  };

  const pageChangedHandler = (event, value) => {
    setPg(value);
  };

  let body = <CContentLoading err={err} />;

  if (!isLoading && !err) {
    body = (
      <>
        <Box mt={3}>
          <Grid container spacing={3}>
            {stocks.map(({ quote }) => (
              <Grid item key={quote.symbol} xs={12} sm={6} lg={4}>
                <ProductCard
                  className={classes.stockCard}
                  stock={quote}
                  addFav={() => addFav(quote.symbol)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={pgLength}
            size="small"
            page={pg}
            onChange={pageChangedHandler}
          />
        </Box>
      </>
    );
  }

  return (
    <Page className={classes.root} title="Stocks">
      <Container maxWidth={false}>
        <Toolbar search={searchHandler} disable={err || isLoading} />
        {body}
      </Container>
    </Page>
  );
};

export default ProductList;
