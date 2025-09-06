'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, Bell, ChevronLeft, Mail, Search, Send, Settings, PlusCircle, Trash, Tag, Star, Clock, User, MessageSquare, BookText, BarChart, X, CheckCircle, FolderOpen, Snooze, Filter, MoreVertical, MailX, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getDictionary } from '@/lib/i18n';
import { Email, EmailCategory, Locale, EMAIL_CATEGORIES } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { gsap } from 'gsap'; // Added gsap import

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
                x: targetRect.left - emailRect.left + (targetRect.width / 2) - (emailRect.width / 2) + Math.random() * 20 - 10, 
                y: targetRect.top - emailRect.top + (targetRect.height / 2) - (emailRect.height / 2) + Math.random() * 20 - 10, 
                opacity: 0.1 
            });

            const timer = setTimeout(() => {
                onComplete(email.id);
                onCountUpdate(email.category);
            }, 1000); 
            return () => clearTimeout(timer);
        }
    }, [email.id, targetRef, onComplete, onCountUpdate, email.category]);

    return (
        <motion.div
            ref={emailRef}
            className="absolute z-50 p-2 bg-gradient-to-r from-red-600 to-blue-600 rounded-md text-xs text-white shadow-lg whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }} 
            animate={{
                x: position.x,
                y: position.y,
                opacity: position.opacity,
                scale: 0.3,
                rotate: 0,
                filter: ['blur(0px) brightness(1)', 'blur(2px) brightness(1.5)', 'blur(0px) brightness(1)'],
                transition: {
                    x: { duration: 1.0, ease: [0.4, 0, 0.2, 1] }, 
                    y: { duration: 1.0, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.8, ease: "easeIn" },
                    scale: { duration: 1.0, ease: "easeOut" },
                    rotate: { duration: 0.9, ease: "easeOut" },
                    filter: { duration: 0.6, repeat: 1, repeatType: "reverse", ease: "easeInOut" }
                }
            }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }} 
        >
            <Tag className="h-3 w-3 inline-block mr-1" /> {email.subject}
            <motion.div
                initial={{ width: '0%', opacity: 0 }}
                animate={{ width: '100%', opacity: 0.5 }}
                exit={{ width: '0%', opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent blur-sm"
            />
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
  });
  
  const categoryRefs = {
    'leads': useRef<HTMLDivElement>(null),
    'support': useRef<HTMLDivElement>(null),
    'marketing': useRef<HTMLDivElement>(null),
    'billing': useRef<HTMLDivElement>(null),
    'priority': useRef<HTMLDivElement>(null),
    'spam': useRef<HTMLDivElement>(null),
  };

  const dict = getDictionary('en' as Locale); 
  const { toast } = useToast();

  const swipeThreshold = 100; 
  const currentX = useRef(0);
  const swipeActionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const swipeStates = useRef<{ [key: string]: { showActions: boolean } }>({});
  
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const startX = useRef(0);

  const applyFilters = useCallback(() => {
    let updatedEmails = emails;

    if (searchTerm) {
      updatedEmails = updatedEmails.filter(
        (email) =>
          email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.sender.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.length > 0) {
      updatedEmails = updatedEmails.filter((email) =>
        filters.some((filter) => email.category === filter || email.labels.includes(filter as any))
      );
    }

    setFilteredEmails(updatedEmails);
  }, [emails, searchTerm, filters]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, emails, applyFilters]);

  useEffect(() => {
    let automationTimer: NodeJS.Timeout;
    let classificationDelayTimer: NodeJS.Timeout;
    let sparkleEffectTimer: NodeJS.Timeout; 

    if (isAutomationActive && !processingEmailId) {
        const unprocessedEmails = emails.filter(e => !e.read && !animatedEmails.some(ae => ae.id === e.id));

        if (unprocessedEmails.length > 0) {
            const emailToProcess = unprocessedEmails[0];
            setProcessingEmailId(emailToProcess.id);

            sparkleEffectTimer = setTimeout(() => {
            }, 200); 

            automationTimer = setTimeout(() => {
                classificationDelayTimer = setTimeout(async () => {
                    await new Promise(resolve => setTimeout(resolve, 800)); 

                    const simulatedCategory: EmailCategory = (emailToProcess.category === 'leads' && emailToProcess.priorityScore > 85) ? 'priority' : emailToProcess.category;
                    const targetRef = categoryRefs[simulatedCategory];

                    if (targetRef && targetRef.current) {
                        setAnimatedEmails(prev => [...prev, { ...emailToProcess, category: simulatedCategory }]);
                    }

                    setEmails(prev => 
                        prev.map(e => 
                            e.id === emailToProcess.id ? { ...e, read: true, category: simulatedCategory } : e
                        )
                    );
                    setProcessingEmailId(null); 
                }, 1000); 
            }, 500); 
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
            }, 4000); 
        }
    }

    return () => {
        clearTimeout(automationTimer);
        clearTimeout(classificationDelayTimer);
        clearTimeout(sparkleEffectTimer); 
    };
  }, [isAutomationActive, emails, processingEmailId, animatedEmails, categoryRefs]);

  const handleAnimationComplete = (id: string) => {
    setAnimatedEmails(prev => prev.filter(email => email.id !== id));
  };

  const handleCountUpdate = (category: EmailCategory) => {
    setProcessedEmailCounts(prev => ({
      ...prev,
      [category]: (prev[category] || 0) + 1
    }));
    const categoryBin = categoryRefs[category as keyof typeof categoryRefs].current;
    if (categoryBin) {
        gsap.to(categoryBin, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.out" });
    }
  };

  const handleAssign = (id: string, team: string) => {
    setEmails(prev => prev.map(email => email.id === id ? { ...email, assignedTo: team } : email));
    toast({
      title: dict.inbox.toastAssignedTitle,
      description: dict.inbox.toastAssignedDescription(team),
    });
    setShowAssignDialog(false);
  };

  const handleArchive = (id: string) => {
    setEmails(prev => prev.map(email => email.id === id ? { ...email, archived: true } : email));
    toast({
      title: dict.inbox.toastArchivedTitle,
      description: dict.inbox.toastArchivedDescription,
    });
  };

  const handleSnooze = (id: string) => {
    setEmails(prev => prev.map(email => email.id === id ? { ...email, snoozed: true } : email));
    toast({
      title: dict.inbox.toastSnoozedTitle,
      description: dict.inbox.toastSnoozedDescription,
    });
  };

  const handleFilterToggle = (category: EmailCategory) => {
    setFilters((prev) =>
      prev.includes(category) ? prev.filter((f) => f !== category) : [...prev, category]
    );
  };

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    if (isAutomationActive) return;
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current; 
    const item = itemRefs.current[id];
    if (item) item.style.transition = 'none'; 
  };

  const handleTouchMove = (e: React.TouchEvent, id: string) => {
    if (isAutomationActive) return;
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    const item = itemRefs.current[id];

    if (item) {
      item.style.transform = `translateX(${diff}px)`;
      const showActions = Math.abs(diff) > 50; 
      if (swipeActionRefs.current[id]) {
          swipeActionRefs.current[id]!.style.opacity = showActions ? '1' : '0';
          swipeActionRefs.current[id]!.style.transform = `translateX(${showActions ? '0px' : '20px'})`;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, id: string) => {
    if (isAutomationActive) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;
    const item = itemRefs.current[id];

    if (item) item.style.transition = 'transform 0.3s ease-out'; 

    if (diff > swipeThreshold) {
      handleArchive(id);
    } else if (diff < -swipeThreshold) {
      handleSnooze(id);
    } else {
      if (item) item.style.transform = 'translateX(0px)';
    }
    if (swipeActionRefs.current[id]) {
        swipeActionRefs.current[id]!.style.opacity = '0';
        swipeActionRefs.current[id]!.style.transform = 'translateX(20px)';
    }
  };

  const handlePullToRefresh = async () => {
    if (isAutomationActive) return;
    toast({
      title: dict.inbox.toastRefreshTitle,
            description: dict.inbox.toastRefreshDescription,
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEmails(mockEmails.map(email => ({ ...email, read: false, archived: false, snoozed: false })));
    setFilters([]);
    setSearchTerm('');
    toast({
      title: dict.inbox.toastRefreshedTitle,
      description: dict.inbox.toastRefreshedDescription,
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 relative">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-white">Inbox</h2>
        <div className="flex items-center space-x-2">
          {!isAutomationActive && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Toggle filters"
                className="text-slate-400 hover:text-white"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
          <Button variant="ghost" size="sm" aria-label="More options" className="text-slate-400 hover:text-white">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {!isAutomationActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: showFilters ? 1 : 0, height: showFilters ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="p-4 border-b border-slate-700">
            <Input
              type="text"
              placeholder={dict.inbox.searchPlaceholder}
              className="w-full bg-slate-800 border-slate-700 text-white placeholder-slate-500 mb-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {EMAIL_CATEGORIES.map((category) => (
                <Badge
                  key={category}
                  variant={filters.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    filters.includes(category)
                      ? "bg-red-600 text-white border-red-700"
                      : "bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600"
                  }`}
                  onClick={() => handleFilterToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex-1 overflow-y-auto custom-scrollbar relative pb-28" onTouchEnd={handlePullToRefresh}>
        <AnimatePresence>
          {filteredEmails.length === 0 && !processingEmailId && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-slate-400 mt-12"
            >
              <MailX className="h-12 w-12 mx-auto mb-4" />
              <p>No emails to display.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout className="divide-y divide-slate-800">
          {filteredEmails.map((email) => (
            <AnimatePresence key={email.id}>
              {!email.read && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: processingEmailId === email.id ? -100 : 0 }} 
                  transition={{ duration: 0.3 }}
                  className={`relative ${processingEmailId === email.id ? 'opacity-50 blur-sm pointer-events-none' : ''}`}
                  style={{ touchAction: 'pan-y' }} 
                  onPanEnd={!isAutomationActive ? (e, info) => {
                      const item = itemRefs.current[email.id];
                      if (item) item.style.transition = 'transform 0.3s ease-out'; 

                      const diff = info.offset.x;

                      if (diff > swipeThreshold) {
                          handleArchive(email.id);
                      } else if (diff < -swipeThreshold) {
                          handleSnooze(email.id);
                      } else {
                          if (item) item.style.transform = 'translateX(0px)';
                      }
                      if (swipeActionRefs.current[email.id]) {
                          swipeActionRefs.current[email.id]!.style.opacity = '0';
                          swipeActionRefs.current[email.id]!.style.transform = 'translateX(20px)';
                      }
                  } : undefined}
                  onPan={(e, info) => {
                    if (isAutomationActive) return;
                    const item = itemRefs.current[email.id];
                    if (item) {
                        item.style.transform = `translateX(${info.offset.x}px)`;
                        const showActions = Math.abs(info.offset.x) > 50; 
                        if (swipeActionRefs.current[email.id]) {
                            swipeActionRefs.current[email.id]!.style.opacity = showActions ? '1' : '0';
                            swipeActionRefs.current[email.id]!.style.transform = `translateX(${showActions ? '0px' : '20px'})`;
                        }
                    }
                  }}
                  onPanStart={() => {
                    if (isAutomationActive) return;
                    const item = itemRefs.current[email.id];
                    if (item) item.style.transition = 'none'; 
                  }}
                >
                  <div
                    ref={(el) => (itemRefs.current[email.id] = el)}
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

                  {processingEmailId === email.id && (
                      <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-blue-500"
                      />
                  )}

                  {!isAutomationActive && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <motion.div
                        ref={(el) => (swipeActionRefs.current[email.id] = el)}
                        className="flex space-x-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 0, x: 20 }} 
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchive(email.id);
                          }}
                          aria-label="Archive email"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSnooze(email.id);
                          }}
                          aria-label="Snooze email"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-slate-600 hover:bg-slate-700 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEmailForAction(email);
                            setShowAssignDialog(true);
                          }}
                          aria-label="Assign email"
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </motion.div>

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

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 z-30 flex justify-around items-center text-center text-xs">
        {EMAIL_CATEGORIES.map((category) => (
            <motion.div
                key={category}
                ref={categoryRefs[category]}
                className="flex flex-col items-center space-y-1 w-1/6 p-1"
                initial={{ opacity: 0.7, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div 
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-lg 
                                ${category === 'priority' ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400' :
                                  category === 'leads' ? 'border-red-500 bg-red-500/20 text-red-400' :
                                  category === 'support' ? 'border-blue-500 bg-blue-500/20 text-blue-400' :
                                  category === 'billing' ? 'border-green-500 bg-green-500/20 text-green-400' :
                                  category === 'spam' ? 'border-gray-500 bg-gray-500/20 text-gray-400' : 
                                  'border-slate-500 bg-slate-500/20 text-slate-400'}
                            `}>
                    {category === 'priority' && <Star className="h-6 w-6 fill-current" />}
                    {category === 'leads' && <Mail className="h-6 w-6" />}
                    {category === 'support' && <MessageSquare className="h-6 w-6" />}
                    {category === 'billing' && <Tag className="h-6 w-6" />}
                    {category === 'spam' && <Trash className="h-6 w-6" />}
                    <AnimatePresence>
                        {processedEmailCounts[category as EmailCategory] > 0 && (
                            <motion.span
                                key={processedEmailCounts[category as EmailCategory]}
                                initial={{ scale: 0, opacity: 0, y: -10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0, opacity: 0, y: 10 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-slate-800"
                            >
                                {processedEmailCounts[category as EmailCategory]}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
                <span className="text-slate-400 capitalize text-xs mt-1">{category}</span>
            </motion.div>
        ))}
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
