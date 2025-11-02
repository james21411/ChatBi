import React, { useState } from 'react';

const FilterControls = () => {
  const [filters, setFilters] = useState({
    region: '',
    dateRange: {
      start: '',
      end: ''
    },
    product: '',
    amountRange: {
      min: '',
      max: ''
    }
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleDateRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value
      }
    }));
  };

  const handleAmountRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      amountRange: {
        ...prev.amountRange,
        [type]: value
      }
    }));
  };

  const applyFilters = () => {
    // TODO: Implement filter application logic
    console.log('Applying filters:', filters);
  };

  const clearFilters = () => {
    setFilters({
      region: '',
      dateRange: { start: '', end: '' },
      product: '',
      amountRange: { min: '', max: '' }
    });
  };

  return (
    <div className="filter-controls">
      <h3>Data Filters</h3>

      <div className="filter-group">
        <label htmlFor="region-filter">Region:</label>
        <select
          id="region-filter"
          value={filters.region}
          onChange={(e) => handleFilterChange('region', e.target.value)}
        >
          <option value="">All Regions</option>
          <option value="ile-de-france">Île-de-France</option>
          <option value="provence">Provence</option>
          <option value="nouvelle-aquitaine">Nouvelle-Aquitaine</option>
          <option value="occitanie">Occitanie</option>
          <option value="auvergne-rhone-alpes">Auvergne-Rhône-Alpes</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Product:</label>
        <select
          value={filters.product}
          onChange={(e) => handleFilterChange('product', e.target.value)}
        >
          <option value="">All Products</option>
          <option value="Product A">Product A</option>
          <option value="Product B">Product B</option>
          <option value="Product C">Product C</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Date Range:</label>
        <div className="date-range">
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => handleDateRangeChange('start', e.target.value)}
            placeholder="Start date"
          />
          <span>to</span>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => handleDateRangeChange('end', e.target.value)}
            placeholder="End date"
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Amount Range:</label>
        <div className="amount-range">
          <input
            type="number"
            value={filters.amountRange.min}
            onChange={(e) => handleAmountRangeChange('min', e.target.value)}
            placeholder="Min amount"
          />
          <span>to</span>
          <input
            type="number"
            value={filters.amountRange.max}
            onChange={(e) => handleAmountRangeChange('max', e.target.value)}
            placeholder="Max amount"
          />
        </div>
      </div>

      <div className="filter-actions">
        <button onClick={applyFilters} className="btn btn-primary">
          Apply Filters
        </button>
        <button onClick={clearFilters} className="btn btn-secondary">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterControls;