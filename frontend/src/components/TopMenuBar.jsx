import React from 'react';
import './TopMenuBar.css';
import './MainContent.css';

const TopMenuBar = ({ onToggleLeftNav, onToggleRightPane, currentPage }) => {
  const getPageTitle = (page) => {
    const titles = {
      home: 'Accueil',
      import: 'Importer des données',
      sources: 'Sources de données',
      preparation: 'Préparation des données',
      modeling: 'Modélisation',
      workspaces: 'Espaces de travail',
      reports: 'Rapports',
      dashboards: 'Tableaux de bord'
    };
    return titles[page] || 'ChatBI';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-1">
      <div className="container-fluid px-3">
        <div className="navbar-nav me-auto">
          <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="fileMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Fichier
            </a>
            <ul className="dropdown-menu" aria-labelledby="fileMenu">
              <li><a className="dropdown-item" href="#"><i className="fas fa-plus me-2"></i>Nouveau</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-folder-open me-2"></i>Ouvrir</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-save me-2"></i>Enregistrer</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-save me-2"></i>Enregistrer sous</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt me-2"></i>Quitter</a></li>
            </ul>
          </div>
          <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="editMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Édition
            </a>
            <ul className="dropdown-menu" aria-labelledby="editMenu">
              <li><a className="dropdown-item" href="#"><i className="fas fa-undo me-2"></i>Annuler</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-redo me-2"></i>Rétablir</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-cut me-2"></i>Couper</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-copy me-2"></i>Copier</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-paste me-2"></i>Coller</a></li>
            </ul>
          </div>
          <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="viewMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Affichage
            </a>
            <ul className="dropdown-menu" aria-labelledby="viewMenu">
              <li><a className="dropdown-item" href="#"><i className="fas fa-search-plus me-2"></i>Zoom avant</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-search-minus me-2"></i>Zoom arrière</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#" onClick={onToggleLeftNav}><i className="fas fa-bars me-2"></i>Navigation</a></li>
            </ul>
          </div>
          <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="toolsMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Outils
            </a>
            <ul className="dropdown-menu" aria-labelledby="toolsMenu">
              <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Paramètres</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-plug me-2"></i>Extensions</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-terminal me-2"></i>Console</a></li>
            </ul>
          </div>
          <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="helpMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Aide
            </a>
            <ul className="dropdown-menu" aria-labelledby="helpMenu">
              <li><a className="dropdown-item" href="#"><i className="fas fa-question-circle me-2"></i>Documentation</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-info-circle me-2"></i>À propos</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-envelope me-2"></i>Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="d-flex gap-3">
          <a href="#" className="nav-link text-light"><i className="fas fa-bell"></i></a>
          <a href="#" className="nav-link text-light">Profil</a>
          <a href="#" className="nav-link text-light">Déconnexion</a>
        </div>
      </div>
    </nav>
  );
};

export default TopMenuBar;