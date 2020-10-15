import axiosBackEnd from '../axios-backend';
import axiosIEX from '../axios-iex';

const delFav = id => {
  return axiosBackEnd
    .delete('dash/stock/' + id, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    .then(response => {
      console.log(response.data);
      return response.data.message;
    });
};

const addFav = symbol => {
  return axiosBackEnd
    .post(
      'dash/stock',
      { symbol },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
    .then(response => {
      console.log(response.data);
      return response.data.message;
    });
};

const getFavs = (page = 1) => {
  return axiosBackEnd
    .get('dash/stocks?page=' + page, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    .then(response => {
      return response.data.stocks;
    });
};

const getPrices = stocks => {
  console.log(stocks);
  const symbols = stocks.map(stock => stock.symbol).join(',');
  return axiosIEX
    .get('/stock/market/batch', {
      params: {
        symbols: symbols,
        types: 'quote',
        filter: 'symbol,change,changePercent,latestPrice,companyName'
      }
    })
    .then(response => {
      console.log(response.data);
      // Return an array of quote objects
      return Object.values(response.data);
    });
};

const getList = (page = 1, filter = '') => {
  console.log('getting list');
  return axiosBackEnd
    .get('/market/stocks', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      params: {
        filter: filter,
        page: page
      }
    })
    .then(response => {
      return response.data;
    });
};

const getToken = () => {
  return JSON.parse(localStorage.getItem('token'));
};

export { getFavs, getPrices, getList, addFav, delFav };
