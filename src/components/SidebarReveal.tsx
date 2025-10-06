import { useEffect, useState, type ReactNode } from 'react';

interface SidebarRevealProps {
  children: ReactNode;
  /**
   * Side of the screen: 'left' or 'right'
   */
  side: 'left' | 'right';
  /**
   * Delay before animation starts in milliseconds
   */
  delay?: number;
}

export default function SidebarReveal({
  children,
  side,
  delay = 0,
}: SidebarRevealProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Trigger animation after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const translateX = side === 'left' ? '-40px' : '40px';

  return (
    <>
      {children}
      <style>{`
        aside[aria-label="${side === 'left' ? 'Social media links' : 'Email contact'}"] {
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateX(0)' : `translateX(${translateX})`};
          transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: ${isVisible ? 'auto' : 'none'};
        }

        /* Hide sidebar on mobile devices */
        @media (max-width: 768px) {
          aside[aria-label="${side === 'left' ? 'Social media links' : 'Email contact'}"] {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
