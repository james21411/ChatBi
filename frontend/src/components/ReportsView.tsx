import { TopMenuBar } from './TopMenuBar';
import { Sidebar } from './Sidebar';
import { FileText, Calendar, Download, Share2, MoreVertical, Eye } from 'lucide-react';

interface ReportsViewProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
  onShowImportModal?: () => void;
}

const reports = [
  { id: 1, name: 'Rapport Mensuel - Janvier 2025', type: 'PDF', date: '2025-01-31', status: 'Publié', views: 245 },
  { id: 2, name: 'Analyse Trimestrielle Q4 2024', type: 'Excel', date: '2024-12-31', status: 'Brouillon', views: 89 },
  { id: 3, name: 'Performance des Ventes', type: 'PDF', date: '2025-01-15', status: 'Publié', views: 412 },
  { id: 4, name: 'KPIs Opérationnels', type: 'PowerPoint', date: '2025-01-28', status: 'Publié', views: 178 },
  { id: 5, name: 'Analyse Client 2024', type: 'PDF', date: '2024-12-20', status: 'Archivé', views: 523 },
  { id: 6, name: 'Budget Prévisionnel 2025', type: 'Excel', date: '2025-01-05', status: 'Publié', views: 301 },
];

export function ReportsView({ currentView, onViewChange, onShowImportModal }: ReportsViewProps) {
  return (
    <div className="flex flex-col h-screen">
      <TopMenuBar 
        currentView={currentView} 
        onViewChange={onViewChange}
        onShowImportModal={onShowImportModal}
      />
      
      <div className="flex flex-1 overflow-hidden bg-gray-50">
        <Sidebar activeView="reports" onNavigate={onViewChange} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* En-tête */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-gray-800 text-lg">Rapports</h1>
              <button className="px-3 py-1.5 bg-[#0056D2] text-white rounded hover:bg-[#0046b2] transition-colors text-sm">
                Nouveau rapport
              </button>
            </div>
            <p className="text-gray-600 text-sm">Gérez et partagez vos rapports d'analyse</p>
          </div>

          {/* Filtres */}
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3">
            <select className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0056D2] text-sm">
              <option>Tous les types</option>
              <option>PDF</option>
              <option>Excel</option>
              <option>PowerPoint</option>
            </select>

            <select className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0056D2] text-sm">
              <option>Tous les statuts</option>
              <option>Publié</option>
              <option>Brouillon</option>
              <option>Archivé</option>
            </select>

            <div className="flex items-center gap-1.5 ml-auto">
              <Calendar size={14} className="text-gray-500" />
              <input
                type="date"
                className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0056D2] text-sm"
              />
            </div>
          </div>

          {/* Liste des rapports */}
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-1 gap-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white border border-gray-200 rounded p-4 hover:shadow transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 bg-[#0056D2] rounded flex items-center justify-center flex-shrink-0">
                        <FileText size={20} className="text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-gray-800 text-sm mb-0.5">{report.name}</h3>
                        <div className="flex items-center gap-3 text-gray-600 text-xs">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.date}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Eye size={12} />
                            <span>{report.views} vues</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-white text-xs ${
                        report.status === 'Publié' ? 'bg-[#0056D2]' :
                        report.status === 'Brouillon' ? 'bg-[#FF6B00]' :
                        'bg-gray-400'
                      }`}>
                        {report.status}
                      </span>

                      <button className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded transition-colors">
                        <Download size={14} />
                      </button>

                      <button className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded transition-colors">
                        <Share2 size={14} />
                      </button>

                      <button className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}