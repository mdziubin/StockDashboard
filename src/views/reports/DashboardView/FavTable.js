import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
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
  Switch,
  TablePagination
} from '@material-ui/core';
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

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    loadData(page, rowsPerPage)
      .then(() => setLoading(false))
      .catch(() => setError(true));
  }, [page, rowsPerPage]);

  const loadData = async (page, rowsPerPage) => {
    const { stocks, count } = await getFavs(page + 1, rowsPerPage);
    setTotal(count);

    if (stocks.length === 0) return;
    const info = await getPrices(stocks);

    // Attach MongoId to each quote
    const loadedData = info.map((el, i) => {
      return {
        ...el.quote,
        id: stocks[i]._id
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

  const changePageHandler = (_event, newPage) => {
    setPage(newPage);
  };

  const changePerHandler = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                  <TableCell width="15%">Symbol</TableCell>
                  <TableCell width="30%">Company</TableCell>
                  <TableCell width="15%">Last Price</TableCell>
                  <TableCell width="15%">Change</TableCell>
                  <TableCell width="15%">% Change</TableCell>
                  {edit && <TableCell></TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {stocks.map((stock, i) => (
                  <TableRow hover key={stock.symbol}>
                    <TableCell>{stock.symbol}</TableCell>
                    <TableCell>{stock.companyName}</TableCell>
                    <TableCell>{'$' + stock.latestPrice}</TableCell>
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
          <TablePagination
            component="div"
            count={total}
            page={page}
            onChangePage={changePageHandler}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
            onChangeRowsPerPage={changePerHandler}
          />
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
