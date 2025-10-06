/**
 * Response Engine
 * Keyword matching and response generation for chatbot
 */

import type { KeywordPattern } from '../types/chatbot';
import { keywordPatterns, chatbotConfig } from '../data/chatbotData';
import { normalizeText, truncateMessage } from './chatbotHelpers';

/**
 * Match score for a keyword pattern
 */
interface PatternMatch {
  pattern: KeywordPattern;
  score: number;
  matchedKeywords: string[];
}

/**
 * Calculate match score for a pattern against user message
 */
function calculateMatchScore(userMessage: string, pattern: KeywordPattern): PatternMatch {
  const normalizedMessage = normalizeText(userMessage);
  const words = normalizedMessage.split(' ');
  const matchedKeywords: string[] = [];
  let score = 0;
  
  // Check each keyword in the pattern
  for (const keyword of pattern.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    
    // Exact word match (highest score)
    if (words.includes(normalizedKeyword)) {
      score += 10;
      matchedKeywords.push(keyword);
    }
    // Partial match (word contains keyword)
    else if (normalizedMessage.includes(normalizedKeyword)) {
      score += 5;
      matchedKeywords.push(keyword);
    }
  }
  
  // Apply priority multiplier
  score *= pattern.priority;
  
  return {
    pattern,
    score,
    matchedKeywords
  };
}

/**
 * Find best matching pattern for user message
 */
function findBestMatch(userMessage: string): PatternMatch | null {
  const matches: PatternMatch[] = [];
  
  // Calculate scores for all patterns
  for (const pattern of keywordPatterns) {
    const match = calculateMatchScore(userMessage, pattern);
    if (match.score > 0 || pattern.keywords.length === 0) {
      // Include patterns with matches or fallback pattern (empty keywords)
      matches.push(match);
    }
  }
  
  // Sort by score (highest first)
  matches.sort((a, b) => b.score - a.score);
  
  // Return best match, or fallback if no matches
  return matches.length > 0 ? matches[0] : null;
}

/**
 * Generate response for user message
 */
export function generateResponse(userMessage: string): string {
  // Find best matching pattern
  const match = findBestMatch(userMessage);
  
  if (!match) {
    // This should never happen due to fallback pattern, but just in case
    return "I'm having trouble understanding that. Can you try rephrasing your question?";
  }
  
  // Get response from pattern
  let response: string;
  if (typeof match.pattern.response === 'function') {
    response = match.pattern.response(userMessage);
  } else {
    response = match.pattern.response;
  }
  
  // Truncate if too long
  response = truncateMessage(response, chatbotConfig.maxBotMessageLength);
  
  return response;
}

/**
 * Check if message contains any greetings
 */
export function isGreeting(message: string): boolean {
  const greetingKeywords = ['hello', 'hi', 'hey', 'greetings', 'sup', 'yo', 'howdy'];
  const normalized = normalizeText(message);
  return greetingKeywords.some(keyword => normalized.includes(keyword));
}

/**
 * Check if message is a question
 */
export function isQuestion(message: string): boolean {
  const questionWords = ['what', 'when', 'where', 'who', 'why', 'how', 'can', 'could', 'would', 'should', 'is', 'are', 'do', 'does'];
  const normalized = normalizeText(message);
  const words = normalized.split(' ');
  
  // Check if starts with question word
  if (questionWords.includes(words[0])) return true;
  
  // Check if ends with question mark
  if (message.trim().endsWith('?')) return true;
  
  return false;
}

/**
 * Get category-specific context
 */
export function getCategoryContext(category: string): string {
  const contexts: Record<string, string> = {
    projects: "I have several interesting projects across different domains including AI/ML, healthcare, and education.",
    experience: "I've worked at companies ranging from startups to Fortune 500s, with focus on full-stack development and AI.",
    skills: "I specialize in modern web technologies with deep expertise in AI integration and cloud infrastructure.",
    contact: "I'm always open to new opportunities and interesting conversations.",
    general: "I'm a full-stack software engineer passionate about building systems that solve real problems."
  };
  
  return contexts[category] || contexts.general;
}

/**
 * Suggest follow-up questions based on category
 */
export function suggestFollowUp(category: string): string[] {
  const suggestions: Record<string, string[]> = {
    projects: [
      "Tell me more about SIE Wellness",
      "What was your biggest technical challenge?",
      "How do you approach new projects?"
    ],
    experience: [
      "What did you learn at Adobe?",
      "Tell me about your DoD work",
      "What kind of roles are you looking for?"
    ],
    skills: [
      "What's your AI/ML experience?",
      "What databases have you worked with?",
      "What's your preferred tech stack?"
    ],
    contact: [
      "Can I get your resume?",
      "What's your email?",
      "Are you available for consulting?"
    ],
    general: [
      "What projects have you built?",
      "Where have you worked?",
      "What are your technical skills?"
    ]
  };
  
  return suggestions[category] || suggestions.general;
}
