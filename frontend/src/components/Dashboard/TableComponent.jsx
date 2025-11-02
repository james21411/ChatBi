import React, { useState } from 'react';

const TableComponent = ({ tableData }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!tableData || !tableData.rows) {
    return <div className="table-placeholder">No data to display</div>;
  }

  const { columns, rows } = tableData;

  const handleSort = (columnField) => {
    if (sortColumn === columnField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnField);
      setSortDirection('asc');
    }
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="table-component">
      <div className="table-controls">
        <div className="table-info">
          Showing {paginatedRows.length} of {rows.length} rows
        </div>
        <div className="table-pagination">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="btn btn-secondary"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-secondary"
          >
            Next
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  onClick={() => handleSort(column.field)}
                  className={`sortable ${sortColumn === column.field ? 'sorted' : ''}`}
                >
                  {column.headerName}
                  {sortColumn === column.field && (
                    <span className="sort-indicator">
                      {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.field}>
                    {row[column.field] !== null && row[column.field] !== undefined
                      ? String(row[column.field])
                      : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;