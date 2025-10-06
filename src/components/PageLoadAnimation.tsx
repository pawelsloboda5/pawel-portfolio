import { useEffect, useState, type ReactNode } from 'react';

interface PageLoadAnimationProps {
  children: ReactNode;
  /**
   * Delay before animation starts in milliseconds
   */
  delay?: number;
  /**
   * Animation duration in milliseconds (default: 400)
   */
  duration?: number;
  /**
   * Animation variant
   */
  variant?: 'fade-in' | 'slide-down' | 'slide-up' | 'slide-left' | 'slide-right';
  /**
   * Distance to move in pixels (default: 20)
   */
  distance?: number;
}

export default function PageLoadAnimation({
  children,
  delay = 0,
  duration = 400,
  variant = 'fade-in',
  distance = 20,
}: PageLoadAnimationProps) {
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

  const getInitialTransform = () => {
    switch (variant) {
      case 'fade-in':
        return 'translate(0, 0)';
      case 'slide-down':
        return `translate(0, -${distance}px)`;
      case 'slide-up':
        return `translate(0, ${distance}px)`;
      case 'slide-left':
        return `translate(${distance}px, 0)`;
      case 'slide-right':
        return `translate(-${distance}px, 0)`;
      default:
        return 'translate(0, 0)';
    }
  };

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {children}
    </div>
  );
}
