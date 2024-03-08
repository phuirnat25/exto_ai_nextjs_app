import React, { useState } from 'react';

const threadNavbar: React.FC = () => {
  const [threads, setThreads] = useState<string[]>(['Conversation 1', 'Conversation 2', 'Conversation 3']);
  const [selectedThreadId, setSelectedThreadId] = useState<string>(threads[0]);

  const handleThreadClick = (threadId: string) => {
    setSelectedThreadId(threadId);
  };

  const handleCreateThread = () => {
    const newThreadId = `Conversation ${threads.length + 1}`;
    setThreads(prevThreads => [...prevThreads, newThreadId]);
    setSelectedThreadId(newThreadId);
  };

  return (
    <div className="h-full w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-5 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <button
          onClick={handleCreateThread}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Thread
        </button>
      </div>
      <ul className="list-none overflow-y-auto flex-grow">
        {threads.map((thread, index) => (
          <li
            key={index}
            className={`px-4 py-2 ${thread === selectedThreadId ? 'bg-blue-700' : 'hover:bg-blue-800'} cursor-pointer`}
            onClick={() => handleThreadClick(thread)}
          >
            {thread}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default threadNavbar;