import React, { useState } from 'react';
import { getResponseFromGPT } from '../api/openai';
import './ChatGPT.css';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const ChatGPT: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      const gptResponse = await getResponseFromGPT(userMessage.text);
      const gptMessage: Message = {
        text: gptResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
    } catch (error) {
      console.error('Error fetching response from GPT:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Failed to fetch response from GPT.',
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat with GPT-3.5</h1>
      </div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.isUser ? 'user' : 'gpt'}`}>
            <div className="message-text">{message.text}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="chat-input"
        />
        <button type="submit" className="chat-button">Send</button>
      </form>
    </div>
  );
};

export default ChatGPT;
