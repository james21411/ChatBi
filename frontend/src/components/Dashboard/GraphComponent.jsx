import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GraphComponent = ({ chartData }) => {
  const chartRef = useRef(null);

  if (!chartData) {
    return <div className="chart-placeholder">No chart data available</div>;
  }

  const { type, title, data, options = {} } = chartData;

  // Default options
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    ...options,
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar ref={chartRef} data={data} options={defaultOptions} />;
      case 'line':
        return <Line ref={chartRef} data={data} options={defaultOptions} />;
      case 'pie':
        return <Pie ref={chartRef} data={data} options={defaultOptions} />;
      default:
        return <div className="chart-error">Unsupported chart type: {type}</div>;
    }
  };

  return (
    <div className="graph-component">
      <div className="chart-header">
        <h4>{title}</h4>
      </div>
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default GraphComponent;