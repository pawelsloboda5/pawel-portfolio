/**
 * Chatbot Helper Utilities
 * Shared utility functions for chatbot functionality
 */

import type { Message, MessageList } from '../types/chatbot';

/**
 * LocalStorage keys for chatbot data
 */
export const STORAGE_KEYS = {
  CHAT_HISTORY: 'chatbot-history',
  PULSE_SEEN: 'chatbot-pulse-seen',
  MINIMIZED: 'chatbot-minimized',
  LAST_OPENED: 'chatbot-last-opened'
} as const;

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new message object
 */
export function createMessage(
  role: 'user' | 'bot',
  content: string
): Message {
  return {
    id: generateMessageId(),
    role,
    content: content.trim(),
    timestamp: Date.now()
  };
}

/**
 * Save chat history to localStorage
 */
export function saveChatHistory(messages: MessageList): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save chat history:', error);
    // If quota exceeded, try to save last 20 messages only
    try {
      const recentMessages = messages.slice(-20);
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(recentMessages));
    } catch (retryError) {
      console.error('Failed to save even truncated history:', retryError);
    }
  }
}

/**
 * Load chat history from localStorage
 */
export function loadChatHistory(): MessageList {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
}

/**
 * Clear chat history from localStorage
 */
export function clearChatHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  } catch (error) {
    console.error('Failed to clear chat history:', error);
  }
}

/**
 * Check if pulse animation has been seen
 */
export function hasPulseBeenSeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.PULSE_SEEN) === 'true';
  } catch {
    return false;
  }
}

/**
 * Mark pulse animation as seen
 */
export function markPulseAsSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PULSE_SEEN, 'true');
  } catch (error) {
    console.error('Failed to mark pulse as seen:', error);
  }
}

/**
 * Get minimized state from localStorage
 */
export function getMinimizedState(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.MINIMIZED) === 'true';
  } catch {
    return false;
  }
}

/**
 * Save minimized state to localStorage
 */
export function setMinimizedState(minimized: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MINIMIZED, minimized.toString());
  } catch (error) {
    console.error('Failed to save minimized state:', error);
  }
}

/**
 * Validate message content
 * Returns error message if invalid, null if valid
 */
export function validateMessage(content: string, maxLength: number): string | null {
  const trimmed = content.trim();
  
  if (trimmed.length === 0) {
    return 'Message cannot be empty';
  }
  
  if (trimmed.length > maxLength) {
    return `Message too long (max ${maxLength} characters)`;
  }
  
  return null;
}

/**
 * Truncate message to max length with ellipsis
 */
export function truncateMessage(content: string, maxLength: number): string {
  if (content.length <= maxLength) {
    return content;
  }
  
  return content.substring(0, maxLength - 3) + '...';
}

/**
 * Format timestamp to relative time string
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 10) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  
  // For older messages, show actual date
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Scroll element to bottom smoothly
 */
export function scrollToBottom(element: HTMLElement | null, smooth = true): void {
  if (!element) return;
  
  const scrollOptions: ScrollToOptions = {
    top: element.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto'
  };
  
  element.scrollTo(scrollOptions);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is scrolled to bottom (with tolerance)
 */
export function isScrolledToBottom(element: HTMLElement, tolerance = 10): boolean {
  const { scrollTop, scrollHeight, clientHeight } = element;
  return scrollTop + clientHeight >= scrollHeight - tolerance;
}

/**
 * Normalize text for keyword matching (lowercase, remove special chars)
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Count words in a string
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

/**
 * Estimate reading time in seconds
 */
export function estimateReadingTime(text: string): number {
  const words = countWords(text);
  const wordsPerSecond = 3; // Average reading speed
  return Math.ceil(words / wordsPerSecond);
}

/**
 * Mark chatbot as opened (clear unread state)
 */
export function markChatbotAsOpened(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_OPENED, Date.now().toString());
  } catch (error) {
    console.error('Failed to mark chatbot as opened:', error);
  }
}

/**
 * Check if there are unread messages
 */
export function hasUnreadMessages(): boolean {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    if (!history) return false;
    
    const messages = JSON.parse(history);
    if (messages.length === 0) return false;
    
    const lastOpened = localStorage.getItem(STORAGE_KEYS.LAST_OPENED);
    if (!lastOpened) return messages.length > 0;
    
    const lastOpenedTime = parseInt(lastOpened, 10);
    const latestMessageTime = Math.max(...messages.map((m: Message) => m.timestamp));
    
    // Unread if latest message is newer than last opened time
    return latestMessageTime > lastOpenedTime;
  } catch {
    return false;
  }
}
