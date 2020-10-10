import axiosBackEnd from '../axios-backend';
import axiosIEX from '../axios-iex';

const getFavs = (page = 1) => {
  return axiosBackEnd
    .get('dash/stocks?page=' + page, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    .then(response => {
      return response.data.stocks.map(stock => stock.symbol);
    });
};

const getPrices = symbolArray => {
  console.log(symbolArray);
  return axiosIEX
    .get('/stock/market/batch', {
      params: {
        symbols: symbolArray.join(','),
        types: 'quote',
        filter: 'symbol,change,changePercent,latestPrice,companyName'
      }
    })
    .then(response => {
      console.log(response.data);
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
      return response.data.stocks.map(stock => stock.symbol);
    });
};

const getToken = () => {
  return JSON.parse(localStorage.getItem('token'));
};

export { getFavs, getPrices, getList };
