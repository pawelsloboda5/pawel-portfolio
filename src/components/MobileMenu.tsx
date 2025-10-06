import { useState, useEffect } from 'react';

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
        className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block w-6 h-0.5 bg-[var(--color-accent-primary)] transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[var(--color-accent-primary)] transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[var(--color-accent-primary)] transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
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
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        ></div>

        {/* Menu Content */}
        <nav
          className={`absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] flex flex-col items-center justify-center transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col items-center gap-8 text-center w-full px-8">
            <li className="w-full">
              <a
                href="#about"
                onClick={handleLinkClick}
                className="block text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-lg py-2"
              >
                <span className="text-[var(--color-accent-primary)] font-mono text-sm block mb-1">
                  01.
                </span>
                About
              </a>
            </li>
            <li className="w-full">
              <a
                href="#experience"
                onClick={handleLinkClick}
                className="block text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-lg py-2"
              >
                <span className="text-[var(--color-accent-primary)] font-mono text-sm block mb-1">
                  02.
                </span>
                Experience
              </a>
            </li>
            <li className="w-full">
              <a
                href="#projects"
                onClick={handleLinkClick}
                className="block text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-lg py-2"
              >
                <span className="text-[var(--color-accent-primary)] font-mono text-sm block mb-1">
                  03.
                </span>
                Projects
              </a>
            </li>
            <li className="w-full">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="block text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-lg py-2"
              >
                <span className="text-[var(--color-accent-primary)] font-mono text-sm block mb-1">
                  04.
                </span>
                Contact
              </a>
            </li>
            <li className="w-full pt-4">
              <a
                href="/resume.pdf"
                onClick={handleLinkClick}
                className="inline-block border-2 border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] px-8 py-3 rounded-md hover:bg-[var(--color-accent-primary)]/10 transition-all duration-200"
              >
                Resume
              </a>
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
