/**
 * MessageBubble Component
 * Individual message display with animations and styling
 */

import { useEffect, useState } from 'react';
import type { Message } from '../../types/chatbot';
import { formatRelativeTime, prefersReducedMotion } from '../../utils/chatbotHelpers';

interface MessageBubbleProps {
  message: Message;
  /** Delay before animation starts (for stagger effect) */
  delay?: number;
  /** Show timestamp below message */
  showTimestamp?: boolean;
}

export default function MessageBubble({
  message,
  delay = 0,
  showTimestamp = true
}: MessageBubbleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const isUser = message.role === 'user';

  // Trigger animation after delay
  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Update timestamps every 30 seconds
  useEffect(() => {
    if (!showTimestamp) return;

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, [showTimestamp]);

  // Convert URLs in bot messages to clickable links
  const renderContent = (content: string) => {
    if (isUser) return content;

    // Simple URL detection and linking
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-primary)] hover:text-[var(--color-accent-secondary)] underline transition-colors"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 transition-all duration-200`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 200ms ease-out, transform 200ms ease-out'
      }}
    >
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[75%]`}>
        {/* Message bubble */}
        <div
          className={`
            px-4 py-3 rounded-2xl whitespace-pre-wrap break-words
            ${isUser 
              ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] rounded-br-sm' 
              : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-bl-sm border border-[var(--color-border)]'
            }
          `}
        >
          <p className="text-sm leading-relaxed m-0">
            {renderContent(message.content)}
          </p>
        </div>

        {/* Timestamp */}
        {showTimestamp && (
          <span className="text-xs text-[var(--color-text-muted)] mt-1 px-2 font-mono">
            {formatRelativeTime(message.timestamp)}
          </span>
        )}
      </div>
    </div>
  );
}
