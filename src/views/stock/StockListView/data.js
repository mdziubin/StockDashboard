import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    symbol: 'AAL',
    companyName: 'American Airlines Group, Inc.',
    latestPrice: 13.7,
    change: 0.09,
    changePercent: 0.0072
  },
  {
    id: uuid(),
    symbol: 'AMD',
    companyName: 'Advanced Micro Devices, Inc.',
    latestPrice: 87.094,
    change: -0.16,
    changePercent: -0.0018
  },
  {
    id: uuid(),
    symbol: 'AMZN',
    companyName: 'Amazon.com, Inc.',
    latestPrice: 3242.74,
    change: -5.79,
    changePercent: -0.0018
  },
  {
    id: uuid(),
    symbol: 'V',
    companyName: 'Visa Inc.',
    latestPrice: 202.98,
    change: 0.39,
    changePercent: -0.0019
  }
];
