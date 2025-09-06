import React from 'react';
import Button from './components/ui/button';
import Card from './components/ui/card';
import Input from './components/ui/input';
import EmailAgentDemo from './components/email-agent/EmailAgentDemo';
import MariMariChatbot from './components/Chatbot/MariMariChatbot';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 space-y-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Automari!</h1>
      <Card className="max-w-md w-full mb-4">
        <h2 className="text-xl font-semibold mb-2">Try our UI Components</h2>
        <div className="flex flex-col space-y-4">
          <Input placeholder="Type something..." />
          <Button>Click Me</Button>
        </div>
      </Card>
      <Card className="max-w-md w-full mb-4">
        <EmailAgentDemo />
      </Card>
      <Card className="max-w-md w-full">
        <MariMariChatbot />
      </Card>
    </main>
  );
}