import React, { useState } from 'react';
import Dashboard from './Dashboard/Dashboard';

const ReportCanvas = ({ currentPage, onPageChange }) => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onPageChange(tab);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div id="page-home" className="tab-content page-dashboard">
            <h3>Bienvenue dans ChatBI</h3>
            <p>Utilisez le chat pour analyser vos données en temps réel.</p>
            <div className="mb-3">
              <small>Le chatbot professionnel est disponible via le bouton fixe en haut à droite.</small>
            </div>
            <Dashboard />
          </div>
        );
      case 'import':
        return (
          <div id="page-import" className="tab-content page-import">
            <h3>Importer des données</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5>Depuis un fichier</h5>
                    <button className="btn btn-primary"><i className="fas fa-upload"></i> Sélectionner fichier (CSV, Excel)</button>
                    <p className="text-muted">Supporte CSV, Excel, JSON, etc.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5>Depuis une base de données</h5>
                    <select className="form-select mb-2">
                      <option>SQL Server</option>
                      <option>PostgreSQL</option>
                      <option>BigQuery</option>
                    </select>
                    <button className="btn btn-primary">Connecter</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'sources':
        return (
          <div id="page-sources" className="tab-content">
            <h3>Sources de données connectées</h3>
            <div className="list-group">
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <div><i className="fas fa-database me-2"></i>SQL Server - VentesDB</div>
                <button className="btn btn-sm btn-outline-danger">Déconnecter</button>
              </div>
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <div><i className="fas fa-file-excel me-2"></i>Excel - RapportMensuel.xlsx</div>
                <button className="btn btn-sm btn-outline-danger">Supprimer</button>
              </div>
            </div>
            <button className="btn btn-primary mt-3"><i className="fas fa-plus"></i> Ajouter une source</button>
          </div>
        );
      case 'preparation':
        return (
          <div id="page-preparation" className="tab-content page-preparation">
            <h3>Préparation des données (Power Query)</h3>
            <div className="row">
              <div className="col-md-4">
                <h6>Colonnes</h6>
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between"><span>Région</span><i className="fas fa-arrow-up text-primary"></i></li>
                  <li>Ventes</li>
                  <li>Date</li>
                </ul>
              </div>
              <div className="col-md-8">
                <h6>Transformations appliquées</h6>
                <div className="list-group">
                  <div className="list-group-item"><i className="fas fa-filter me-2"></i>Filtré par année 2025</div>
                  <div className="list-group-item"><i className="fas fa-sort me-2"></i>Trié par ventes</div>
                </div>
                <button className="btn btn-success mt-2"><i className="fas fa-play"></i> Appliquer & Fermer</button>
              </div>
            </div>
          </div>
        );
      case 'modeling':
        return (
          <div id="page-modeling" className="tab-content">
            <h3>Modélisation</h3>
            <p>Relations entre tables: Ventes → Régions (1:N)</p>
            <div className="alert alert-info">Aucune mesure DAX personnalisée pour l'instant.</div>
            <button className="btn btn-primary">Nouvelle mesure</button>
          </div>
        );
      default:
        return (
          <div className="tab-content">
            <h3>Page en développement</h3>
            <p>Cette page sera bientôt disponible.</p>
          </div>
        );
    }
  };

  return (
    <div className="report-canvas">
      {renderPageContent()}

      <div className="report-tabs">
        <div className={`tab-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')}>
          Accueil
        </div>
        <div className={`tab-item ${activeTab === 'import' ? 'active' : ''}`} onClick={() => handleTabClick('import')}>
          Import
        </div>
        <div className={`tab-item ${activeTab === 'sources' ? 'active' : ''}`} onClick={() => handleTabClick('sources')}>
          Sources
        </div>
        <div className={`tab-item ${activeTab === 'preparation' ? 'active' : ''}`} onClick={() => handleTabClick('preparation')}>
          Préparation
        </div>
        <div className={`tab-item ${activeTab === 'modeling' ? 'active' : ''}`} onClick={() => handleTabClick('modeling')}>
          Modélisation
        </div>
        <div className={`tab-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabClick('dashboard')}>
          Dashboard <i className="fas fa-plus-circle" style={{ fontSize: '0.8rem' }}></i>
        </div>
      </div>
    </div>
  );
};

export default ReportCanvas;