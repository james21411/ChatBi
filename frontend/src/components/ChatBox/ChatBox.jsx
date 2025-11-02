import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { sendMessage } from '../../utils/api';

const ChatBox = ({ sessionId, onSessionStart }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(message, sessionId);

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: response.insights || 'I received your query and processed it.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        data: response
      };

      setMessages(prev => [...prev, botMessage]);

      // Update session if new
      if (!sessionId && response.session_id) {
        onSessionStart(response.session_id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error processing your request.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <h2>ChatBI Assistant</h2>
        <p>Ask questions about your data in natural language</p>
      </div>

      <MessageList messages={messages} messagesEndRef={messagesEndRef} />

      <InputArea
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        disabled={isLoading}
      />
    </div>
  );
};

export default ChatBox;