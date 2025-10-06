/**
 * Chatbot Type Definitions
 * Types for AI chatbot state, messages, and interactions
 */

export type MessageRole = 'user' | 'bot';

export interface Message {
  /** Unique message identifier */
  id: string;
  
  /** Message sender role */
  role: MessageRole;
  
  /** Message content text */
  content: string;
  
  /** Timestamp when message was created */
  timestamp: number;
}

export interface QuickAction {
  /** Unique action identifier */
  id: string;
  
  /** Display label for the action button */
  label: string;
  
  /** Icon name or emoji for visual indicator */
  icon: string;
  
  /** The prompt text that gets sent when action is clicked */
  prompt: string;
}

export interface ChatState {
  /** Array of all messages in conversation */
  messages: Message[];
  
  /** Whether chatbot window/drawer is open */
  isOpen: boolean;
  
  /** Whether chatbot is minimized (desktop only) */
  isMinimized: boolean;
  
  /** Whether bot is currently generating a response */
  isTyping: boolean;
}

export interface KeywordPattern {
  /** Array of keywords to match against */
  keywords: string[];
  
  /** Priority level (higher = checked first) */
  priority: number;
  
  /** Response text or function to generate response */
  response: string | ((userMessage: string) => string);
  
  /** Optional category for grouping patterns */
  category?: 'projects' | 'experience' | 'skills' | 'contact' | 'general';
}

export interface ChatbotConfig {
  /** Maximum characters allowed in user input */
  maxUserMessageLength: number;
  
  /** Maximum characters allowed in bot responses */
  maxBotMessageLength: number;
  
  /** Delay in ms before showing typing indicator */
  typingDelay: number;
  
  /** Delay in ms before showing bot response */
  responseDelay: number;
  
  /** Welcome message shown on first open */
  welcomeMessage: string;
}

export type MessageList = Message[];
export type QuickActionList = QuickAction[];
export type KeywordPatternList = KeywordPattern[];
