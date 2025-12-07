import { useState, useEffect } from 'react';
import { X, Maximize2, Minimize2, GripVertical } from 'lucide-react';
import { AIAssistant } from './AIAssistant';

interface FlexibleAIAssistantProps {
  initialWidth?: number;
  initialVisible?: boolean;
  onToggle?: (visible: boolean) => void;
}

export function FlexibleAIAssistant({
  initialWidth = 320,
  initialVisible = true,
  onToggle
}: FlexibleAIAssistantProps) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle visibility toggle
  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onToggle?.(newVisibility);
  };

  // Handle window resizing
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleResize = (e: MouseEvent) => {
    if (isResizing) {
      // Limit width between 240px and 500px
      const newWidth = Math.max(240, Math.min(500, e.clientX - 20));
      setWidth(newWidth);
    }
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  // Handle window dragging
  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleDrag = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse movements
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', stopResizing);
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', stopDragging);
    }

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isResizing, isDragging]);

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed right-4 bottom-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg z-50"
        title="Ouvrir l'assistant IA"
      >
        <Maximize2 size={20} />
      </button>
    );
  }

  return (
    <div
      className="fixed right-4 bottom-4 z-50 shadow-2xl rounded-lg overflow-hidden"
      style={{
        width: `${width}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'auto'
      }}
    >
      {/* Drag handle */}
      <div
        className="absolute top-0 left-0 right-0 h-6 bg-blue-600 flex items-center justify-between px-2 cursor-move"
        onMouseDown={startDragging}
      >
        <div className="flex items-center gap-2">
          <GripVertical size={16} className="text-white" />
          <span className="text-white text-sm font-medium">Assistant IA</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={toggleVisibility}
            className="w-6 h-6 bg-blue-700 text-white rounded flex items-center justify-center hover:bg-blue-800 transition-colors"
            title="Masquer"
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={toggleVisibility}
            className="w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center hover:bg-red-700 transition-colors"
            title="Fermer"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Resize handle */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2 bg-blue-600 cursor-col-resize hover:bg-blue-700 transition-colors"
        onMouseDown={startResizing}
      />

      {/* Assistant content - adjusted to remove fixed width */}
      <div className="mt-6 bg-gray-50 flex flex-col h-[600px]">
        <AIAssistant />
      </div>
    </div>
  );
}