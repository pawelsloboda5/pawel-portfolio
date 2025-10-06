import ScrollReveal from './ScrollReveal';

/**
 * GetInTouch Component
 * Minimalistic, elegant design with clean typography
 * Simple email contact with decorative elements
 */
export default function GetInTouch() {
  return (
    <ScrollReveal variant="fade" duration={600} threshold={0.2} distance={25}>
      <div className="relative mb-16 pb-16 border-b border-[var(--color-text-muted)]/10">
        {/* Decorative Side Lines */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-px bg-gradient-to-r from-transparent to-[var(--color-accent-primary)]/30 hidden md:block" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-px bg-gradient-to-l from-transparent to-[var(--color-accent-primary)]/30 hidden md:block" />
        
        <div className="max-w-2xl mx-auto text-center px-4">

          {/* Main Heading with Decorative Underline */}
          <div className="relative inline-block mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] relative">
              Get In Touch
              {/* Decorative Underline Accent */}
              <svg 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-2" 
                viewBox="0 0 120 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M2 5C20 2 40 2 60 5C80 8 100 8 118 5" 
                  stroke="var(--color-accent-primary)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </svg>
            </h2>
          </div>

          {/* Personal Message */}
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-xl mx-auto">
            I'm currently looking for new opportunities and interesting projects to work on. 
            Whether you have a question, want to collaborate, or just want to say hi, my inbox is always open. 
            I'll do my best to get back to you!
          </p>

          {/* Email Link */}
          <a 
            href="mailto:pawelsloboda5@gmail.com"
            className="inline-block text-xl md:text-2xl font-semibold text-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 underline underline-offset-4 decoration-[var(--color-accent-primary)]/30 hover:decoration-[var(--color-accent-primary)]"
          >
            pawelsloboda5@gmail.com
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}
