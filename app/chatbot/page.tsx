'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ChatbotPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    const userMessage = `You: ${message}`;
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || 'No response from bot.';
      setChatHistory((prev) => [...prev, `Bot: ${botResponse}`]);
    } catch (error) {
      console.error('Error sending message to Groq API:', error);
      setChatHistory((prev) => [...prev, `Bot: Error - Could not get a response.`]);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-chat-bg text-white">
      <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>
      <div className="flex-1 overflow-y-auto custom-scrollbar mb-2 p-4 rounded-lg bg-gray-800 border border-gray-700">
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-3 max-w-[80%] p-3 rounded-lg ${msg.startsWith('You:') ? 
              'bg-primary-600 ml-auto' : 
              'bg-gray-700 mr-auto'}`}
          >
            {msg}
          </div>
        ))}
      </div>
      <div className="flex items-center mb-1">
        <Input
          type="text"
          placeholder="Ask the bot..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          className="flex-1 mr-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        />
        <Button 
          onClick={handleSendMessage} 
          className="bg-accent-500 hover:bg-accent-600 text-white p-3 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </Button>
      </div>
    </div>
  );
}