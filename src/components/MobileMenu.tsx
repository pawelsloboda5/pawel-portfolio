import { useState, useEffect } from 'react';
import { socialLinks } from '../data/links';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu when link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        className="md:hidden relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-2"
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
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
          className={`absolute right-0 top-0 bottom-0 h-screen w-3/4 bg-[var(--color-bg-primary)] flex flex-col items-center justify-center transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          {/* Close X Button */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className={`absolute top-8 right-8 text-[var(--color-accent-primary)] hover:opacity-70 transition-all duration-300 ${
              isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <ul className="flex flex-col items-center gap-10 text-center w-full px-8">
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
            <li className="w-full pt-8">
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
        </nav>
      </div>
    </>
  );
}
