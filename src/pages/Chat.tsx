import React from 'react';
import ChatContainer from '../components/ChatContainer';

export default function Chat() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
      <main className="w-full max-w-4xl px-4 py-8">
        <ChatContainer />
      </main>
    </div>
  );
}