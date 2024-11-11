import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ 
  value, 
  onChange, 
  onSubmit, 
  disabled,
  placeholder = "Type here..." 
}: ChatInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={onSubmit} 
      className="w-full max-w-[45ch] mx-auto px-4"
    >
      <div className="flex items-start gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          autoFocus
          className="w-full bg-transparent outline-none py-2 text-lg text-left disabled:opacity-50 placeholder:text-zinc-600 resize-none overflow-hidden"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="text-zinc-400 hover:text-zinc-200 disabled:opacity-50 disabled:hover:text-zinc-400 mt-2"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}