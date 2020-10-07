import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StyledTC from './StyledTC';
import { getFavs, getPrices } from '../../../services/stock-service';
import CContentLoading from '../../../components/CContentLoading';

// Data incoming in form ["symbol":{"quote": {"symbol":"AAPL", "change":40, "changePercent":0.01, "lastestPrice":111, "companyName":"a"}}]

const FavTable = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [err, setError] = useState(false);

  useEffect(() => {
    loadData()
      .then(() => setLoading(false))
      .catch(() => setError(true));
  }, []);

  const loadData = async () => {
    const stockArray = await getFavs();
    if (stockArray.length === 0) return;
    const info = await getPrices(stockArray);
    setStocks(info);
  };

  let body = <CContentLoading err={err} />;

  if (!isLoading && !err) {
    body = (
      <>
        <PerfectScrollbar>
          <Box minWidth={800}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Last Price</TableCell>
                  <TableCell>Change</TableCell>
                  <TableCell>% Change</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stocks.map(({ quote }) => (
                  <TableRow hover key={quote.symbol}>
                    <TableCell>{quote.symbol}</TableCell>
                    <TableCell>{quote.companyName}</TableCell>
                    <TableCell>{quote.latestPrice}</TableCell>
                    <StyledTC val={quote.change} icon />
                    <StyledTC val={quote.changePercent} percent />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box>
      </>
    );
  }

  return (
    <Card>
      <CardHeader title="Watchlist" />
      <Divider />
      {body}
    </Card>
  );
};

FavTable.propTypes = {
  className: PropTypes.string
};

export default FavTable;
