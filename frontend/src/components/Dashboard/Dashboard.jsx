import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent';
import GraphComponent from './GraphComponent';
import FilterControls from '../Filters/FilterControls';
import { getDashboardData } from '../../utils/api';

const Dashboard = ({ sessionId }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      loadDashboardData();
    }
  }, [sessionId]);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDashboardData(sessionId);
      setDashboardData(data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard loading">
        <div className="loading-spinner">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard error">
        <div className="error-message">{error}</div>
        <button onClick={loadDashboardData} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard empty">
        <div className="empty-state">
          <h3>Welcome to ChatBI Dashboard</h3>
          <p>Start a conversation in the chat to see your data visualized here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Data Dashboard</h2>
        <div className="dashboard-actions">
          <button className="btn btn-secondary">Export</button>
          <button className="btn btn-secondary">Refresh</button>
        </div>
      </div>

      {/* KPI Cards */}
      {dashboardData.kpis && dashboardData.kpis.length > 0 && (
        <div className="kpi-grid">
          {dashboardData.kpis.map((kpi, index) => (
            <div key={index} className="kpi-card">
              <h4>{kpi.title}</h4>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-type">{kpi.type}</div>
            </div>
          ))}
        </div>
      )}

      {/* Charts */}
      {dashboardData.charts && dashboardData.charts.length > 0 && (
        <div className="charts-grid">
          {dashboardData.charts.map((chart, index) => (
            <div key={index} className="chart-container">
              <GraphComponent chartData={chart} />
            </div>
          ))}
        </div>
      )}

      {/* Data Table */}
      {dashboardData.table && (
        <div className="table-section">
          <h3>Data Table</h3>
          <TableComponent tableData={dashboardData.table} />
        </div>
      )}

      {/* Filters */}
      <div className="filters-section">
        <FilterControls />
      </div>
    </div>
  );
};

export default Dashboard;