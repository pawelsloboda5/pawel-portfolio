import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  /**
   * Animation variant: 
   * - 'fade': Simple fade in
   * - 'slide-up': Fade in with slight upward movement (default)
   * - 'slide-down': Fade in with slight downward movement
   * - 'slide-left': Fade in from left
   * - 'slide-right': Fade in from right
   * - 'scale': Scale up with fade
   * - 'blur-in': Blur to clear with upward movement
   * - 'rotate-in': Rotate with scale from slight angle
   * - 'zoom-rotate': Zoom and rotate entrance
   */
  variant?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'blur-in' | 'rotate-in' | 'zoom-rotate';
  /**
   * Animation duration in milliseconds (default: 600)
   */
  duration?: number;
  /**
   * Delay before animation starts in milliseconds (default: 0)
   */
  delay?: number;
  /**
   * Threshold for when to trigger (0-1, default: 0.1)
   * 0.1 = trigger when 10% of element is visible
   */
  threshold?: number;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Distance to move in pixels for slide animations (default: 30)
   */
  distance?: number;
  /**
   * Enable once mode - animation triggers only once (default: true)
   */
  once?: boolean;
}

export default function ScrollReveal({
  children,
  variant = 'slide-up',
  duration = 600,
  delay = 0,
  threshold = 0.1,
  className = '',
  distance = 30,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If reduced motion is preferred, show immediately without animation
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger animation when element intersects viewport
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // If once mode, stop observing after first trigger
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once && !entry.isIntersecting) {
            // If not once mode, reset when leaving viewport
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, isVisible, once]);

  // Get transform values based on variant
  const getInitialTransform = () => {
    switch (variant) {
      case 'fade':
        return 'translate(0, 0) scale(1)';
      case 'slide-up':
        return `translate(0, ${distance}px) scale(1)`;
      case 'slide-down':
        return `translate(0, -${distance}px) scale(1)`;
      case 'slide-left':
        return `translate(${distance}px, 0) scale(1)`;
      case 'slide-right':
        return `translate(-${distance}px, 0) scale(1)`;
      case 'scale':
        return 'translate(0, 0) scale(0.95)';
      case 'blur-in':
        return `translate(0, ${distance}px) scale(1)`;
      case 'rotate-in':
        return 'translate(0, 0) scale(0.9) rotate(-5deg)';
      case 'zoom-rotate':
        return `translate(0, ${distance}px) scale(0.8) rotate(3deg)`;
      default:
        return `translate(0, ${distance}px) scale(1)`;
    }
  };

  // Get filter values based on variant
  const getInitialFilter = () => {
    if (variant === 'blur-in') {
      return 'blur(10px)';
    }
    return 'blur(0px)';
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0) scale(1) rotate(0deg)' : getInitialTransform(),
        filter: isVisible ? 'blur(0px)' : getInitialFilter(),
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
}
