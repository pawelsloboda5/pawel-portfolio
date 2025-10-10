/**
 * ChatWindow Component
 * Desktop floating window container for chatbot
 */

import { useEffect, useRef } from 'react';
import type { Message } from '../../types/chatbot';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import ChatbotPulse from './ChatbotPulse';
import { chatbotConfig } from '../../data/chatbotData';
import { prefersReducedMotion } from '../../utils/chatbotHelpers';

interface ChatWindowProps {
  messages: Message[];
  isOpen: boolean;
  isMinimized: boolean;
  isTyping: boolean;
  /** Intro mode enables an extravagant entrance animation */
  intro?: boolean;
  onSendMessage: (message: string) => void;
  onMinimize: () => void;
  onReset: () => void;
  onClose: () => void;
}

export default function ChatWindow({
  messages,
  isOpen,
  isMinimized,
  isTyping,
  intro = false,
  onSendMessage,
  onMinimize,
  onReset,
  onClose
}: ChatWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen || isMinimized) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Small delay to prevent immediate closure
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMinimized, onClose]);

  // Handle Escape key to close
  useEffect(() => {
    if (!isOpen || isMinimized) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isMinimized, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  // Don't render minimized state - it's handled by sidebar
  if (isMinimized) {
    return null;
  }

  // Full window state
  const reducedMotion = prefersReducedMotion();
  const animationClass = reducedMotion ? '' : 'animate-slide-up';
  const introClasses = reducedMotion || !intro ? '' : 'chatbot-intro-pop chatbot-intro-spotlight';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        ref={windowRef}
        className={`
          w-[420px] max-h-[750px]
          bg-[var(--color-bg-secondary)]
          border border-[var(--color-border)]
          rounded-lg shadow-2xl
          flex flex-col
          overflow-hidden
          ${animationClass}
          ${introClasses}
        `}
        role="dialog"
        aria-labelledby="chatbot-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="
          flex items-center justify-between
          px-4 py-3
          border-b border-[var(--color-border)]
          bg-[var(--color-bg-tertiary)]
          ${!reducedMotion && intro ? 'chatbot-intro-shimmer' : ''}
        ">
          <div className="flex items-center gap-2">
            <img src="/robot.svg" alt="" width="24" height="24" className={`opacity-90 ${!reducedMotion && intro ? 'chatbot-intro-wave' : ''}`} />
            <h2 id="chatbot-title" className="text-base font-semibold text-[var(--color-text-primary)]">
              AI Assistant
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Reset button */}
            <button
              onClick={onReset}
              className="
                p-2 rounded hover:bg-[var(--color-bg-secondary)]
                text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]
              "
              aria-label="Reset conversation"
              title="Reset conversation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"></polyline>
                <polyline points="23 20 23 14 17 14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
            </button>

            {/* Minimize button */}
            <button
              onClick={onMinimize}
              className="
                p-2 rounded hover:bg-[var(--color-bg-secondary)]
                text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]
              "
              aria-label="Minimize chatbot"
              title="Minimize"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="
                p-2 rounded hover:bg-[var(--color-bg-secondary)]
                text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]
              "
              aria-label="Close chatbot"
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          className="chatbot-messages"
        />

        {/* Quick Actions (only when no user messages yet) */}
        {messages.filter(m => m.role === 'user').length === 0 && !isTyping && (
          <QuickActions
            onActionClick={onSendMessage}
            visible={true}
          />
        )}

        {/* Input */}
        <ChatInput
          onSendMessage={onSendMessage}
          maxLength={chatbotConfig.maxUserMessageLength}
          disabled={isTyping}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
}
