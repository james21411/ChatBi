import React from 'react';

const RightPane = ({ isOpen, onClose, onToggle }) => {
  return (
    <>
      <div className={`right-pane ${isOpen ? 'open' : ''}`} id="rightPane">
        <div className="p-3 border-bottom">
          <h6>Filtres & Champs</h6>
          <button className="btn btn-sm btn-outline-secondary float-end" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-3">
          <h6>Filtres</h6>
          <div className="filters-row">
            <select className="form-select">
              <option>Région</option>
              <option>Ventes</option>
              <option>Date</option>
            </select>
            <input type="range" className="form-range" min="0" max="100" />
          </div>
          <h6 className="mt-3">Champs</h6>
          <ul className="list-unstyled">
            <li><i className="fas fa-check text-success me-2"></i>Ventes</li>
            <li><i className="fas fa-times text-danger me-2"></i>Date</li>
            <li><i className="fas fa-check text-success me-2"></i>Région</li>
          </ul>
        </div>
      </div>
      <div className="toggle-pane" id="toggleRightPaneIcon" onClick={onToggle}>
        <i className="fas fa-chevron-left"></i>
      </div>
    </>
  );
};

export default RightPane;