import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import StyledTC from './StyledTC';
import { getFavs, getPrices, delFav } from '../../../services/stock-service';
import CContentLoading from '../../../components/CContentLoading';

// Data incoming in form ["symbol":{"quote": {"symbol":"AAPL", "change":40, "changePercent":0.01, "latestPrice":111, "companyName":"a"}}]

const FavTable = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [err, setError] = useState(false);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    loadData()
      .then(() => setLoading(false))
      .catch(() => setError(true));
  }, []);

  const loadData = async () => {
    const stockArray = await getFavs();
    if (stockArray.length === 0) return;
    const info = await getPrices(stockArray);

    // Attach MongoId to each quote
    const loadedData = info.map((el, i) => {
      return {
        ...el.quote,
        id: stockArray[i]._id
      };
    });
    setStocks(loadedData);
  };

  const editSwitchHandler = event => {
    setEdit(event.target.checked);
  };

  const deleteStockHandler = async (id, i) => {
    try {
      await delFav(id);
      let newArr = [...stocks];
      newArr.splice(i, 1);
      setStocks(newArr);
    } catch (error) {
      console.log(error);
      setError(true);
    }
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
                  {edit && <TableCell></TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {stocks.map((stock, i) => (
                  <TableRow hover key={stock.symbol}>
                    <TableCell>{stock.symbol}</TableCell>
                    <TableCell>{stock.companyName}</TableCell>
                    <TableCell>{stock.latestPrice}</TableCell>
                    <StyledTC val={stock.change} icon />
                    <StyledTC val={stock.changePercent} percent />
                    {edit && (
                      <TableCell>
                        <IconButton
                          onClick={() => deleteStockHandler(stock.id, i)}
                        >
                          <DeleteIcon fontSize="small" color="action" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box display="flex" justifyContent="space-between" p={2}>
          <FormControlLabel
            control={<Switch checked={edit} onChange={editSwitchHandler} />}
            label="Edit"
          />
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
