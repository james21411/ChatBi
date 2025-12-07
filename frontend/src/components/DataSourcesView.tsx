import { TopMenuBar } from './TopMenuBar';
import { Sidebar } from './Sidebar';
import { Database, Cloud, Server, HardDrive, Plus, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface DataSourcesViewProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
  onShowImportModal?: () => void;
}

const dataSources = [
  { 
    id: 1, 
    name: 'Base Production MySQL', 
    type: 'MySQL', 
    icon: Database, 
    status: 'Connecté', 
    lastSync: 'Il y a 5 min',
    records: '1.2M lignes',
    color: 'bg-blue-500'
  },
  { 
    id: 2, 
    name: 'Azure Cloud Storage', 
    type: 'Cloud', 
    icon: Cloud, 
    status: 'Connecté', 
    lastSync: 'Il y a 1h',
    records: '850K lignes',
    color: 'bg-sky-500'
  },
  { 
    id: 3, 
    name: 'PostgreSQL Analytics', 
    type: 'PostgreSQL', 
    icon: Server, 
    status: 'Erreur', 
    lastSync: 'Il y a 2j',
    records: '3.4M lignes',
    color: 'bg-indigo-500'
  },
  { 
    id: 4, 
    name: 'Local Data Warehouse', 
    type: 'SQL Server', 
    icon: HardDrive, 
    status: 'Connecté', 
    lastSync: 'Il y a 30 min',
    records: '2.1M lignes',
    color: 'bg-gray-500'
  },
  { 
    id: 5, 
    name: 'MongoDB Logs', 
    type: 'MongoDB', 
    icon: Database, 
    status: 'En pause', 
    lastSync: 'Il y a 5h',
    records: '5.8M documents',
    color: 'bg-green-500'
  },
  { 
    id: 6, 
    name: 'API REST External', 
    type: 'API', 
    icon: Cloud, 
    status: 'Connecté', 
    lastSync: 'Il y a 15 min',
    records: '420K enregistrements',
    color: 'bg-purple-500'
  },
];

export function DataSourcesView({ currentView, onViewChange, onShowImportModal }: DataSourcesViewProps) {
  return (
    <div className="flex flex-col h-screen">
      <TopMenuBar 
        currentView={currentView} 
        onViewChange={onViewChange}
        onShowImportModal={onShowImportModal}
      />
      
      <div className="flex flex-1 overflow-hidden bg-gray-50">
        <Sidebar activeView="data-sources" onNavigate={onViewChange} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* En-tête */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-gray-800 text-lg">Sources de Données</h1>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-sm">
                  <RefreshCw size={14} />
                  Actualiser tout
                </button>
                <button className="px-3 py-1.5 bg-[#0056D2] text-white rounded hover:bg-[#0046b2] transition-colors flex items-center gap-1.5 text-sm">
                  <Plus size={14} />
                  Nouvelle source
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">Gérez vos connexions aux sources de données</p>
          </div>

          {/* Statistiques */}
          <div className="bg-white border-b border-gray-200 px-4 py-2">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Actives</p>
                  <p className="text-gray-800 text-sm">4 sources</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <AlertCircle size={16} className="text-red-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Erreurs</p>
                  <p className="text-gray-800 text-sm">1 source</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                  <Database size={16} className="text-[#FF6B00]" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total données</p>
                  <p className="text-gray-800 text-sm">13.8M lignes</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <RefreshCw size={16} className="text-[#0056D2]" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Dernière sync</p>
                  <p className="text-gray-800 text-sm">Il y a 5 min</p>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des sources */}
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-2 gap-4">
              {dataSources.map((source) => {
                const Icon = source.icon;
                const isError = source.status === 'Erreur';
                const isPaused = source.status === 'En pause';

                return (
                  <div
                    key={source.id}
                    className="bg-white border border-gray-200 rounded p-4 hover:shadow transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 ${source.color} rounded flex items-center justify-center`}>
                          <Icon size={20} className="text-white" />
                        </div>

                        <div>
                          <h3 className="text-gray-800 text-sm mb-0.5">{source.name}</h3>
                          <p className="text-gray-600 text-xs">{source.type}</p>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-white text-xs ${
                        isError ? 'bg-red-500' :
                        isPaused ? 'bg-orange-500' :
                        'bg-green-500'
                      }`}>
                        {source.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-gray-600 text-xs">
                      <div>
                        <p className="mb-0.5">Dernière sync</p>
                        <p className="text-gray-800">{source.lastSync}</p>
                      </div>
                      <div>
                        <p className="mb-0.5">Volume</p>
                        <p className="text-gray-800">{source.records}</p>
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <button className="flex-1 px-3 py-1.5 bg-[#0056D2] text-white rounded hover:bg-[#0046b2] transition-colors flex items-center justify-center gap-1.5 text-xs">
                        <RefreshCw size={12} />
                        Synchroniser
                      </button>
                      <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-xs">
                        Configurer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}