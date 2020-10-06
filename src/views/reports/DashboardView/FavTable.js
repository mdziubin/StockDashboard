import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StyledTC from './StyledTC';
import { getFavs, getPrices } from '../../../services/stock-service';

// Data incoming in form ["symbol":{"quote": {"symbol":"AAPL", "change":40, "changePercent":0.01, "lastestPrice":111, "companyName":"a"}}]

const FavTable = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const stockArray = await getFavs();
      if (stockArray.length === 0) return setLoading(false);

      const info = await getPrices(stockArray);
      setStocks(info);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="Watchlist" />
      <Divider />
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
    </Card>
  );
};

FavTable.propTypes = {
  className: PropTypes.string
};

export default FavTable;
