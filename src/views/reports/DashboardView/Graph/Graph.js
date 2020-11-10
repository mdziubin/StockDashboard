import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = ({ sData }) => {
  const gColorRed = 'rgba(255,79,79,0.5)';
  const gColorGreen = 'rgba(102, 240, 106, 1)';
  const lColorRed = 'rgba(224, 6, 6, 0.73)';
  const lColorGreen = 'rgba(5, 189, 75, 0.89)';

  const data = canvas => {
    let lColor = lColorGreen;
    let gColor = gColorGreen;
    // Set colors
    if (
      sData.length > 4 &&
      sData[0].close - sData[sData.length - 1].close > 0
    ) {
      lColor = lColorRed;
      gColor = gColorRed;
    }
    // Set gradient
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, gColor);
    gradient.addColorStop(1, 'rgba(255,255,255,0.5)');

    const labels = sData.map(e => e.date);
    const plotData = sData.map(e => e.close);

    return {
      labels: labels,
      datasets: [
        {
          labels: 'Date',
          data: plotData,
          lineTension: 0,
          backgroundColor: gradient,
          borderColor: lColor
        }
      ]
    };
  };

  const options = {
    legend: { display: false },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          distribution: 'series',
          ticks: {
            maxRotation: 0,
            maxTicksLimit: 6,
            // Skip the first tick on x-axis
            callback: (value, index) => {
              if (index === 0) {
                return null;
              }
              return value;
            }
          },
          type: 'time',
          time: {
            unit: 'day'
          },
          gridLines: {
            display: false
          }
        }
      ],

      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 6
          }
        }
      ]
    }
  };

  return <Line data={data} options={options} />;
};

export default Graph;
