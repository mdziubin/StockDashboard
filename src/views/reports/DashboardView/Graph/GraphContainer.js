import React, { useEffect, useState } from 'react';
import { Card, CardContent, Box } from '@material-ui/core';
import Graph from './Graph';
import FormSelect from 'src/components/UI/FormSelect';
import CContentLoading from 'src/components/CContentLoading';
import { getChart } from 'src/services/stock-service';

const GraphContainer = props => {
  // Dropdown date range selector states
  const [range, setRange] = useState('5d');
  const [data, setData] = useState([]);

  // Data request state
  const [isLoading, setLoading] = useState(true);
  const [err, setError] = useState(false);

  useEffect(() => {
    getChart(props.symbol, range)
      .then(response => {
        setData(response);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, [range, props.symbol]);

  // Dropdown values
  const ranges = ['5d', '1m', '3m', '6m', 'ytd', '1y'];

  // Handle dropdown selector changes
  const handleChange = event => {
    setLoading(true);
    setRange(event.target.value);
  };

  // Default content is spinner or error
  let body = <CContentLoading err={err} />;

  // If data is retrieved, set body to graph
  if (!isLoading && !err) {
    body = (
      <CardContent>
        <Box pb={2}>
          <FormSelect value={range} values={ranges} onSelect={handleChange} />
        </Box>
        <Box style={{ height: '300px' }}>
          <Graph sData={data} />
        </Box>
      </CardContent>
    );
  }

  return <Card>{body}</Card>;
};

export default GraphContainer;
