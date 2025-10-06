/**
 * MobileChatView Component
 * Full-screen chatbot interface for mobile drawer
 */

import type { Message } from '../../types/chatbot';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import { chatbotConfig } from '../../data/chatbotData';

interface MobileChatViewProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
  onReset: () => void;
}

export default function MobileChatView({
  messages,
  isTyping,
  onSendMessage,
  onClose,
  onReset
}: MobileChatViewProps) {
  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <div className="
        flex items-center justify-between
        px-6 py-4
        border-b border-[var(--color-border)]
        bg-[var(--color-bg-secondary)]
      ">
        <div className="flex items-center gap-3">
          <img src="/robot.svg" alt="" width="24" height="24" className="opacity-90" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            AI Assistant
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Reset button */}
          <button
            onClick={onReset}
            className="
              p-2 rounded
              text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
              hover:bg-[var(--color-bg-tertiary)]
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]
            "
            aria-label="Reset conversation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
          </button>

          {/* Close button (X) */}
          <button
            onClick={onClose}
            className="
              p-2 rounded
              text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
              hover:bg-[var(--color-bg-tertiary)]
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]
            "
            aria-label="Close chatbot"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
        className="chatbot-messages flex-1"
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
  );
}
