/**
 * ChatbotPulse Component
 * Pulse animation wrapper for robot icon when user reaches Experience section
 */

import { useEffect, useState, useRef, type ReactNode } from 'react';
import { hasPulseBeenSeen, markPulseAsSeen, prefersReducedMotion } from '../../utils/chatbotHelpers';

interface ChatbotPulseProps {
  children: ReactNode;
  /** Target section to observe (default: #experience) */
  targetSection?: string;
  /** Number of pulse cycles (default: 4) */
  pulseCount?: number;
  /** Whether chatbot is open (stops pulsing when open) */
  chatbotOpen?: boolean;
}

export default function ChatbotPulse({
  children,
  targetSection = '#experience',
  pulseCount = 4,
  chatbotOpen = false
}: ChatbotPulseProps) {
  const [shouldPulse, setShouldPulse] = useState(false);
  const pulseCountRef = useRef(0);

  useEffect(() => {
    // Check if pulse has already been seen
    if (hasPulseBeenSeen() || prefersReducedMotion()) {
      return;
    }

    // Get target section element
    const target = document.querySelector(targetSection);
    if (!target) {
      console.warn(`ChatbotPulse: Target section "${targetSection}" not found`);
      return;
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPulseBeenSeen()) {
            // Start pulsing when section comes into view
            setShouldPulse(true);
            
            // Mark as seen and stop observing
            markPulseAsSeen();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px'
      }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetSection]);

  // Stop pulsing after N cycles or when chatbot opens
  useEffect(() => {
    if (!shouldPulse) return;

    // Stop pulsing when chatbot opens
    if (chatbotOpen) {
      setShouldPulse(false);
      markPulseAsSeen();
      return;
    }

    // Count pulse cycles (each cycle is ~1.5s)
    const timer = setInterval(() => {
      pulseCountRef.current += 1;
      
      if (pulseCountRef.current >= pulseCount) {
        setShouldPulse(false);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [shouldPulse, pulseCount, chatbotOpen]);

  return (
    <div className={`chatbot-pulse-wrapper ${shouldPulse ? 'pulsing' : ''}`}>
      {children}
      
      {/* Pulse animation styles */}
      <style>{`
        .chatbot-pulse-wrapper.pulsing {
          animation: chatbot-pulse 1.5s ease-in-out;
          animation-iteration-count: ${pulseCount};
        }

        @keyframes chatbot-pulse {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 0 transparent);
          }
          50% {
            transform: scale(1.1);
            filter: drop-shadow(0 0 12px var(--color-accent-glow));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0 transparent);
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .chatbot-pulse-wrapper.pulsing {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
