/**
 * QuickActions Component
 * Grid of predefined action buttons shown when chat is empty
 */

import { useState, useEffect } from 'react';
import type { QuickAction } from '../../types/chatbot';
import { quickActions } from '../../data/chatbotData';
import { prefersReducedMotion } from '../../utils/chatbotHelpers';

interface QuickActionsProps {
  onActionClick: (prompt: string) => void;
  /** Whether to show actions (typically when no messages) */
  visible?: boolean;
}

export default function QuickActions({
  onActionClick,
  visible = true
}: QuickActionsProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Fade in animation
  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    
    if (reducedMotion || !visible) {
      setIsVisible(visible);
      return;
    }

    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`px-4 pb-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="mb-4">
        <p className="text-sm text-[var(--color-text-secondary)] text-center">
          Quick actions to get started:
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <QuickActionButton
            key={action.id}
            action={action}
            onClick={() => onActionClick(action.prompt)}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Individual Quick Action Button
 */
interface QuickActionButtonProps {
  action: QuickAction;
  onClick: () => void;
  delay?: number;
}

function QuickActionButton({ action, onClick, delay = 0 }: QuickActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <button
      onClick={onClick}
      className="
        group relative
        flex flex-col items-center justify-center
        p-4 rounded-lg
        bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]
        hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/5
        transition-all duration-200
        hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-secondary)]
      "
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out'
      }}
      aria-label={action.label}
    >
      {/* Icon */}
      <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
        {action.icon}
      </span>

      {/* Label */}
      <span className="text-sm text-[var(--color-text-primary)] font-medium text-center leading-tight group-hover:text-[var(--color-accent-primary)] transition-colors">
        {action.label}
      </span>

      {/* Hover glow effect */}
      <div className="
        absolute inset-0 rounded-lg
        opacity-0 group-hover:opacity-100
        bg-gradient-to-br from-[var(--color-accent-primary)]/10 to-transparent
        transition-opacity duration-200
        pointer-events-none
      "></div>
    </button>
  );
}
