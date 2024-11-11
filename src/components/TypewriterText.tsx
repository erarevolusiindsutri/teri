import React from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  onComplete?: () => void;
  speed?: number;
  startDelay?: number;
}

export default function TypewriterText({ 
  text = '', 
  className = '', 
  onComplete,
  speed = 30,
  startDelay = 1000
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = React.useState('');
  const [isWaiting, setIsWaiting] = React.useState(true);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  
  React.useEffect(() => {
    setDisplayText('');
    setIsWaiting(true);
    let currentIndex = 0;
    
    // Initial delay before starting to type
    const startTimeout = setTimeout(() => {
      setIsWaiting(false);
      
      const typeNextCharacter = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          // Random variation in typing speed for more realism
          const variation = Math.random() * 30 - 15; // ±15ms variation
          timeoutRef.current = setTimeout(typeNextCharacter, speed + variation);
        } else {
          onComplete?.();
        }
      };

      timeoutRef.current = setTimeout(typeNextCharacter, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, startDelay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {(isWaiting || displayText.length < text.length) && (
        <span className="ml-0.5 inline-block w-0.5 h-4 bg-zinc-400 align-middle animate-pulse" />
      )}
    </span>
  );
}