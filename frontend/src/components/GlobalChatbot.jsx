import React, { useState, useRef, useEffect } from 'react';

const GlobalChatbot = ({ isOpen, collapsed, width, onToggle, onCollapse, onResize }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = () => {
    const msg = inputValue.trim();
    if (!msg) return;

    const userMessage = { text: msg, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const botMessage = {
        text: `Résultats pour "${msg}" affichés dans le dashboard.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e) => {
      const dx = startX - e.clientX;
      let newWidth = startWidth + dx;
      if (newWidth < 260) newWidth = 260;
      if (newWidth > 640) newWidth = 640;
      onResize(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
  };

  return (
    <>
      <button
        id="chatbotToggle"
        className="chatbot-toggle"
        onClick={onToggle}
        aria-controls="chatbotSidebar"
        aria-expanded={isOpen}
        title="Ouvrir le chatbot"
      >
        <i className="fas fa-comments" aria-hidden="true"></i>
      </button>

      <aside
        id="chatbotSidebar"
        className={`chatbot-sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
        style={{ width: `${width}px` }}
        aria-hidden={!isOpen}
      >
        <div className="cb-header d-flex justify-content-between align-items-center p-3">
          <div>
            <strong>Assistant ChatBI</strong>
            <div className="text-muted" style={{ fontSize: '0.75rem', color: 'rgba(207,230,255,0.6)' }}>
              Analyse & requêtes rapides
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="cb-header-actions d-flex gap-2 me-2">
              <button title="Historique" className="btn btn-icon">
                <i className="fas fa-history"></i>
              </button>
              <button title="Réglages" className="btn btn-icon">
                <i className="fas fa-cog"></i>
              </button>
              <button title="Exporter" className="btn btn-icon">
                <i className="fas fa-download"></i>
              </button>
            </div>
            <button
              id="chatbotClose"
              className="btn btn-sm btn-outline-secondary"
              onClick={onToggle}
              aria-label="Fermer le chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div id="chatResizer" className="chat-resizer" onMouseDown={handleMouseDown}></div>

        <div id="cbResponseBox" className="cb-response-box" aria-live="polite" aria-atomic="true">
          <h6>Réponse rapide</h6>
          <div id="cbResponseContent">
            {messages.length > 0 ? messages[messages.length - 1].text : 'Les réponses synthétiques s\'affichent ici (ex: résumé, KPI clés).'}
          </div>
        </div>

        <div id="cbMessages" className="cb-messages" role="log" aria-live="polite">
          {messages.map((msg, index) => (
            <div key={index} className={`cb-message ${msg.sender}`}>
              <div className="cb-avatar">
                <i className={`fas fa-${msg.sender === 'user' ? 'user' : 'robot'}`}></i>
              </div>
              <div className="cb-text">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="cb-message bot cb-typing">
              <div className="cb-avatar">
                <i className="fas fa-robot fa-spin"></i>
              </div>
              <div className="cb-text">IA réfléchit...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="cb-input p-3 d-flex gap-2">
          <textarea
            id="cbInput"
            ref={inputRef}
            className="form-control bg-transparent text-light"
            placeholder="Posez une question..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            aria-label="Message au chatbot"
            rows="1"
            style={{ resize: 'none', overflow: 'hidden' }}
          />
          <button
            id="cbSend"
            className="btn btn-primary"
            onClick={handleSend}
            aria-label="Envoyer le message"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
          <button
            id="cbCollapse"
            className="btn btn-sm btn-outline-light"
            onClick={onCollapse}
            title="Réduire le chat"
            aria-pressed={collapsed}
          >
            <i className="fas fa-compress-alt"></i>
          </button>
        </div>
      </aside>
    </>
  );
};

export default GlobalChatbot;