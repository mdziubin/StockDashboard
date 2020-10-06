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
  return axiosIEX
    .get('/stock/market/batch', {
      params: {
        symbols: symbolArray.join(','),
        types: 'quote',
        filter: 'symbol,change,changePercent,latestPrice,companyName'
      }
    })
    .then(response => {
      return Object.values(response.data);
    });
};

const getToken = () => {
  return JSON.parse(localStorage.getItem('token'));
};

export { getFavs, getPrices };
