import React from 'react';
import { twMerge } from 'tailwind-merge';
import TypewriterText from './TypewriterText';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  type: 'bot' | 'user';
  content: string;
  onComplete?: () => void;
  isError?: boolean;
  startDelay?: number;
}

export default function ChatMessage({ 
  type, 
  content, 
  onComplete, 
  isError,
  startDelay = 0
}: ChatMessageProps) {
  const messageClasses = twMerge(
    'w-full max-w-[45ch] mx-auto px-4',
    type === 'user' && 'opacity-75 bg-zinc-900/50 rounded-2xl backdrop-blur-sm'
  );

  const textClasses = twMerge(
    'text-lg leading-relaxed',
    type === 'bot' ? 'text-zinc-100' : 'text-zinc-300',
    isError && 'text-red-400'
  );

  return (
    <motion.div 
      className={messageClasses}
      layout
    >
      {type === 'bot' ? (
        <TypewriterText
          text={content}
          onComplete={onComplete}
          className={textClasses}
          speed={40}
          startDelay={startDelay}
        />
      ) : (
        <p className={textClasses}>{content}</p>
      )}
    </motion.div>
  );
}