import { useState, useEffect, useCallback } from 'react';
import { socialLinks } from '../data/links';
import MobileChatView from './chatbot/MobileChatView';
import type { Message } from '../types/chatbot';
import {
  loadChatHistory,
  saveChatHistory,
  clearChatHistory,
  createMessage
} from '../utils/chatbotHelpers';
import { generateResponse } from '../utils/responseEngine';
import { chatbotConfig } from '../data/chatbotData';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatbotMode, setIsChatbotMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory();
    setMessages(history);
  }, []);

  // Save chat history whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(messages);
      // Notify badge update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('chatbotMessagesUpdated'));
      }
    }
  }, [messages]);

  // Prevent body scroll and add blur when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-mobile-menu-open', 'true');
    } else {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-mobile-menu-open');
      // Reset chatbot mode when menu closes
      setIsChatbotMode(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-mobile-menu-open');
    };
  }, [isOpen]);

  // Close menu when link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Open chatbot mode
  const handleOpenChatbot = () => {
    setIsChatbotMode(true);
    // Clear the badge/alert when opening
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatbot-last-opened', Date.now().toString());
      window.dispatchEvent(new CustomEvent('chatbotMessagesUpdated'));
    }
  };

  // Close chatbot and return to menu
  const handleCloseChatbot = () => {
    setIsChatbotMode(false);
  };

  // Send message handler
  const handleSendMessage = useCallback(async (content: string) => {
    const historyToSend = loadChatHistory();
    // Create user message
    const userMessage = createMessage('user', content);
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, chatbotConfig.typingDelay));

    // Try server LLM first
    let responseText = '';
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: content, history: historyToSend })
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data?.text === 'string' && data.text.trim()) {
          responseText = data.text.trim();
        }
      }
    } catch {
      // ignore and fallback
    }

    if (!responseText) {
      responseText = generateResponse(content);
    }

    // Simulate response delay
    await new Promise(resolve => setTimeout(resolve, chatbotConfig.responseDelay));

    // Create bot message
    const botMessage = createMessage('bot', responseText);
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  }, []);

  // Reset conversation
  const handleReset = useCallback(() => {
    clearChatHistory();
    const welcomeMessage = createMessage('bot', chatbotConfig.welcomeMessage);
    setMessages([welcomeMessage]);
    setIsTyping(false);
  }, []);

  return (
    <>
      {/* Hamburger Button - hide when chatbot mode is active */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        className={`md:hidden relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 ${
          isChatbotMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span
          className={`block w-7 h-[2.5px] bg-[var(--color-accent-primary)] transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-[10px]' : ''
          }`}
        ></span>
        <span
          className={`block w-7 h-[2.5px] bg-[var(--color-accent-primary)] transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-7 h-[2.5px] bg-[var(--color-accent-primary)] transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-[10px]' : ''
          }`}
        ></span>
      </button>

      {/* Mobile Menu Overlay - starts below header */}
      <div
        className={`mobile-menu-overlay fixed top-20 left-0 right-0 bottom-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
        ></div>

        {/* Menu Content */}
        <nav
          className={`absolute right-0 top-0 h-full w-[75vw] bg-[var(--color-bg-primary)] flex flex-col transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          {/* Chatbot Mode */}
          {isChatbotMode ? (
            <MobileChatView
              messages={messages}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
              onClose={handleCloseChatbot}
              onReset={handleReset}
            />
          ) : (
            <ul className="flex flex-col items-center gap-6 text-center w-full px-8 pt-8 h-full">
            <li className="w-full">
              <a
                href="#about"
                onClick={handleLinkClick}
                className="flex flex-col items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors py-2 group"
              >
                <span className="text-[var(--color-accent-primary)] text-sm font-mono">01.</span>
                <span className="text-xl tracking-wide font-light">About</span>
              </a>
            </li>
            <li className="w-full">
              <a
                href="#experience"
                onClick={handleLinkClick}
                className="flex flex-col items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors py-2 group"
              >
                <span className="text-[var(--color-accent-primary)] text-sm font-mono">02.</span>
                <span className="text-xl tracking-wide font-light">Experience</span>
              </a>
            </li>
            <li className="w-full">
              <a
                href="#projects"
                onClick={handleLinkClick}
                className="flex flex-col items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors py-2 group"
              >
                <span className="text-[var(--color-accent-primary)] text-sm font-mono">03.</span>
                <span className="text-xl tracking-wide font-light">Work</span>
              </a>
            </li>
            <li className="w-full">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="flex flex-col items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors py-2 group"
              >
                <span className="text-[var(--color-accent-primary)] text-sm font-mono">04.</span>
                <span className="text-xl tracking-wide font-light">Contact</span>
              </a>
            </li>
            <li className="w-full pt-4">
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="inline-block border-2 border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] px-12 py-4 rounded-md hover:bg-[var(--color-accent-primary)]/10 transition-all duration-200 text-base tracking-wide font-mono"
              >
                Resume
              </a>
            </li>
          </ul>
          )}
        </nav>
      </div>
    </>
  );
}
