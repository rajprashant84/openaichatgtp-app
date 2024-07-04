import React, { useState } from 'react';
import { getResponseFromGPT } from '../api/openai';
import './ChatGPT.css';

const ChatGPT: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const gptResponse = await getResponseFromGPT(input);
    setResponse(gptResponse);
  };

  return (
    <div className="chat-container">
      <h1>Chat with GPT-3</h1>
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
      {response && <p className="chat-response">{response}</p>}
    </div>
  );
};

export default ChatGPT;
