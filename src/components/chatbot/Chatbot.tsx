/**
 * Chatbot Component
 * Main orchestrator for chatbot state and interactions
 */

import { useState, useEffect, useCallback } from 'react';
import type { Message, ChatState } from '../../types/chatbot';
import ChatWindow from './ChatWindow';
import {
  loadChatHistory,
  saveChatHistory,
  clearChatHistory,
  createMessage,
  getMinimizedState,
  setMinimizedState,
  markPulseAsSeen,
  markChatbotAsOpened
} from '../../utils/chatbotHelpers';
import { generateResponse } from '../../utils/responseEngine';
import { chatbotConfig } from '../../data/chatbotData';

interface ChatbotProps {
  /** Variant: desktop or mobile */
  variant?: 'desktop' | 'mobile';
}

export default function Chatbot({ variant = 'desktop' }: ChatbotProps) {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isOpen: false,
    isMinimized: false,
    isTyping: false
  });

  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory();
    const minimized = getMinimizedState();
    
    setState(prev => ({
      ...prev,
      messages: history,
      isMinimized: minimized
    }));
  }, []);

  // Listen for external open events (from sidebar trigger)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOpenEvent = () => {
      setState(prev => ({ ...prev, isOpen: true, isMinimized: false }));
      markPulseAsSeen();
      markChatbotAsOpened(); // Mark messages as read
    };

    window.addEventListener('openChatbot', handleOpenEvent);
    return () => window.removeEventListener('openChatbot', handleOpenEvent);
  }, []);

  // Save chat history whenever messages change
  useEffect(() => {
    if (state.messages.length > 0) {
      saveChatHistory(state.messages);
      // Notify other components (like badge) that messages updated
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('chatbotMessagesUpdated'));
      }
    }
  }, [state.messages]);

  // Save minimized state and notify layout
  useEffect(() => {
    setMinimizedState(state.isMinimized);
    
    // Notify layout about chatbot state changes
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('chatbotStateChange', {
        detail: { isOpen: state.isOpen, isMinimized: state.isMinimized }
      }));
    }
  }, [state.isMinimized, state.isOpen]);

  /**
   * Open chatbot
   */
  const handleOpen = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true, isMinimized: false }));
    markPulseAsSeen(); // Mark pulse as seen when opening
    markChatbotAsOpened(); // Mark messages as read
  }, []);

  /**
   * Close chatbot
   */
  const handleClose = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  /**
   * Toggle minimize state
   */
  const handleMinimize = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  /**
   * Send user message and generate bot response
   */
  const handleSendMessage = useCallback(async (content: string) => {
    // Create user message
    const userMessage = createMessage('user', content);
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true
    }));

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, chatbotConfig.typingDelay));

    // Generate response
    const responseText = generateResponse(content);

    // Simulate response delay
    await new Promise(resolve => setTimeout(resolve, chatbotConfig.responseDelay));

    // Create bot message
    const botMessage = createMessage('bot', responseText);

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      isTyping: false
    }));
  }, []);

  /**
   * Reset conversation
   */
  const handleReset = useCallback(() => {
    clearChatHistory();
    
    // Add welcome message
    const welcomeMessage = createMessage('bot', chatbotConfig.welcomeMessage);
    
    setState(prev => ({
      ...prev,
      messages: [welcomeMessage],
      isTyping: false
    }));
  }, []);

  // Desktop variant (only render on desktop)
  if (variant === 'desktop') {
    return (
      <div className="hidden md:block">
        <ChatWindow
          messages={state.messages}
          isOpen={state.isOpen}
          isMinimized={state.isMinimized}
          isTyping={state.isTyping}
          onSendMessage={handleSendMessage}
          onMinimize={handleMinimize}
          onReset={handleReset}
          onClose={handleClose}
        />
      </div>
    );
  }

  // Mobile variant handled separately in MobileMenu
  return null;
}
