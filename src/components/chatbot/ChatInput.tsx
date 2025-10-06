/**
 * ChatInput Component
 * Message input field with validation and character counter
 */

import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { validateMessage } from '../../utils/chatbotHelpers';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  maxLength: number;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSendMessage,
  maxLength,
  disabled = false,
  placeholder = 'Type your message...'
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate new height (max 4 lines ~96px)
    const newHeight = Math.min(textarea.scrollHeight, 96);
    textarea.style.height = `${newHeight}px`;
  }, [message]);

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    
    // Validate message
    const error = validateMessage(trimmedMessage, maxLength);
    if (error) {
      console.warn('Message validation failed:', error);
      return;
    }

    // Send message
    onSendMessage(trimmedMessage);
    
    // Clear input
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send, Shift+Enter for new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isValid = message.trim().length > 0 && message.trim().length <= maxLength;
  const characterCount = message.length;
  const isOverLimit = characterCount > maxLength;

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
    >
      <div className="flex flex-col gap-2">
        {/* Input container */}
        <div
          className={`
            flex items-end gap-2 p-3 rounded-lg border transition-colors
            focus-within:border-[var(--color-accent-primary)]
            ${isFocused 
              ? 'border-[var(--color-accent-primary)] bg-[var(--color-bg-primary)]' 
              : 'border-[var(--color-border)] bg-[var(--color-bg-primary)]'
            }
            ${isOverLimit ? 'border-red-500' : ''}
          `}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder={placeholder}
            aria-label="Message input"
            className="
              flex-1 bg-transparent text-[var(--color-text-primary)] text-sm
              placeholder:text-[var(--color-text-muted)]
              resize-none outline-none focus:outline-none focus-visible:outline-none
              min-h-[24px] max-h-[96px]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            rows={1}
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={!isValid || disabled}
            aria-label="Send message"
            className={`
              flex items-center justify-center
              w-8 h-8 rounded-md flex-shrink-0
              transition-all duration-200
              ${isValid && !disabled
                ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-secondary)] hover:scale-105 cursor-pointer'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] cursor-not-allowed opacity-50'
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>

        {/* Character counter */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            {!disabled && 'Press Enter to send, Shift+Enter for new line'}
          </span>
          <span
            className={`
              text-xs font-mono
              ${isOverLimit 
                ? 'text-red-500 font-semibold' 
                : characterCount > maxLength * 0.8 
                  ? 'text-[var(--color-accent-primary)]' 
                  : 'text-[var(--color-text-muted)]'
              }
            `}
          >
            {characterCount} / {maxLength}
          </span>
        </div>
      </div>
    </form>
  );
}
