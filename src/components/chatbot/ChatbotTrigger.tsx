/**
 * ChatbotTrigger Component
 * Sidebar button that triggers chatbot to open
 */

import ChatbotPulse from './ChatbotPulse';

interface ChatbotTriggerProps {
  /** Whether to show pulse animation */
  showPulse?: boolean;
}

export default function ChatbotTrigger({ showPulse = true }: ChatbotTriggerProps) {
  const handleClick = () => {
    // Dispatch custom event that Chatbot component listens for
    const event = new CustomEvent('openChatbot');
    window.dispatchEvent(event);
  };

  const button = (
    <button 
      onClick={handleClick}
      aria-label="Open AI Chatbot"
      className="text-[var(--color-accent-primary)] hover:text-[var(--color-accent-secondary)] hover:-translate-y-1 hover:scale-110 transition-all duration-200 cursor-pointer group"
    >
      <img src="/robot.svg" alt="AI Chatbot" width="28" height="28" className="opacity-90 group-hover:opacity-100 transition-opacity" />
    </button>
  );

  // Wrap with pulse animation if enabled
  if (showPulse) {
    return (
      <ChatbotPulse>
        {button}
      </ChatbotPulse>
    );
  }

  return button;
}
