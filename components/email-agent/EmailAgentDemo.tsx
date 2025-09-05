'use client';

import { useState, useEffect } from 'react';
import { MobileShell } from './MobileShell';
import { Inbox } from './Inbox';
import { Thread } from './Thread';
import { SmartReply } from './SmartReply';
import { RulesBuilder } from './RulesBuilder';
import { Metrics } from './Metrics';
import { Email } from '@/lib/types';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Sparkles, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/lib/types';

export function EmailAgentDemo() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isAutomationActive, setIsAutomationActive] = useState(false);

  const dict = getDictionary('en' as Locale);

  const handleSelectEmail = (email: Email) => {
    if (!isAutomationActive) {
        setSelectedEmail(email);
    }
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
  };

  const handleStartAutomation = () => {
    setIsAutomationActive(true);
    setActiveTab('inbox'); // Always start/switch to inbox for automation loop
  };

  let content;
  if (!isAutomationActive) {
    // Initial screen or manual mode
    if (selectedEmail) {
        content = <Thread email={selectedEmail} onBack={handleBackToInbox} isAutomationActive={isAutomationActive} />;
    } else {
        switch (activeTab) {
            case 'inbox':
                content = <Inbox onSelectEmail={handleSelectEmail} isAutomationActive={isAutomationActive} />;
                break;
            case 'smart-reply':
                content = <SmartReply />;
                break;
            case 'rules':
                content = <RulesBuilder />;
                break;
            case 'metrics':
                content = <Metrics />;
                break;
            default:
                content = <Inbox onSelectEmail={handleSelectEmail} isAutomationActive={isAutomationActive} />;
        }
    }
  } else {
    // Live Automation Active: always render Inbox for the continuous loop
    content = (
        <motion.div
            key="automated-inbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full"
        >
            <Inbox onSelectEmail={handleSelectEmail} isAutomationActive={isAutomationActive} />
        </motion.div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <MobileShell activeTab={activeTab} onTabChange={setActiveTab} isAutomationActive={isAutomationActive}>
        <AnimatePresence mode="wait">
          {content}
        </AnimatePresence>
      </MobileShell>
      <Toaster />
    </div>
  );
}
