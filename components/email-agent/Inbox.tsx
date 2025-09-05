'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, Bell, ChevronLeft, Mail, Search, Send, Settings, PlusCircle, Trash, Tag, Star, Clock, User, MessageSquare, BookText, BarChart, X, CheckCircle, FolderOpen, Snooze } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getDictionary } from '@/lib/i18n';
import { Email, EmailCategory, Locale } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

const mockEmails = require('@/data/mock-inbox.json') as Email[];

interface InboxProps {
  onSelectEmail: (email: Email) => void;
  isAutomationActive: boolean;
}

interface AnimatedEmailProps {
    email: Email;
    targetRef: React.RefObject<HTMLDivElement>;
    onComplete: (id: string) => void;
    onCountUpdate: (category: EmailCategory) => void; 
}

function AnimatedEmail({
    email,
    targetRef,
    onComplete,
    onCountUpdate
}: AnimatedEmailProps) {
    const [position, setPosition] = useState({ x: 0, y: 0, opacity: 1 });
    const emailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (emailRef.current && targetRef.current) {
            const emailRect = emailRef.current.getBoundingClientRect();
            const targetRect = targetRef.current.getBoundingClientRect();

            setPosition({
                x: targetRect.left - emailRect.left,
                y: targetRect.top - emailRect.top,
                opacity: 0
            });

            const timer = setTimeout(() => {
                onComplete(email.id);
                // Use the category passed in the email prop directly, which would be the classified category
                onCountUpdate(email.category);
            }, 700); // Shorter duration to match animation
            return () => clearTimeout(timer);
        }
    }, [email.id, targetRef, onComplete, onCountUpdate, email.category]);

    return (
        <motion.div
            ref={emailRef}
            className="absolute z-50 p-2 bg-gradient-to-r from-red-600 to-blue-600 rounded-md text-xs text-white shadow-lg whitespace-nowrap"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ x: position.x, y: position.y, opacity: position.opacity, scale: 0.5 }}
            transition={{ duration: 0.6, ease: "easeIn" }} 
        >
            <Tag className="h-3 w-3 inline-block mr-1" /> {email.subject}
        </motion.div>
    )
}

export function Inbox({ onSelectEmail, isAutomationActive }: InboxProps) {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>(mockEmails);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<EmailCategory[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedEmailForAction, setSelectedEmailForAction] = useState<Email | null>(null);
  const [processingEmailId, setProcessingEmailId] = useState<string | null>(null);
  const [animatedEmails, setAnimatedEmails] = useState<Email[]>([]);
  const [processedEmailCounts, setProcessedEmailCounts] = useState<Record<EmailCategory, number>>({
    'leads': 0,
    'support': 0,
    'marketing': 0,
    'billing': 0,
    'priority': 0,
    'spam': 0,
    // Ensure all possible categories are initialized to 0
  });
  
  const categoryRefs = {
    'leads': useRef<HTMLDivElement>(null),
    'support': useRef<HTMLDivElement>(null),
    'marketing': useRef<HTMLDivElement>(null),
    'billing': useRef<HTMLDivElement>(null),
    'priority': useRef<HTMLDivElement>(null),
    'spam': useRef<HTMLDivElement>(null),
  };

  const dict = getDictionary('en' as Locale); // Assuming English for demo
  const { toast } = useToast();

  const swipeThreshold = 100; // pixels
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const startX = useRef(0);
  const currentX = useRef(0);

  const applyFilters = useCallback(() => {
    let tempEmails = emails;

    if (searchTerm) {
      tempEmails = tempEmails.filter(
        (email) =>
          email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.length > 0) {
      tempEmails = tempEmails.filter((email) => filters.includes(email.category));
    }

    setFilteredEmails(tempEmails);
  }, [emails, searchTerm, filters]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, emails, applyFilters]);

  useEffect(() => {
    let automationTimer: NodeJS.Timeout;

    if (isAutomationActive && !processingEmailId) {
      const unprocessedEmails = emails.filter(e => !e.read && !animatedEmails.some(ae => ae.id === e.id));
      if (unprocessedEmails.length > 0) {
        const emailToProcess = unprocessedEmails[0];
        setProcessingEmailId(emailToProcess.id);

        automationTimer = setTimeout(async () => {
          // Simulate AI classification delay
          await new Promise(resolve => setTimeout(resolve, 1000)); 

          // Determine target category (can be enhanced with AI stub logic)
          const simulatedCategory: EmailCategory = (emailToProcess.category === 'leads' && emailToProcess.priorityScore > 85) ? 'priority' : emailToProcess.category;
          const targetRef = categoryRefs[simulatedCategory];

          if (targetRef && targetRef.current) {
            // Add email to animated list for visual transition
            setAnimatedEmails(prev => [...prev, { ...emailToProcess, category: simulatedCategory }]);
          }

          // Update the main emails state after animation starts
          setEmails(prev => 
            prev.map(e => 
              e.id === emailToProcess.id ? { ...e, read: true, category: simulatedCategory } : e
            )
          );
          setProcessingEmailId(null);
        }, 2000); // Simulate AI 'picking up' email after 2 seconds
      } else if (animatedEmails.length === 0) { 
        automationTimer = setTimeout(() => {
          setEmails(mockEmails.map(e => ({ ...e, read: false }))); 
          setAnimatedEmails([]);
          setProcessedEmailCounts({
            'leads': 0,
            'support': 0,
            'marketing': 0,
            'billing': 0,
            'priority': 0,
            'spam': 0,
          });
          setProcessingEmailId(null);
        }, 3000); // Reset after 3 seconds of all emails being processed
      }
    }

    return () => clearTimeout(automationTimer);
  }, [isAutomationActive, emails, processingEmailId, animatedEmails, categoryRefs]); // Removed onSelectEmail

  const handleAnimationComplete = (id: string) => {
    setAnimatedEmails(prev => prev.filter(email => email.id !== id));
  };

  const handleCountUpdate = (category: EmailCategory) => {
    setProcessedEmailCounts(prev => ({
      ...prev,
      [category]: (prev[category] || 0) + 1
    }));
  };

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    if (isAutomationActive) return; 
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
    const item = itemRefs.current[id];
    if (item) item.style.transition = 'none';
  };

  const handleTouchMove = (e: React.TouchEvent, id: string) => {
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    const item = itemRefs.current[id];
    if (item) item.style.transform = `translateX(${diff}px)`;
  };

  const handleTouchEnd = (e: React.TouchEvent, id: string) => {
    const diff = currentX.current - startX.current;
    const item = itemRefs.current[id];

    if (item) item.style.transition = 'transform 0.3s ease-out';

    if (diff > swipeThreshold) {
      // Swipe right: Archive
      handleArchive(id);
    } else if (diff < -swipeThreshold) {
      // Swipe left: Snooze
      handleSnooze(id);
    } else {
      // Reset position
      if (item) item.style.transform = 'translateX(0px)';
    }
  };

  const handleArchive = (id: string) => {
    setEmails((prev) => prev.filter((email) => email.id !== id));
    toast({
      title: dict.toasts.emailArchived,
      duration: 2000,
    });
  };

  const handleSnooze = (id: string) => {
    setEmails((prev) => prev.filter((email) => email.id !== id));
    toast({
      title: dict.toasts.emailSnoozed,
      duration: 2000,
    });
  };

  const handleAssign = (id: string, assignee: string) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, labels: [...email.labels, `Assigned to ${assignee}`] } : email
      )
    );
    setShowAssignDialog(false);
    toast({
        title: `Email assigned to ${assignee}.`,
        duration: 2000,
    })
  };

  const toggleFilter = (category: EmailCategory) => {
    setFilters((prev) =>
      prev.includes(category) ? prev.filter((f) => f !== category) : [...prev, category]
    );
  };

  const handlePullToRefresh = async () => {
    // Simulate refresh
    setEmails([]); // Clear existing to show loading state
    setSearchTerm('');
    setFilters([]);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEmails(mockEmails);
    toast({
        title: "Inbox refreshed!",
        duration: 2000,
    })
  }

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Search and Filter Bar */}
      <motion.div
        className="p-4 bg-slate-800 border-b border-slate-700 flex flex-col space-y-3"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <Input
            type="text"
            placeholder={dict.common.searchEmails}
            className="w-full bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 pl-10 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label={dict.common.searchEmails}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[ 'leads', 'support', 'marketing', 'billing', 'priority'].map((cat) => {
            const isSelected = filters.includes(cat as EmailCategory);
            return (
              <Badge
                key={cat}
                variant={isSelected ? 'default' : 'secondary'}
                className={`cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
                onClick={() => toggleFilter(cat as EmailCategory)}
              >
                <Tag className="h-3 w-3 mr-1" />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Badge>
            );
          })}
        </div>
      </motion.div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar" onTouchEnd={handlePullToRefresh}>
        <AnimatePresence initial={false}>
          {filteredEmails.length === 0 ? (
            <motion.div
              key="no-emails"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 text-center text-slate-400"
            >
              {dict.common.noEmails}
            </motion.div>
          ) : (
            filteredEmails.map((email) => (
              <motion.div
                key={email.id}
                ref={(el) => (itemRefs.current[email.id] = el)}
                onTouchStart={(e) => handleTouchStart(e, email.id)}
                onTouchMove={(e) => handleTouchMove(e, email.id)}
                onTouchEnd={(e) => handleTouchEnd(e, email.id)}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, x: (email.id === processingEmailId && typeof window !== 'undefined') ? -window.innerWidth : 0 }}
                exit={{ opacity: 0, x: (typeof window !== 'undefined') ? -window.innerWidth / 2 : -200 }} // Animate out when processed or swiped
                transition={{ duration: 0.5 }}
                className="relative bg-slate-800 border-b border-slate-700 cursor-pointer overflow-hidden"
              >
                {email.id === processingEmailId && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100%', opacity: 1 }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="absolute top-0 left-0 h-full bg-blue-600/10 z-10"
                    />
                )}
                {/* Swipe actions background */}
                <div className="absolute inset-y-0 left-0 w-full flex items-center justify-between px-4"
                    style={{ 
                        background: 'linear-gradient(to right, #ef4444, transparent)', // Red for archive
                        pointerEvents: 'none'
                    }}
                ></div>
                <div className="absolute inset-y-0 right-0 w-full flex items-center justify-between px-4"
                    style={{
                        background: 'linear-gradient(to left, #fbbf24, transparent)', // Amber for snooze
                        pointerEvents: 'none'
                    }}
                ></div>

                <div
                  className={`relative p-4 hover:bg-slate-700 transition-colors ${email.read ? 'opacity-70' : 'font-semibold'}`}
                  onClick={() => !isAutomationActive && onSelectEmail(email)}
                  role="button"
                  aria-label={`Select email from ${email.sender} about ${email.subject}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-white flex items-center">
                        {email.priorityScore > 80 && <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />}
                        {email.sender}
                    </span>
                    <span className="text-xs text-slate-400">{email.time}</span>
                  </div>
                  <h4 className="text-base text-white truncate">{email.subject}</h4>
                  <p className="text-sm text-slate-400 truncate">{email.body}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {email.labels.map((label) => (
                      <Badge key={label} variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600">
                        <Tag className="h-3 w-3 mr-1" />{label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Category Bins for Visual Automation */}
      <div className="absolute bottom-16 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 z-30 flex justify-around items-center text-center text-xs">
        {Object.entries(categoryRefs).map(([category, ref]) => (
            <div key={category} ref={ref} className="flex flex-col items-center space-y-1 w-1/6">
                <div 
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 
                                        ${category === 'priority' ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400' :
                                          category === 'leads' ? 'border-red-500 bg-red-500/20 text-red-400' :
                                          category === 'support' ? 'border-blue-500 bg-blue-500/20 text-blue-400' :
                                          category === 'billing' ? 'border-green-500 bg-green-500/20 text-green-400' :
                                          category === 'spam' ? 'border-gray-500 bg-gray-500/20 text-gray-400' : 
                                          'border-slate-500 bg-slate-500/20 text-slate-400'}
                                    `}>
                    {category === 'priority' && <Star className="h-5 w-5 fill-current" />}
                    {category === 'leads' && <Mail className="h-5 w-5" />}
                    {category === 'support' && <MessageSquare className="h-5 w-5" />}
                    {category === 'billing' && <Tag className="h-5 w-5" />}
                    {category === 'spam' && <Trash className="h-5 w-5" />}
                    <AnimatePresence>
                        {processedEmailCounts[category as EmailCategory] > 0 && (
                            <motion.span
                                key={processedEmailCounts[category as EmailCategory]}
                                initial={{ scale: 0, opacity: 0, y: -10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0, opacity: 0, y: 10 }}
                                className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                            >
                                {processedEmailCounts[category as EmailCategory]}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
                <span className="text-slate-400 capitalize">{category}</span>
            </div>
        ))}

        <AnimatePresence>
            {animatedEmails.map(email => (
                <AnimatedEmail 
                    key={email.id} 
                    email={email} 
                    targetRef={categoryRefs[email.category as keyof typeof categoryRefs] || categoryRefs.spam} 
                    onComplete={handleAnimationComplete} 
                    onCountUpdate={handleCountUpdate}
                />
            ))}
        </AnimatePresence>
      </div>

      {/* Assign Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="bg-slate-800 text-white border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Assign Email</DialogTitle>
            <DialogDescription className="text-slate-400">
              Assign "{selectedEmailForAction?.subject}" to a team member.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => handleAssign(selectedEmailForAction!.id, 'Sales Team')}>Assign to Sales</Button>
            <Button onClick={() => handleAssign(selectedEmailForAction!.id, 'Support Team')}>Assign to Support</Button>
            <Button onClick={() => handleAssign(selectedEmailForAction!.id, 'Finance Team')}>Assign to Finance</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
