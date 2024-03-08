'use client'

import React, { useState } from 'react';
import ChatBox from '../components/chatBox';
import ThreadNavbar from '../components/threadNavbar';
import Head from 'next/head';

const Extoai: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Head>
        <title>Exto Chat</title>
      </Head>
      <ThreadNavbar/>
      <main className="flex-grow p-4">
        <h1 className="text-xl font-bold mb-4">Chatbot Application</h1>
        <ChatBox />
      </main>
    </div>
  );
};

export default Extoai;