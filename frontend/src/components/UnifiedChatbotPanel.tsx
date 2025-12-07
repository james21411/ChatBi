import { useState } from 'react';
import { X, MessageSquare, Sparkles } from 'lucide-react';

interface UnifiedChatbotPanelProps {
  type: 'ai' | 'cleaning';
  initialMessages?: Array<{id: number; type: 'user' | 'ai'; text: string}>;
  onClose?: () => void;
}

export function UnifiedChatbotPanel({
  type,
  initialMessages = [],
  onClose
}: UnifiedChatbotPanelProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [panelWidth, setPanelWidth] = useState(380); // Default width in pixels

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    if (onClose && !isVisible) {
      onClose();
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        type: 'user' as const,
        text: inputValue
      };

      setMessages([...messages, newUserMessage]);
      setInputValue('');

      // Simulate AI response after 1 second
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai' as const,
          text: type === 'ai'
            ? "J'analyse votre demande et je vous réponds avec des insights basés sur vos données..."
            : "Je prépare les options de nettoyage pour vos données. Un instant..."
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Resize handler
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panelWidth;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate new width (min 240px, max 50% of screen width)
      const newWidth = Math.max(240, Math.min(window.innerWidth * 0.5, startWidth + (e.clientX - startX)));
      setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-l-lg flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg z-40"
        title={type === 'ai' ? "Ouvrir l'assistant IA" : "Ouvrir l'assistant de nettoyage"}
      >
        <MessageSquare size={20} />
      </button>
    );
  }

  return (
    <div
      className="relative bg-gray-50 border-l border-gray-200 flex flex-col h-full transition-all duration-200"
      style={{ width: `${panelWidth}px` }}
    >
      {/* Header with close button and resize handle */}
      <div className="bg-white px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF6B00] rounded flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <h2 className="text-gray-800 text-base font-medium">
            {type === 'ai' ? 'Nexus Assistant' : 'Assistant Nettoyage'}
          </h2>
        </div>
        <button
          onClick={toggleVisibility}
          className="w-6 h-6 bg-gray-200 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
          title="Fermer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Resize handle (left side) */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 hover:bg-opacity-20 transition-colors"
        onMouseDown={startResizing}
      />

      {/* Conversation area - full height with scrolling */}
      <div className="flex-1 overflow-auto p-5 space-y-4">
        {messages.length === 0 ? (
          <div className="flex justify-start">
            <div className="max-w-[90%] px-5 py-4 rounded-lg bg-white border border-[#FF6B00] text-gray-800 rounded-bl-none text-base">
              {type === 'ai'
                ? 'Bonjour ! Je suis Nexus Assistant. Comment puis-je vous aider avec vos données aujourd\'hui ?'
                : 'Je suis prêt à analyser et nettoyer vos données. Quelles actions souhaitez-vous entreprendre ?'}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] px-5 py-4 rounded-lg text-base ${
                  message.type === 'user'
                    ? 'bg-[#0056D2] text-white rounded-br-none'
                    : 'bg-white border border-[#FF6B00] text-gray-800 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input area */}
      <div className="bg-white px-5 py-4 border-t border-gray-200">
        <div className="flex gap-1.5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={type === 'ai' ? "Posez une question..." : "Décrivez le nettoyage nécessaire..."}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent text-base"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-[#FF6B00] text-white rounded-lg flex items-center justify-center hover:bg-[#e56100] transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Import Send icon
import { Send } from 'lucide-react';