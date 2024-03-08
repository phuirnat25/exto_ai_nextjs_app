'use client'

import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

const chatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedAssistantId, setSelectedAssistantId] = useState('');
  const assistantOptions = [
    { name: "Test", value: "Test", assistantId: "asst_tSqub0CVJiLq5M4NYy6dP1ye" },
    { name: "exto_training", value: "exto_training", assistantId: "asst_7A1WeV6nFTBlLX7g3kVkQSQa" },
    { name: "Report Analysis", value: "Report Analysis", assistantId: "asst_66jFFy8u38eNbYwdBHQ8gIA9" }
  ];
  const [showAssistantList, setShowAssistantList] = useState(false);

  async function handleSendMessage() {
    if (!inputMessage.trim()) return;

    // Add the user's message to the local state before sending it to the server
    const newMessage: Message = {
      id: Date.now().toString(), // Simple ID generation
      text: inputMessage,
      sender: 'user',
    };
    setShowAssistantList(false);
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Prepare FormData
    const formData = new FormData();
    formData.append('content', inputMessage);
    // Assume you handle file selection with a ref to a hidden file input
    if (fileInputRef.current?.files[0]) {
      formData.append('file', fileInputRef.current.files[0]);
    }

    // formData.append('assistantId', "asst_tSqub0CVJiLq5M4NYy6dP1ye");
    formData.append('assistantId', selectedAssistantId);

    try {
      const response = await fetch('http://localhost:3001/api/gpt-services/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v1',
        },
        body: formData,

      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { botMessage } = await response.json();

      setMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), text: botMessage, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Clear input field
    setInputMessage('');
    setShowAssistantList(false);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setInputMessage(value);

    if (value.includes('@')) {
      setShowAssistantList(true);
    } else {
      setShowAssistantList(false);
    }
  };


  const handleOptionSelect = (option) => {
    setSelectedOption(option.name); // Update the selected option
    setSelectedAssistantId(option.assistantId);
    console.log("Selected Assistant ID:", option.assistantId);
    setShowAssistantList(false); // Optionally hide the Assistant list
    setInputMessage(inputMessage.slice(0, -1));
  };

  return (
    <>
      <Head>
        <title>Chatbot Interface</title>
      </Head>
      <div className="max-w-2xl mx-auto my-8 bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
        {selectedOption && (
          <div className="text-center py-2">
            Assistant: <strong>{selectedOption}</strong>
          </div>
        )}
        <div className="h-96 overflow-y-auto p-4 flex flex-col gap-4 bg-gradient-to-b from-gray-50 to-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg ${message.sender === 'user' ? 'ml-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' : 'mr-auto bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow'
                } transition duration-300 ease-in-out transform hover:scale-105`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex p-3 bg-gradient-to-r from-gray-100 to-gray-200 items-center">
          <input type="file" name="file" id="file-input" className="mr-2 hidden" ref={fileInputRef} />
          <label htmlFor="file-input" className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 mr-2 cursor-pointer transition duration-150 ease-in-out">
            {/* Icon for file input */}
          </label>
          <input
            type="text"
            value={inputMessage}
            onChange={handleChange}
            placeholder="Type a message..."
            className="flex-grow p-3 mr-2 border border-transparent rounded-lg bg-white shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-2 shadow-lg transition duration-150 ease-in-out transform hover:scale-105"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
        {showAssistantList && (
          <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3">
            {assistantOptions.map((option, index) => (
              <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionSelect(option)}>
                {option.name}
              </div>
            ))}
          </div>
        )}
        {/* Additional buttons */}
      </div>
    </>
  );
}

export default chatBox;