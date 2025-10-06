# Chatbot UI/UX Implementation

## Overview
AI-powered chatbot interface for portfolio website with desktop floating window and mobile full-screen drawer integration.

## Status: In Progress

### Phase 1: Foundation & Types ✅ COMPLETE
- [x] Create type definitions (`src/types/chatbot.ts`)
- [x] Create chatbot data (`src/data/chatbotData.ts`)
- [x] Create helper utilities (`src/utils/chatbotHelpers.ts`)
- [x] Create response engine (`src/utils/responseEngine.ts`)

### Phase 2: Core Chatbot Components 🚧 IN PROGRESS
- [ ] MessageBubble component
- [ ] ChatMessages component
- [ ] ChatInput component
- [ ] QuickActions component

### Phase 3: Desktop Experience ⏳ PENDING
- [ ] ChatWindow component
- [ ] Chatbot orchestrator
- [ ] ChatbotPulse wrapper
- [ ] Update Layout.astro

### Phase 4: Mobile Experience ⏳ PENDING
- [ ] MobileChatView component
- [ ] Update MobileMenu.tsx

### Phase 5: Styling & Polish ⏳ PENDING
- [ ] Create chatbot.css
- [ ] Update global.css

### Phase 6: Testing & Refinement ⏳ PENDING
- [ ] Edge case handling
- [ ] Accessibility audit
- [ ] Cross-browser testing

## Key Features

### Desktop Experience
- **Floating Window**: 380px wide, max-height 600px, bottom-right positioned
- **Minimize/Expand**: Collapses to small bubble with notification indicator
- **Smooth Animations**: 300ms slide-up with cubic-bezier easing
- **Pulse Effect**: Robot icon pulses 3-5 times when user scrolls to Experience section

### Mobile Experience
- **Drawer Integration**: Reuses existing mobile menu drawer
- **Content Swap**: Hamburger menu → AI Chatbot option → Full chatbot interface
- **Full-Screen**: Takes over entire drawer with close and reset buttons

### Chatbot Capabilities
- **Quick Actions**: Initial suggestions (View Projects, Download Resume, Contact, Ask About Experience)
- **Keyword Matching**: Expanded pattern recognition for portfolio queries
- **Character Limits**: 500 chars user input, 1000 chars bot responses
- **Persistence**: localStorage for chat history
- **Reset**: Instant clear with fresh welcome message

## Technical Architecture

### State Management
```typescript
interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isMinimized: boolean;
  isPulsing: boolean;
}
```

### localStorage Keys
- `chatbot-history`: Persisted message array
- `chatbot-pulse-seen`: Boolean flag for pulse animation
- `chatbot-minimized`: Boolean for window state

### Response Engine
Priority-based keyword matching:
1. **Exact matches**: Direct keyword hits
2. **Partial matches**: Contains keyword in context
3. **Fallback**: Generic helpful response

### Animation Timing
- Window open/close: 300ms
- Message stagger: 200ms
- Pulse: 3-5 cycles @ 1.5s each
- Typing indicator: Infinite loop

## Design System Integration

### Colors (from CSS variables)
- Primary: `var(--color-accent-primary)` (#a78bfa)
- Secondary: `var(--color-accent-secondary)` (#c4b5fd)
- Background: `var(--color-bg-secondary)` (#12122a)
- Text: `var(--color-text-primary)` (#e2e8f0)

### Typography
- Font: Inherits from portfolio
- Mono: `var(--font-mono)` for timestamps/metadata

### Spacing
- Desktop margin: 24px from edges
- Mobile padding: Reuses drawer padding
- Message gap: 12px between bubbles

## Implementation Notes

### Accessibility Considerations
- ARIA labels for all interactive elements
- Keyboard navigation (Tab, Esc)
- Focus trap when chatbot open
- Screen reader announcements for new messages
- Semantic HTML structure

### Performance Optimizations
- Virtual scrolling for 100+ messages
- Debounced scroll handlers
- Lazy load message history
- GPU-accelerated transforms

### Edge Cases Handled
- Rapid open/close toggling
- Window resize (desktop ↔ mobile transitions)
- localStorage quota exceeded
- Empty/whitespace messages
- Multiple rapid submissions

## Future Enhancements (Phase 8+)

### Backend Integration
- OpenAI Responses API connection
- Streaming response support
- Context from portfolio JSON
- Error handling & retry logic

### Advanced Features
- Code snippet rendering with syntax highlighting
- Link preview cards
- Voice input (Web Speech API)
- Export chat history
- Share conversation

## File Structure

```
src/
├── components/
│   ├── chatbot/
│   │   ├── Chatbot.tsx              - Main orchestrator
│   │   ├── ChatWindow.tsx           - Desktop floating window
│   │   ├── MobileChatView.tsx       - Mobile fullscreen
│   │   ├── ChatMessages.tsx         - Message list
│   │   ├── MessageBubble.tsx        - Individual message
│   │   ├── ChatInput.tsx            - Input with validation
│   │   ├── QuickActions.tsx         - Action buttons
│   │   └── ChatbotPulse.tsx         - Pulse animation
│   └── MobileMenu.tsx               - [MODIFIED] Add chatbot mode
├── data/
│   └── chatbotData.ts               - Responses & context
├── types/
│   └── chatbot.ts                   - Type definitions
├── utils/
│   ├── chatbotHelpers.ts            - Helper functions
│   └── responseEngine.ts            - Keyword matching
└── styles/
    └── chatbot.css                  - Chatbot styles
```

## Testing Checklist

### Desktop
- [ ] Window opens/closes smoothly
- [ ] Minimize/expand functionality
- [ ] Messages display correctly
- [ ] Input validation works
- [ ] Quick actions trigger prompts
- [ ] Reset clears history
- [ ] Pulse animation on Experience scroll
- [ ] localStorage persistence

### Mobile
- [ ] Drawer transitions correctly
- [ ] Full-screen layout
- [ ] Close returns to menu
- [ ] Input keyboard behavior
- [ ] Scroll performance

### Cross-Browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (iOS)
- [ ] Mobile browsers

### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Focus management
- [ ] ARIA labels
- [ ] Color contrast

## Timeline

- **Phase 1-2**: Types, data, core components (2-3 hours)
- **Phase 3**: Desktop experience (1-2 hours)
- **Phase 4**: Mobile integration (1-2 hours)
- **Phase 5**: Styling & polish (1 hour)
- **Phase 6**: Testing & refinement (1-2 hours)

**Total Estimated Time**: 6-10 hours for complete implementation

## Notes

- Built with React 19 (matching existing stack)
- Astro client directives for hydration
- Follows existing animation patterns
- Maintains design consistency
- Minimal dependencies (no external libraries)
