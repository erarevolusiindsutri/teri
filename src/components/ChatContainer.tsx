import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getAIResponse } from '../lib/openai';
import { config } from '../config/env';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'teri_chat_history';

export default function ChatContainer() {
  const [visibleMessages, setVisibleMessages] = React.useState<ChatMessageType[]>([
    {
      type: 'bot',
      content: config.openai.isConfigured 
        ? "Halo.."
        : "Hmm, sebentar ya... ada yang belum beres nih, kayaknya aku masih belum sepenuhnya nyala. Mungkin butuh sedikit waktu lagi.. Makasih udah sabar yaa! 😊",
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [showInput, setShowInput] = React.useState(false);
  const [messageKey, setMessageKey] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Load hidden history from localStorage
  const getHiddenHistory = React.useCallback((): ChatMessageType[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  // Save history to localStorage
  const saveHistory = React.useCallback((messages: ChatMessageType[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }, []);

  const scrollToBottom = () => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, isTyping]);

  const handleTypingComplete = React.useCallback(() => {
    setIsTyping(false);
    setShowInput(true);
    scrollToBottom();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setShowInput(false);
    setIsTyping(true);
    setIsError(false);
    setMessageKey(prev => prev + 1);

    // Get full context including hidden history
    const fullHistory = [...getHiddenHistory(), { type: 'user' as const, content: userMessage }];
    
    // Update visible messages
    setVisibleMessages([
      { type: 'user' as const, content: userMessage }
    ]);

    try {
      if (!config.openai.isConfigured) {
        throw new Error('OpenAI API key is not configured');
      }

      const aiResponse = await getAIResponse(fullHistory);
      
      if (aiResponse) {
        const newHistory = [...fullHistory, { type: 'bot' as const, content: aiResponse }];
        saveHistory(newHistory);
        setVisibleMessages(prev => [...prev, { type: 'bot' as const, content: aiResponse }]);
      }
    } catch (error) {
      setIsError(true);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setVisibleMessages(prev => [...prev, { type: 'bot' as const, content: errorMessage }]);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        <div className="min-h-full flex flex-col items-center justify-center py-8">
          <div className="w-full max-w-2xl px-4 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {visibleMessages.map((message, index) => (
                  <div key={`${messageKey}-${index}`} className="space-y-4">
                    <ChatMessage
                      {...message}
                      onComplete={
                        index === visibleMessages.length - 1 && message.type === 'bot'
                          ? handleTypingComplete
                          : undefined
                      }
                      isError={message.type === 'bot' && index === visibleMessages.length - 1 && isError}
                      startDelay={index === 0 && messageKey === 0 ? 1000 : 0}
                    />
                    {index === visibleMessages.length - 1 && showInput && !isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChatInput
                          value={input}
                          onChange={setInput}
                          onSubmit={handleSend}
                          disabled={!config.openai.isConfigured}
                          placeholder="Ketik pesan..."
                        />
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}