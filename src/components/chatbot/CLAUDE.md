# Chatbot Components

## Purpose
React components for AI-powered chatbot interface integrated into the portfolio website.

## Component Architecture

### Chatbot.tsx (Main Orchestrator)
**Responsibility**: State management, localStorage sync, variant rendering
- Manages global chatbot state (messages, isOpen, isMinimized)
- Syncs with localStorage on mount and updates
- Renders desktop or mobile variant based on viewport
- Handles reset and minimize actions
- Provides context to child components

### ChatWindow.tsx (Desktop UI)
**Responsibility**: Floating window container for desktop
- Fixed positioning bottom-right (24px margins)
- 380px width, max-height 600px
- Header with title, minimize, reset buttons
- Slide-up animation on open/close
- Minimized state: small bubble with badge
- Click outside to close functionality

### MobileChatView.tsx (Mobile UI)
**Responsibility**: Full-screen chatbot for mobile
- Replaces mobile menu content in drawer
- Full viewport height minus safe areas
- Header with back/close button and reset
- Scrollable message area
- Fixed input at bottom
- Smooth transition animations

### ChatMessages.tsx (Message Display)
**Responsibility**: Scrollable message list container
- Auto-scroll to bottom on new message
- Smooth scroll behavior
- Typing indicator when bot is "thinking"
- Empty state with quick actions
- Virtual scrolling for 100+ messages

### MessageBubble.tsx (Individual Message)
**Responsibility**: Single message display with animations
- User vs bot styling (alignment, colors)
- Fade-in slide-up animation (200ms stagger)
- Timestamp display (relative format)
- Avatar indicators
- Markdown/link support for bot messages

### ChatInput.tsx (Input Field)
**Responsibility**: Message input with validation
- Auto-resizing textarea (max 4 lines)
- Character counter (500 max)
- Send button (disabled when invalid)
- Enter to send, Shift+Enter for newline
- Trim whitespace on submit
- Loading state during bot response

### QuickActions.tsx (Action Buttons)
**Responsibility**: Predefined action suggestions
- 2x2 grid of action cards
- Only visible when no messages
- Smooth fade-out on first message
- Click triggers predefined prompt
- Icons + descriptive labels
- Hover effects

### ChatbotPulse.tsx (Pulse Animation)
**Responsibility**: Attention-grabbing animation wrapper
- Wraps robot icon in sidebar
- IntersectionObserver on Experience section
- Pulses 3-5 times (scale + glow effect)
- localStorage flag prevents repeat
- Stops on first chatbot open
- Respects reduced motion preference

## State Flow

```
User Action → Chatbot.tsx (state update) → localStorage sync → Re-render children
```

## Key Design Decisions

### Why separate desktop/mobile components?
- Different UX patterns (floating vs full-screen)
- Easier to maintain and test
- Avoids complex responsive CSS
- Better performance (only render needed variant)

### Why localStorage over sessionStorage?
- User expectation: chat history persists across visits
- Better UX: continue conversations
- Easy to implement reset/clear
- Falls back gracefully if quota exceeded

### Why React vs Astro for chatbot?
- Requires client-side state management
- Real-time interactions (typing, sending)
- Complex event handling
- Future API integration easier
- Matches existing interactive components

### Animation Philosophy
- Match existing portfolio animations (timing, easing)
- Smooth but not distracting
- Respect prefers-reduced-motion
- GPU-accelerated transforms
- Stagger delays for polish

## Integration Points

### Layout.astro
```astro
<Chatbot client:load variant="desktop" />
```
- Mounted at body level
- Client-side hydration
- Desktop variant by default

### MobileMenu.tsx
```tsx
{isChatbotMode ? (
  <MobileChatView onClose={handleCloseChatbot} />
) : (
  // ...existing menu items
)}
```
- Conditional rendering based on mode
- Shared drawer animation
- Seamless transition

### Robot Icon Buttons
```astro
<ChatbotPulse client:load>
  <button onClick={openChatbot}>
    <img src="/robot.svg" />
  </button>
</ChatbotPulse>
```
- Wrapped in pulse component
- Same handler in sidebar and mobile menu

## Styling Approach

### CSS Modules vs Inline Styles vs Global CSS
**Decision**: Global CSS file (`chatbot.css`) + scoped Tailwind classes

**Reasoning**:
- Matches existing pattern (see `global.css`)
- Easy keyframe animations
- Consistent with Tailwind utility classes
- No build config changes needed
- Shared styles across components

### Color System
All colors use CSS variables from `global.css`:
- Backgrounds: `--color-bg-primary`, `--color-bg-secondary`
- Accents: `--color-accent-primary`, `--color-accent-secondary`
- Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- Borders: `--color-border`, `--color-border-hover`

### Responsive Strategy
- Desktop: `@media (min-width: 768px)`
- Mobile: `@media (max-width: 767px)`
- Breakpoints match existing portfolio

## Data Flow

### Message Creation
```typescript
User types → ChatInput validates → 
Chatbot.tsx adds user message → 
responseEngine.ts generates response → 
Chatbot.tsx adds bot message → 
localStorage updates → UI re-renders
```

### Quick Action Flow
```typescript
User clicks action → 
QuickActions emits prompt → 
Chatbot treats as user message → 
Same flow as manual input
```

## Performance Considerations

### Why auto-scroll is throttled
- Prevents jank during rapid messages
- Uses `requestAnimationFrame`
- Smooth scroll behavior

### Why message timestamps are relative
- Better UX than absolute times
- Updates in real-time
- Reduces visual clutter

### Why minimize instead of close on desktop
- Faster to reopen
- Preserves context
- Lower cognitive load
- Better for multi-turn conversations

## Accessibility

### ARIA Structure
```html
<div role="dialog" aria-labelledby="chatbot-title">
  <h2 id="chatbot-title">AI Assistant</h2>
  <div role="log" aria-live="polite" aria-atomic="false">
    <!-- Messages -->
  </div>
  <form role="search">
    <textarea aria-label="Message input" />
  </form>
</div>
```

### Keyboard Shortcuts
- `Esc`: Close chatbot
- `Ctrl+/`: Toggle chatbot (future)
- `Enter`: Send message
- `Shift+Enter`: New line
- `Tab`: Navigate between elements

### Screen Reader Announcements
- New messages announced via `aria-live`
- Button actions clearly labeled
- Form inputs have associated labels
- Status updates for loading states

## Future Enhancements

### Phase 8: Backend Integration
- Swap `responseEngine.ts` with API calls
- Add streaming response handling
- Implement retry logic
- Add error states

### Advanced Features
- Message reactions/feedback
- Code block syntax highlighting
- Image attachments
- Voice input/output
- Export conversation as PDF
- Share link to conversation

## Testing Strategy

### Unit Tests (Future)
- `chatbotHelpers.ts`: Test all utility functions
- `responseEngine.ts`: Test keyword matching logic
- Component rendering: Snapshot tests

### Integration Tests
- Full conversation flow
- localStorage persistence
- Reset functionality
- Quick action triggers

### E2E Tests
- Open → message → response → close flow
- Mobile drawer transition
- Pulse animation trigger
- Cross-browser compatibility

## Common Issues & Solutions

### Issue: Messages not persisting
**Solution**: Check localStorage quota, fallback to sessionStorage

### Issue: Pulse animation repeats
**Solution**: Ensure localStorage flag is set on first trigger

### Issue: Mobile drawer animation glitchy
**Solution**: Ensure transforms are GPU-accelerated, check timing

### Issue: Input lag on mobile
**Solution**: Debounce character counter, optimize re-renders

### Issue: Scroll jumps on new message
**Solution**: Use `scrollIntoView` with smooth behavior

## Dependencies

**Added**: None (vanilla React + existing stack)

**Leveraged**:
- React 19 (already installed)
- Astro client directives
- Tailwind CSS
- Existing animation utilities

## Timeline

- **Chatbot.tsx**: 30 min
- **ChatWindow.tsx**: 45 min
- **MobileChatView.tsx**: 45 min
- **ChatMessages.tsx**: 30 min
- **MessageBubble.tsx**: 30 min
- **ChatInput.tsx**: 45 min
- **QuickActions.tsx**: 30 min
- **ChatbotPulse.tsx**: 30 min

**Total**: ~5 hours for all components
