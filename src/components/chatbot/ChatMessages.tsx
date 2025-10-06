/**
 * ChatMessages Component
 * Scrollable message list container with typing indicator
 */

import { useEffect, useRef } from 'react';
import type { Message } from '../../types/chatbot';
import MessageBubble from './MessageBubble';
import { scrollToBottom, isScrolledToBottom } from '../../utils/chatbotHelpers';

interface ChatMessagesProps {
  messages: Message[];
  isTyping?: boolean;
  className?: string;
}

export default function ChatMessages({
  messages,
  isTyping = false,
  className = ''
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wasScrolledToBottom = useRef(true);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!containerRef.current) return;

    // Check if user was already at bottom before new message
    const shouldAutoScroll = wasScrolledToBottom.current;

    if (shouldAutoScroll) {
      // Small delay to ensure DOM has updated
      requestAnimationFrame(() => {
        scrollToBottom(containerRef.current, true);
      });
    }
  }, [messages.length, isTyping]);

  // Track scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      wasScrolledToBottom.current = isScrolledToBottom(container, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Empty state
  if (messages.length === 0 && !isTyping) {
    return (
      <div
        ref={containerRef}
        className={`flex-1 overflow-y-auto px-4 py-4 ${className}`}
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-label="Chat messages"
      >
        <div className="flex items-center justify-center h-full text-center">
          <p className="text-[var(--color-text-muted)] text-sm">
            No messages yet. Start a conversation!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`flex-1 overflow-y-auto px-4 py-4 ${className}`}
      role="log"
      aria-live="polite"
      aria-atomic="false"
      aria-label="Chat messages"
    >
      {/* Messages */}
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          delay={index * 50} // Stagger animation by 50ms per message (only on mount)
          showTimestamp={true}
        />
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex justify-start mb-3">
          <div className="flex flex-col items-start max-w-[85%] sm:max-w-[75%]">
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-typing-dot" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-typing-dot" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-typing-dot" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}
