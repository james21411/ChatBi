# ChatBI Project Renaming Plan: English to French

This document outlines the mapping of all folders and files from their current English names to French equivalents. The renaming will maintain functionality by updating all references accordingly.

## Folder Structure Mapping

| Current Path | New French Path | Translation Notes |
|--------------|-----------------|-------------------|
| backend/ | serveur/ | "Backend" translates to "serveur" in French tech contexts |
| backend/app/ | serveur/application/ | "App" as "application" |
| backend/app/api/ | serveur/application/api/ | Keep "api" as it's a standard acronym |
| backend/app/core/ | serveur/application/noyau/ | "Core" as "noyau" (kernel/core) |
| backend/app/db/ | serveur/application/base_de_données/ | "DB" as "base de données" |
| backend/app/models/ | serveur/application/modèles/ | "Models" as "modèles" |
| backend/app/services/ | serveur/application/services/ | Keep "services" |
| data/ | données/ | "Data" as "données" |
| docs/ | documentation/ | "Docs" as "documentation" |
| frontend/ | interface/ | "Frontend" as "interface" |
| frontend/public/ | interface/public/ | Keep "public" |
| frontend/src/ | interface/source/ | "Src" as "source" |
| frontend/src/components/ | interface/source/composants/ | "Components" as "composants" |
| frontend/src/components/ChatBox/ | interface/source/composants/BoîteDeChat/ | "ChatBox" as "BoîteDeChat" |
| frontend/src/components/Dashboard/ | interface/source/composants/TableauDeBord/ | "Dashboard" as "TableauDeBord" |
| frontend/src/components/Filters/ | interface/source/composants/Filtres/ | "Filters" as "Filtres" |
| frontend/src/styles/ | interface/source/styles/ | Keep "styles" |
| frontend/src/utils/ | interface/source/utilitaires/ | "Utils" as "utilitaires" |
| models/ | modèles/ | "Models" as "modèles" |
| tests/ | tests/ | Keep "tests" |
| tests/backend_tests/ | tests/tests_serveur/ | "Backend tests" as "tests serveur" |
| tests/frontend_tests/ | tests/tests_interface/ | "Frontend tests" as "tests interface" |

## File Name Mapping

| Current File | New French File | Translation Notes |
|--------------|-----------------|-------------------|
| chatbia.html | chatbia.html | Keep as is (project name) |
| README.md | LISEZMOI.md | "README" as "LISEZMOI" (French for "read me") |
| backend/requirements.txt | serveur/requirements.txt | Keep filename |
| backend/app/main.py | serveur/application/principal.py | "Main" as "principal" |
| backend/app/api/endpoints.py | serveur/application/api/points_de_terminaison.py | "Endpoints" as "points de terminaison" |
| backend/app/api/dependencies.py | serveur/application/api/dépendances.py | "Dependencies" as "dépendances" |
| backend/app/core/config.py | serveur/application/noyau/configuration.py | "Config" as "configuration" |
| backend/app/core/logging.py | serveur/application/noyau/journalisation.py | "Logging" as "journalisation" |
| backend/app/db/database.py | serveur/application/base_de_données/base_de_données.py | "Database" as "base de données" |
| backend/app/db/models.py | serveur/application/base_de_données/modèles.py | "Models" as "modèles" |
| backend/app/models/ai_model.py | serveur/application/modèles/modèle_ia.py | "AI model" as "modèle IA" |
| backend/app/models/dashboard_manager.py | serveur/application/modèles/gestionnaire_tableau_de_bord.py | "Dashboard manager" as "gestionnaire tableau de bord" |
| backend/app/models/datasource.py | serveur/application/modèles/source_de_données.py | "Datasource" as "source de données" |
| backend/app/models/query_generator.py | serveur/application/modèles/générateur_de_requêtes.py | "Query generator" as "générateur de requêtes" |
| backend/app/models/user_session.py | serveur/application/modèles/session_utilisateur.py | "User session" as "session utilisateur" |
| backend/app/services/export.py | serveur/application/services/exportation.py | "Export" as "exportation" |
| backend/app/services/preprocessing.py | serveur/application/services/prétraitement.py | "Preprocessing" as "prétraitement" |
| data/sample.csv | données/échantillon.csv | "Sample" as "échantillon" |
| data/schema.json | données/schéma.json | "Schema" as "schéma" |
| docs/architecture.md | documentation/architecture.md | Keep "architecture" |
| docs/roadmap.md | documentation/feuille_de_route.md | "Roadmap" as "feuille de route" |
| docs/UX_UI_mockup.md | documentation/maquette_UX_UI.md | "UX UI mockup" as "maquette UX UI" |
| frontend/package.json | interface/package.json | Keep filename |
| frontend/public/index.html | interface/public/index.html | Keep filename |
| frontend/src/App.jsx | interface/source/Application.jsx | "App" as "Application" |
| frontend/src/index.jsx | interface/source/index.jsx | Keep filename |
| frontend/src/components/Footer.jsx | interface/source/composants/PiedDePage.jsx | "Footer" as "PiedDePage" |
| frontend/src/components/Header.jsx | interface/source/composants/EnTête.jsx | "Header" as "EnTête" |
| frontend/src/components/ChatBox/ChatBox.jsx | interface/source/composants/BoîteDeChat/BoîteDeChat.jsx | "ChatBox" as "BoîteDeChat" |
| frontend/src/components/ChatBox/InputArea.jsx | interface/source/composants/BoîteDeChat/ZoneDeSaisie.jsx | "InputArea" as "ZoneDeSaisie" |
| frontend/src/components/ChatBox/MessageList.jsx | interface/source/composants/BoîteDeChat/ListeDeMessages.jsx | "MessageList" as "ListeDeMessages" |
| frontend/src/components/Dashboard/Dashboard.jsx | interface/source/composants/TableauDeBord/TableauDeBord.jsx | "Dashboard" as "TableauDeBord" |
| frontend/src/components/Dashboard/GraphComponent.jsx | interface/source/composants/TableauDeBord/ComposantGraphique.jsx | "GraphComponent" as "ComposantGraphique" |
| frontend/src/components/Dashboard/TableComponent.jsx | interface/source/composants/TableauDeBord/ComposantTableau.jsx | "TableComponent" as "ComposantTableau" |
| frontend/src/components/Filters/FilterControls.jsx | interface/source/composants/Filtres/ContrôlesDeFiltrage.jsx | "FilterControls" as "ContrôlesDeFiltrage" |
| frontend/src/styles/main.scss | interface/source/styles/principal.scss | "Main" as "principal" |
| frontend/src/styles/variables.scss | interface/source/styles/variables.scss | Keep "variables" |
| frontend/src/utils/api.js | interface/source/utilitaires/api.js | Keep filename |
| models/config.yaml | modèles/configuration.yaml | "Config" as "configuration" |
| tests/backend_tests/__init__.py | tests/tests_serveur/__init__.py | Keep "__init__.py" |
| tests/backend_tests/test_api.py | tests/tests_serveur/test_api.py | Keep filename |
| tests/frontend_tests/__init__.py | tests/tests_interface/__init__.py | Keep "__init__.py" |
| tests/frontend_tests/App.test.js | tests/tests_interface/Application.test.js | "App" as "Application" |

## Implementation Strategy

1. **Folder Renaming Order**: Start from deepest nested folders and work upwards to avoid path conflicts
   - Rename leaf folders first (e.g., ChatBox/, Dashboard/, Filters/, backend_tests/, frontend_tests/)
   - Then parent folders (components/, src/, app/, backend/, frontend/, etc.)
   - Finally root-level folders (data/, docs/, models/, tests/)

2. **File Renaming**: Rename files after their containing folders are renamed

3. **Reference Updates**: After renaming, update all import statements, file references, and configuration files
   - Python imports (relative imports in backend)
   - JavaScript/React imports (in frontend)
   - Configuration files (package.json, requirements.txt)
   - Documentation references

4. **Testing**: Verify functionality after each major rename batch