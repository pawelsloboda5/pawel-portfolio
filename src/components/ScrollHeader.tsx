import { useEffect, useState, useRef } from 'react';

export default function ScrollHeader({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Initialize with current scroll position
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      console.log('Scroll event:', { currentScrollY, lastScrollY: lastScrollY.current, isVisible });
      
      // Always show header at the top
      if (currentScrollY < 10) {
        console.log('At top, showing header');
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      
      // Determine scroll direction
      const isScrollingUp = currentScrollY < lastScrollY.current;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      
      console.log('Direction:', { isScrollingUp, isScrollingDown });
      
      // Show header when scrolling up
      if (isScrollingUp) {
        console.log('Scrolling up, showing header');
        setIsVisible(true);
      } 
      // Hide header when scrolling down past 100px
      else if (isScrollingDown && currentScrollY > 100) {
        console.log('Scrolling down, hiding header');
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/95 backdrop-blur-md shadow-sm border-b border-[var(--color-accent-primary)]/10 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </header>
  );
}
