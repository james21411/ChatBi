import { DataGrid } from './DataGrid';
import { UnifiedChatbotPanel } from './UnifiedChatbotPanel';
import { TopMenuBar } from './TopMenuBar';
import { Sidebar } from './Sidebar';

interface DataCleaningViewProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
  onShowImportModal?: () => void;
}

export function DataCleaningView({ currentView, onViewChange, onShowImportModal }: DataCleaningViewProps) {
  return (
    <div className="flex flex-col h-screen">
      {/* Menu supérieur type VSCode */}
      <TopMenuBar 
        currentView={currentView} 
        onViewChange={onViewChange}
        onShowImportModal={onShowImportModal}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Barre latérale gauche */}
        <Sidebar activeView="cleaning" onNavigate={onViewChange} />

        {/* Zone principale - Data Grid */}
        <DataGrid />

        {/* Panneau latéral droit - Assistant IA de nettoyage */}
        <UnifiedChatbotPanel type="cleaning" />
      </div>
    </div>
  );
}