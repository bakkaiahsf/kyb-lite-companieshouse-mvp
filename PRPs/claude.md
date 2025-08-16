### Environment Setup
```bash
# .env.example
his file provides comprehensive guidance to Claude Code when working with Python code in this repository.

Core Development Philosophy
KISS (Keep It Simple, Stupid)
Simplicity should be a key goal in design. Choose straightforward solutions over complex ones whenever possible. Simple solutions are easier to understand, maintain, and debug.

YAGNI (You Aren't Gonna Need It)
Avoid building functionality on speculation. Implement features only when they are needed, not when you anticipate they might be useful in the future.

Design Principles
Dependency Inversion: High-level modules should not depend on low-level modules. Both should depend on abstractions.
Open/Closed Principle: Software entities should be open for extension but closed for modification.
Single Responsibility: Each function, class, and module should have one clear purpose.
Fail Fast: Check for potential errors early and raise exceptions immediately when issues occur.
🧱 Code Structure & Modularity
File and Function Limits
Never create a file longer than 500 lines of code. If approaching this limit, refactor by splitting into modules.
Functions should be under 50 lines with a single, clear responsibility.
Classes should be under 100 lines and represent a single concept or entity.
Organize code into clearly separated modules, grouped by feature or responsibility.
Line lenght should be max 100 characters ruff rule in pyproject.toml

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http### Zustand Store with Supabase Integration
```typescript
// lib/stores/chat-store.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ConversationService } from '@/lib/supabase/conversations'
import type { Conversation, ChatMessage } from '@/types/supabase'

interface ChatState {
  conversations: Conversation[]
  messages: Record<string, ChatMessage[]>
  activeConversationId: string | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setConversations: (conversations: Conversation[]) => void
  addConversation: (conversation: Conversation) => void
  updateConversation: (id: string, updates: Partial<Conversation>) => void
  setActiveConversation: (id: string | null) => void
  setMessages: (conversationId: string, messages: ChatMessage[]) => void
  addMessage: (conversationId: string, message: ChatMessage) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  
  // Real-time subscription cleanup
  cleanup: (() => void) | null
  setCleanup: (cleanup: (() => void) | null) => void
}

export const useC# CLAUDE.md
This file provides comprehensive guidance to Claude Code when working with Next.js 13+ code in this repository.

## Core Development Philosophy

### KISS (Keep It Simple, Stupid)
Simplicity should be a key goal in design. Choose straightforward solutions over complex ones whenever possible. Simple solutions are easier to understand, maintain, and debug.

### YAGNI (You Aren't Gonna Need It)
Avoid building functionality on speculation. Implement features only when they are needed, not when you anticipate they might be useful in the future.

### Design Principles
- **Component Composition**: Build small, reusable components that can be composed together
- **Server-First Architecture**: Leverage Server Components by default, use Client Components only when needed
- **Progressive Enhancement**: Start with server-rendered functionality, enhance with client-side features
- **Type Safety**: Use TypeScript strictly throughout the application
- **Fail Fast**: Validate data early and provide clear error messages

## 🧱 Code Structure & Modularity

### File and Function Limits
- Never create a component file longer than 200 lines of code
- Components should have a single, clear responsibility
- Custom hooks should be under 100 lines
- API routes should be under 150 lines
- Organize code into clearly separated feature modules
- Line length should be max 100 characters (Prettier rule in `.prettierrc`)

### Project Architecture
Follow strict feature-based architecture with App Router structure:

```
src/
├── app/                          # Next.js 13+ App Router
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── route.ts
│   │   ├── ai/
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   └── models/
│   │   │       └── route.ts
│   │   └── users/
│   │       └── [id]/
│   │           └── route.ts
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── loading.tsx
│   ├── globals.css
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── loading.tsx              # Global loading UI
│   ├── error.tsx                # Global error UI
│   └── not-found.tsx           # 404 page
├── components/                   # Reusable UI components
│   ├── ui/                      # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── dialog.tsx
│   ├── forms/                   # Form components
│   │   ├── auth-form.tsx
│   │   └── contact-form.tsx
│   ├── layout/                  # Layout components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   └── ai/                      # AI-specific components
│       ├── chat-interface.tsx
│       ├── model-selector.tsx
│       └── response-display.tsx
├── lib/                         # Utility libraries
│   ├── ai/                      # AI model integrations
│   │   ├── openai.ts
│   │   ├── gemini.ts
│   │   ├── claude.ts
│   │   └── types.ts
│   ├── supabase/                # Supabase utilities
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── middleware.ts
│   │   └── types.ts
│   ├── auth/                    # Authentication utilities
│   │   ├── config.ts
│   │   ├── providers.ts
│   │   └── middleware.ts
│   ├── utils.ts                 # General utilities
│   ├── validations.ts           # Zod schemas
│   └── constants.ts             # App constants
├── hooks/                       # Custom React hooks
│   ├── use-ai-chat.ts
│   ├── use-auth.ts
│   └── use-local-storage.ts
├── types/                       # TypeScript type definitions
│   ├── ai.ts
│   ├── auth.ts
│   └── global.d.ts
├── styles/                      # Global styles
│   └── globals.css
└── __tests__/                   # Test files
    ├── components/
    ├── hooks/
    ├── lib/
    └── pages/
```

## 🛠️ Development Environment

### Package Management
This project uses **pnpm** for fast, efficient package management.

```bash
# Install pnpm (if not already installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Add a package
pnpm add react-query

# Add development dependency
pnpm add -D @types/node eslint prettier

# Remove a package
pnpm remove react-query

# Update dependencies
pnpm update

# Run commands
pnpm dev
pnpm build
pnpm test
```

### Development Commands
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Database commands
pnpm supabase:start
pnpm supabase:stop
pnpm supabase:reset
pnpm supabase:migrate
pnpm supabase:generate-types
```

## 📋 Style & Conventions

### TypeScript Configuration
Use strict TypeScript configuration in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

### Component Standards
Use consistent patterns for all components:

```tsx
'use client' // Only when client-side features are needed

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        
        // Variant styles
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
        },
        
        // Size styles
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        
        className
      )}
    >
      {children}
    </button>
  )
}
```

### Naming Conventions
- **Components**: PascalCase (`UserProfile`, `ChatInterface`)
- **Files**: kebab-case (`user-profile.tsx`, `chat-interface.tsx`)
- **Variables and functions**: camelCase (`userData`, `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_FILE_SIZE`)
- **Types and interfaces**: PascalCase (`User`, `ChatMessage`)
- **Hooks**: camelCase with `use` prefix (`useAuth`, `useAIChat`)

## 🧪 Testing Strategy

### Testing Stack
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **MSW**: API mocking

### Test Structure
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Testing Best Practices
- Write tests that test behavior, not implementation
- Use data-testid sparingly, prefer semantic queries
- Mock external dependencies (AI APIs, database calls)
- Test error states and edge cases
- Keep tests isolated and independent
- Use factories for test data creation

## 🚨 Error Handling

### Error Boundaries
```tsx
'use client'

import { type ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
      <p className="mt-2 text-gray-600">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}

interface ErrorBoundaryProps {
  children: ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo)
        // Send to error reporting service
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}
```

### API Error Handling
```tsx
// lib/api.ts
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new APIError(
        errorData.message || 'An error occurred',
        response.status,
        errorData.code
      )
    }

    return response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError('Network error occurred', 0)
  }
}
```

## 🔧 Configuration Management

### Environment Variables
```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  
  // AI API Keys
  OPENAI_API_KEY: z.string().min(1),
  GOOGLE_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
  
  // Optional AI APIs
  COHERE_API_KEY: z.string().optional(),
  HUGGINGFACE_API_KEY: z.string().optional(),
})

export const env = envSchema.parse(process.env)
```

### App Configuration
```typescript
// lib/config.ts
import { env } from './env'

export const config = {
  app: {
    name: 'AI Chat Platform',
    version: '1.0.0',
    url: env.NEXT_PUBLIC_SUPABASE_URL,
  },
  
  supabase: {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
  },
  
  ai: {
    models: {
      openai: {
        apiKey: env.OPENAI_API_KEY,
        defaultModel: 'gpt-4-turbo-preview',
        maxTokens: 4000,
      },
      google: {
        apiKey: env.GOOGLE_API_KEY,
        defaultModel: 'gemini-pro',
        maxTokens: 4000,
      },
      anthropic: {
        apiKey: env.ANTHROPIC_API_KEY,
        defaultModel: 'claude-3-sonnet-20240229',
        maxTokens: 4000,
      },
    },
    
    rateLimits: {
      requestsPerMinute: 60,
      tokensPerDay: 100000,
    },
  },
} as const
```

## 🏗️ Data Models and Validation

### Supabase Types and Database Schema
```typescript
// types/supabase.ts - Auto-generated from Supabase CLI
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          title: string
          model: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          model: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          model?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          content: string
          role: string
          model: string
          tokens: number
          conversation_id: string
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          role: string
          model: string
          tokens?: number
          conversation_id: string
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          role?: string
          model?: string
          tokens?: number
        }
      }
    }
  }
}

// Application types derived from database schema
export type User = Database['public']['Tables']['users']['Row']
export type Conversation = Database['public']['Tables']['conversations']['Row']
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']

export type CreateUser = Database['public']['Tables']['users']['Insert']
export type CreateConversation = Database['public']['Tables']['conversations']['Insert']
export type CreateChatMessage = Database['public']['Tables']['chat_messages']['Insert']
```

### Zod Schemas with Supabase Integration
```typescript
// lib/validations.ts
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100).nullable(),
  avatar_url: z.string().url().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export const chatMessageSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1).max(10000),
  role: z.enum(['user', 'assistant', 'system']),
  model: z.enum(['gpt-4', 'gemini-pro', 'claude-3-sonnet']),
  tokens: z.number().int().positive(),
  conversation_id: z.string().uuid(),
  created_at: z.string().datetime(),
})

export const conversationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  user_id: z.string().uuid(),
  model: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

// API request/response schemas
export const createConversationSchema = z.object({
  title: z.string().min(1).max(200),
  model: z.enum(['gpt-4', 'gemini-pro', 'claude-3-sonnet']),
})

export const sendMessageSchema = z.object({
  content: z.string().min(1).max(10000),
  conversation_id: z.string().uuid(),
})
```

### Type Definitions
```typescript
// types/ai.ts
export type AIModel = 'gpt-4' | 'gemini-pro' | 'claude-3-sonnet'

export interface AIProvider {
  name: string
  models: string[]
  generateResponse(prompt: string, model: string): Promise<string>
  countTokens(text: string): number
}

// Import from generated Supabase types
export type { User, Conversation, ChatMessage } from './supabase'
```

## 🤖 AI Integration

### AI Provider Abstraction
```typescript
// lib/ai/base-provider.ts
export abstract class BaseAIProvider {
  abstract name: string
  abstract models: string[]

  abstract generateResponse(
    messages: ChatMessage[],
    model: string,
    options?: {
      maxTokens?: number
      temperature?: number
      stream?: boolean
    }
  ): Promise<string>

  abstract countTokens(text: string, model: string): number
  
  protected handleError(error: unknown, context: string): never {
    console.error(`${this.name} API Error in ${context}:`, error)
    
    if (error instanceof Error) {
      throw new AIProviderError(error.message, this.name, context)
    }
    
    throw new AIProviderError('Unknown error occurred', this.name, context)
  }
}

export class AIProviderError extends Error {
  constructor(
    message: string,
    public provider: string,
    public context: string
  ) {
    super(`${provider}: ${message}`)
    this.name = 'AIProviderError'
  }
}
```

### OpenAI Provider
```typescript
// lib/ai/openai.ts
import OpenAI from 'openai'
import { BaseAIProvider } from './base-provider'
import { config } from '@/lib/config'

export class OpenAIProvider extends BaseAIProvider {
  name = 'OpenAI'
  models = ['gpt-4-turbo-preview', 'gpt-4', 'gpt-3.5-turbo']
  
  private client: OpenAI

  constructor() {
    super()
    this.client = new OpenAI({
      apiKey: config.ai.models.openai.apiKey,
    })
  }

  async generateResponse(
    messages: ChatMessage[],
    model: string = 'gpt-4-turbo-preview',
    options: {
      maxTokens?: number
      temperature?: number
      stream?: boolean
    } = {}
  ): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        max_tokens: options.maxTokens ?? 4000,
        temperature: options.temperature ?? 0.7,
        stream: options.stream ?? false,
      })

      return response.choices[0]?.message?.content ?? ''
    } catch (error) {
      this.handleError(error, 'generateResponse')
    }
  }

  countTokens(text: string, model: string): number {
    // Implement token counting logic
    // You might want to use tiktoken library for accurate counting
    return Math.ceil(text.length / 4) // Rough approximation
  }
}
```

## 🔄 State Management

### Zustand Store with Supabase Integration
```typescript
// lib/stores/chat-store.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ConversationService } from '@/lib/supabase/conversations'
import type { Conversation, ChatMessage } from '@/types/supabase'

interface ChatState {
  conversations: Conversation[]
  messages: Record<string, ChatMessage[]>
  activeConversationId: string | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setConversations: (conversations: Conversation[]) => void
  addConversation: (conversation: Conversation) => void
  updateConversation: (id: string, updates: Partial<Conversation>) => void
  setActiveConversation: (id: string | null) => void
  setMessages: (conversationId: string, messages: ChatMessage[]) => void
  addMessage: (conversationId: string, message: ChatMessage) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  
  // Real-time subscription cleanup
  cleanup: (() => void) | null
  setCleanup: (cleanup: (() => void) | null) => void
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
        conversations: [],
        messages: {},
        activeConversationId: null,
        isLoading: false,
        error: null,
        cleanup: null,

        setConversations: (conversations) =>
          set({ conversations }, false, 'setConversations'),

        addConversation: (conversation) =>
          set(
            (state) => ({
              conversations: [conversation, ...state.conversations],
              activeConversationId: conversation.id,
            }),
            false,
            'addConversation'
          ),

        updateConversation: (id, updates) =>
          set(
            (state) => ({
              conversations: state.conversations.map((conv) =>
                conv.id === id ? { ...conv, ...updates } : conv
              ),
            }),
            false,
            'updateConversation'
          ),

        setActiveConversation: (id) =>
          set({ activeConversationId: id }, false, 'setActiveConversation'),

        setMessages: (conversationId, messages) =>
          set(
            (state) => ({
              messages: {
                ...state.messages,
                [conversationId]: messages,
              },
            }),
            false,
            'setMessages'
          ),

        addMessage: (conversationId, message) =>
          set(
            (state) => ({
              messages: {
                ...state.messages,
                [conversationId]: [
                  ...(state.messages[conversationId] || []),
                  message,
                ],
              },
            }),
            false,
            'addMessage'
          ),

        setLoading: (loading) =>
          set({ isLoading: loading }, false, 'setLoading'),

        setError: (error) =>
          set({ error }, false, 'setError'),

        clearError: () =>
          set({ error: null }, false, 'clearError'),

        setCleanup: (cleanup) =>
          set({ cleanup }, false, 'setCleanup'),
      }),
      {
        name: 'chat-store',
        partialize: (state) => ({
          conversations: state.conversations,
          activeConversationId: state.activeConversationId,
          // Don't persist messages - fetch fresh from Supabase
        }),
      }
    ),
    { name: 'ChatStore' }
  )
)

// Real-time subscription hook
export function useRealtimeConversations(userId: string) {
  const { setConversations, addConversation, updateConversation, setCleanup, cleanup } = useChatStore()

  useEffect(() => {
    // Clean up previous subscription
    if (cleanup) {
      cleanup()
    }

    // Set up new subscription
    const subscription = ConversationService.subscribeToConversations(
      userId,
      (conversation) => {
        updateConversation(conversation.id, conversation)
      }
    )

    // Store cleanup function
    setCleanup(() => {
      subscription.unsubscribe()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [userId, setCleanup, updateConversation, cleanup])
}
```
```

## 🔐 Authentication & Authorization

### Supabase Auth Configuration
```typescript
// lib/auth/config.ts
import { createServerClient } from '@/lib/supabase/server'

export async function getUser() {
  const supabase = createServerClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Error fetching user:', error.message)
      return null
    }
    
    return user
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export async function getSession() {
  const supabase = createServerClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error fetching session:', error.message)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Session error:', error)
    return null
  }
}

// lib/auth/providers.ts
export const authProviders = {
  google: {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
  },
  github: {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
  },
} as const
```

### Authentication Components
```typescript
// components/auth/login-form.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Redirect will be handled by the auth state change
    } catch (error) {
      console.error('Login error:', error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error) {
      console.error('Google login error:', error)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      
      <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
        Continue with Google
      </Button>
    </div>
  )
}

// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to the dashboard or home page
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
```
```

## 🗄️ Supabase Integration

### Supabase Client Setup
```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export const createClient = () => createClientComponentClient<Database>()

// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export const createServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
}

// lib/supabase/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Database } from '@/types/supabase'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createMiddlewareClient<Database>({ req: request, res: response })
  await supabase.auth.getSession()

  return response
}
```

### Database Operations with RLS
```typescript
// lib/supabase/conversations.ts
import { createServerClient } from './server'
import { createClient } from './client'
import type { Database } from '@/types/supabase'

type Conversation = Database['public']['Tables']['conversations']['Row']
type CreateConversation = Database['public']['Tables']['conversations']['Insert']

export class ConversationService {
  // Server-side operations (with service role for admin tasks)
  static async getAllConversations(userId: string): Promise<Conversation[]> {
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) throw new Error(`Failed to fetch conversations: ${error.message}`)
    return data || []
  }

  // Client-side operations (respects RLS policies)
  static async createConversation(conversation: CreateConversation): Promise<Conversation> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('conversations')
      .insert(conversation)
      .select()
      .single()

    if (error) throw new Error(`Failed to create conversation: ${error.message}`)
    return data
  }

  // Real-time subscription
  static subscribeToConversations(
    userId: string,
    onUpdate: (conversation: Conversation) => void
  ) {
    const supabase = createClient()
    
    return supabase
      .channel(`conversations:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new) {
            onUpdate(payload.new as Conversation)
          }
        }
      )
      .subscribe()
  }
}
```

### Row Level Security (RLS) Policies
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own conversations
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations" ON conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations" ON conversations
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see messages from their conversations
CREATE POLICY "Users can view own messages" ON chat_messages
  FOR SELECT USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in own conversations" ON chat_messages
  FOR INSERT WITH CHECK (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid()
    )
  );
```

## 📊 Performance Optimization

### React Performance
```tsx
// components/optimized-chat-message.tsx
import { memo } from 'react'
import { type ChatMessage } from '@/types/ai'

interface ChatMessageProps {
  message: ChatMessage
  onEdit?: (id: string, content: string) => void
  onDelete?: (id: string) => void
}

export const OptimizedChatMessage = memo<ChatMessageProps>(({
  message,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="message">
      <div className="content">{message.content}</div>
      <div className="metadata">
        <span>{message.model}</span>
        <span>{message.tokens} tokens</span>
        <time>{message.createdAt.toLocaleString()}</time>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison function
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.content === nextProps.message.content &&
    prevProps.message.updatedAt === nextProps.message.updatedAt
  )
})

OptimizedChatMessage.displayName = 'OptimizedChatMessage'
```

### API Route with Supabase Integration
```typescript
// app/api/ai/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ratelimit } from '@/lib/ratelimit'
import { sendMessageSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    // Authentication check with Supabase
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError || !session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limiting
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `chat_${session.user.id}`
    )

    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          },
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const { content, conversation_id, model } = sendMessageSchema.parse(body)

    // Verify user owns the conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('id, user_id')
      .eq('id', conversation_id)
      .eq('user_id', session.user.id)
      .single()

    if (convError || !conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    // Process the chat message
    const response = await processAIChat({
      content,
      conversation_id,
      model,
      userId: session.user.id,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat API Error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Caching with Supabase
```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

// Next.js cache wrapper with Supabase
export const getCachedUserConversations = unstable_cache(
  async (userId: string) => {
    const supabase = createServerClient()
    
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select(`
        *,
        chat_messages (
          id,
          content,
          role,
          model,
          tokens,
          created_at
        )
      `)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return conversations || []
  },
  ['user-conversations'],
  {
    tags: ['conversations'],
    revalidate: 300, // 5 minutes
  }
)

// Supabase Edge Functions for serverless operations
export async function invalidateUserCache(userId: string): Promise<void> {
  // Use Supabase Edge Functions or custom invalidation logic
  await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/invalidate-cache`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  })
}
```

## 🛡️ Security Best Practices

### Input Sanitization
```typescript
// lib/security/sanitize.ts
import DOMPurify from 'isomorphic-dompurify'
import { z } from 'zod'

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  })
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 10000) // Limit length
}

// Rate limiting schema
export const rateLimitSchema = z.object({
  identifier: z.string(),
  limit: z.number().int().positive(),
  window: z.number().int().positive(),
})
```

### API Security with Supabase RLS
```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ratelimit } from '@/lib/ratelimit'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Create Supabase client for middleware
  const supabase = createMiddlewareClient({ req: request, res })

  // Refresh session if needed
  const { data: { session } } = await supabase.auth.getSession()

  // API route protection
  if (pathname.startsWith('/api/')) {
    // Skip auth routes and public endpoints
    const publicPaths = ['/api/auth', '/api/health', '/api/webhooks']
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
    
    if (!isPublicPath) {
      if (!session?.user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }

      // Apply rate limiting to authenticated API routes
      const identifier = session.user.id || request.ip || 'anonymous'
      const { success } = await ratelimit.limit(identifier)

      if (!success) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        )
      }
    }
  }

  // Protected route handling
  const protectedPaths = ['/dashboard', '/settings', '/chat']
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  )

  if (isProtectedPath && !session?.user) {
    const loginUrl = new URL('/auth/signin', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return res
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
    '/chat/:path*',
  ],
}
```
```

## 🧪 Testing Configuration

### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Test Setup
```typescript
// src/__tests__/setup.ts
import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/server'

// Establish API mocking before all tests
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }
  },
  useSearchParams() {
    return {
      get: vi.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  useSession() {
    return {
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          name: 'Test User',
        },
      },
      status: 'authenticated',
    }
  },
  signIn: vi.fn(),
  signOut: vi.fn(),
}))
```

### MSW API Mocking
```typescript
// src/__tests__/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/signin', () => {
    return HttpResponse.json({
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
      },
    })
  }),

  // AI Chat endpoints
  http.post('/api/ai/chat', async ({ request }) => {
    const body = await request.json()
    
    return HttpResponse.json({
      id: 'test-message-id',
      content: `AI response to: ${(body as any).message}`,
      role: 'assistant',
      model: 'gpt-4',
      tokens: 50,
      conversationId: 'test-conversation-id',
      createdAt: new Date().toISOString(),
    })
  }),

  // Conversations endpoints
  http.get('/api/conversations', () => {
    return HttpResponse.json([
      {
        id: 'test-conversation-id',
        title: 'Test Conversation',
        model: 'gpt-4',
        userId: 'test-user-id',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }),
]
```

## 🐳 Docker Configuration

### Docker Configuration with Supabase
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN corepack enable pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Supabase types
RUN pnpm supabase:generate-types

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose with Supabase
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    command: pnpm dev

  # Local Supabase for development
  supabase-db:
    image: supabase/postgres:15.1.0.117
    ports:
      - '54322:5432'
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=postgres
    volumes:
      - supabase_db_data:/var/lib/postgresql/data

  supabase-studio:
    image: supabase/studio:20231103-15e4077
    ports:
      - '54323:3000'
    environment:
      - SUPABASE_URL=http://localhost:54321
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    depends_on:
      - supabase-db

volumes:
  supabase_db_data:
```
```

## 🔍 Monitoring and Observability

### Error Tracking
```typescript
// lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs'

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    beforeSend(event) {
      // Filter sensitive data
      if (event.request?.headers) {
        delete event.request.headers.authorization
        delete event.request.headers.cookie
      }
      return event
    },
  })
}

export function captureAPIError(
  error: Error,
  context: {
    endpoint: string
    method: string
    userId?: string
  }
) {
  Sentry.withScope(scope => {
    scope.setTag('type', 'api_error')
    scope.setContext('api', context)
    if (context.userId) {
      scope.setUser({ id: context.userId })
    }
    Sentry.captureException(error)
  })
}
```

### Analytics
```typescript
// lib/analytics.ts
interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  userId?: string
}

export function trackEvent({ event, properties, userId }: AnalyticsEvent) {
  // Track with multiple providers
  if (typeof window !== 'undefined') {
    // Google Analytics
    gtag('event', event, properties)
    
    // PostHog
    posthog.capture(event, properties)
    
    // Custom analytics
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, properties, userId }),
    }).catch(console.error)
  }
}

// Usage examples
export const analytics = {
  chatMessageSent: (model: string, tokens: number) =>
    trackEvent({
      event: 'chat_message_sent',
      properties: { model, tokens },
    }),
    
  conversationCreated: (model: string) =>
    trackEvent({
      event: 'conversation_created',
      properties: { model },
    }),
    
  userSignedUp: (method: string) =>
    trackEvent({
      event: 'user_signed_up',
      properties: { method },
    }),
}
```

## 📚 Documentation Standards

### Component Documentation
```tsx
/**
 * ChatInterface - A comprehensive chat interface for AI conversations
 * 
 * Features:
 * - Real-time messaging with AI models
 * - Message history and persistence
 * - Model switching capabilities
 * - Token usage tracking
 * - Message editing and deletion
 * 
 * @example
 * ```tsx
 * <ChatInterface
 *   conversationId="conv-123"
 *   initialModel="gpt-4"
 *   onMessageSent={handleMessageSent}
 * />
 * ```
 */
interface ChatInterfaceProps {
  /** The ID of the conversation to display */
  conversationId: string
  
  /** The initial AI model to use for responses */
  initialModel?: AIModel
  
  /** Callback fired when a message is sent */
  onMessageSent?: (message: ChatMessage) => void
  
  /** Whether the interface should be in read-only mode */
  readOnly?: boolean
  
  /** Custom CSS class name */
  className?: string
}

export function ChatInterface({
  conversationId,
  initialModel = 'gpt-4',
  onMessageSent,
  readOnly = false,
  className,
}: ChatInterfaceProps) {
  // Implementation...
}
```

### API Documentation
```typescript
/**
 * POST /api/ai/chat
 * 
 * Send a message to an AI model and receive a response
 * 
 * @param {string} message - The message content to send
 * @param {string} conversationId - ID of the conversation
 * @param {AIModel} model - The AI model to use
 * 
 * @returns {ChatMessage} The AI's response message
 * 
 * @throws {400} Invalid request data
 * @throws {401} Authentication required
 * @throws {429} Rate limit exceeded
 * @throws {500} Internal server error
 * 
 * @example
 * ```typescript
 * const response = await fetch('/api/ai/chat', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     message: 'Hello, AI!',
 *     conversationId: 'conv-123',
 *     model: 'gpt-4',
 *   }),
 * })
 * ```
 */
```

## 🚀 Deployment Guidelines

### Environment Setup
```bash
# .env.example
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# AI APIs
OPENAI_API_KEY="sk-..."
GOOGLE_API_KEY="AIza..."
ANTHROPIC_API_KEY="sk-ant-..."

# Optional AI APIs
COHERE_API_KEY=""
HUGGINGFACE_API_KEY=""

# Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Monitoring
SENTRY_DSN=""

# Analytics
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_POSTHOG_KEY=""
```

### Build Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
  
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization' },
        ],
      },
    ]
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
```

## 🔄 Git Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `refactor/*` - Code refactoring
- `test/*` - Test additions or fixes

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(ai): add support for Claude AI model

- Implement Claude API provider
- Add model selection in chat interface
- Update conversation schema for model tracking
- Add tests for Claude integration

Closes #123
```

## 📊 Performance Metrics with Supabase

### Real-time Performance Monitoring
```typescript
// lib/monitoring/supabase-performance.ts
import { createClient } from '@/lib/supabase/client'

export class SupabasePerformanceMonitor {
  private static startTime: number
  private static queryCount: number = 0

  static startQuery() {
    this.startTime = performance.now()
    this.queryCount++
  }

  static endQuery(operation: string, table: string) {
    const duration = performance.now() - this.startTime
    
    // Log slow queries
    if (duration > 1000) { // 1 second threshold
      console.warn(`Slow Supabase query detected:`, {
        operation,
        table,
        duration: `${duration.toFixed(2)}ms`,
        queryCount: this.queryCount,
      })
    }

    // Send to analytics
    if (typeof window !== 'undefined') {
      gtag('event', 'supabase_query', {
        event_category: 'Performance',
        event_label: `${operation}_${table}`,
        value: Math.round(duration),
      })
    }
  }

  static async measureQuery<T>(
    operation: string,
    table: string,
    queryFn: () => Promise<T>
  ): Promise<T> {
    this.startQuery()
    try {
      const result = await queryFn()
      this.endQuery(operation, table)
      return result
    } catch (error) {
      this.endQuery(operation, table)
      throw error
    }
  }
}

// Usage example
export async function getConversationsWithMonitoring(userId: string) {
  const supabase = createClient()
  
  return SupabasePerformanceMonitor.measureQuery(
    'select',
    'conversations',
    () =>
      supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
  )
}
```

### Real-time Connection Health
```typescript
// hooks/use-supabase-health.ts
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface SupabaseHealth {
  connected: boolean
  lastPing: Date | null
  realtimeStatus: 'CONNECTING' | 'OPEN' | 'CLOSED'
  latency: number | null
}

export function useSupabaseHealth() {
  const [health, setHealth] = useState<SupabaseHealth>({
    connected: false,
    lastPing: null,
    realtimeStatus: 'CLOSED',
    latency: null,
  })

  useEffect(() => {
    const supabase = createClient()
    let pingInterval: NodeJS.Timeout

    const checkConnection = async () => {
      const startTime = performance.now()
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('count')
          .limit(1)

        const latency = performance.now() - startTime

        setHealth(prev => ({
          ...prev,
          connected: !error,
          lastPing: new Date(),
          latency,
        }))
      } catch (error) {
        setHealth(prev => ({
          ...prev,
          connected: false,
          lastPing: new Date(),
          latency: null,
        }))
      }
    }

    // Monitor realtime connection
    const channel = supabase.channel('health-check')
    
    channel
      .on('system', {}, (payload) => {
        setHealth(prev => ({
          ...prev,
          realtimeStatus: payload.status || 'CLOSED',
        }))
      })
      .subscribe((status) => {
        setHealth(prev => ({
          ...prev,
          realtimeStatus: status,
        }))
      })

    // Ping every 30 seconds
    pingInterval = setInterval(checkConnection, 30000)
    
    // Initial check
    checkConnection()

    return () => {
      clearInterval(pingInterval)
      channel.unsubscribe()
    }
  }, [])

  return health
}
```

## 🔍 Debugging and Troubleshooting

### Supabase Debug Tools
```typescript
// lib/debug/supabase-debugger.ts
import { createClient } from '@/lib/supabase/client'

export class SupabaseDebugger {
  private static logLevel: 'error' | 'warn' | 'info' | 'debug' = 'info'

  static setLogLevel(level: 'error' | 'warn' | 'info' | 'debug') {
    this.logLevel = level
  }

  static log(level: 'error' | 'warn' | 'info' | 'debug', message: string, data?: any) {
    const levels = { error: 0, warn: 1, info: 2, debug: 3 }
    const currentLevel = levels[this.logLevel]
    const messageLevel = levels[level]

    if (messageLevel <= currentLevel) {
      console[level](`[Supabase ${level.toUpperCase()}] ${message}`, data || '')
    }
  }

  static async debugQuery(
    tableName: string,
    query: any,
    expectedResult?: string
  ) {
    this.log('debug', `Executing query on ${tableName}`, query)
    
    const startTime = performance.now()
    const result = await query
    const duration = performance.now() - startTime

    this.log('info', `Query completed in ${duration.toFixed(2)}ms`, {
      table: tableName,
      rowCount: result.data?.length || 0,
      error: result.error,
    })

    if (result.error) {
      this.log('error', `Query failed on ${tableName}`, result.error)
    }

    if (expectedResult && !result.error) {
      this.log('debug', `Expected: ${expectedResult}, Got: ${result.data?.length} rows`)
    }

    return result
  }

  static async testRLSPolicies(userId: string) {
    const supabase = createClient()
    const tests = []

    // Test user can read own conversations
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)

      tests.push({
        test: 'Read own conversations',
        passed: !error,
        error: error?.message,
      })
    } catch (err) {
      tests.push({
        test: 'Read own conversations',
        passed: false,
        error: (err as Error).message,
      })
    }

    // Test user cannot read other users' conversations
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .neq('user_id', userId)

      tests.push({
        test: 'Cannot read others conversations',
        passed: !data || data.length === 0,
        error: error?.message,
      })
    } catch (err) {
      tests.push({
        test: 'Cannot read others conversations',
        passed: true, // RLS should block this
        error: 'Blocked by RLS (expected)',
      })
    }

    this.log('info', 'RLS Policy Tests', tests)
    return tests
  }
}

// Development helper
if (process.env.NODE_ENV === 'development') {
  SupabaseDebugger.setLogLevel('debug')
  
  // Add global debug helpers
  ;(window as any).supabaseDebug = {
    testRLS: SupabaseDebugger.testRLSPolicies,
    setLogLevel: SupabaseDebugger.setLogLevel,
  }
}
```

## 📚 Additional Resources and Best Practices

### Supabase Specific Resources
```typescript
// lib/resources.ts
export const supabaseResources = {
  documentation: {
    main: 'https://supabase.com/docs',
    auth: 'https://supabase.com/docs/guides/auth',
    database: 'https://supabase.com/docs/guides/database',
    realtime: 'https://supabase.com/docs/guides/realtime',
    rls: 'https://supabase.com/docs/guides/auth/row-level-security',
    storage: 'https://supabase.com/docs/guides/storage',
    edgeFunctions: 'https://supabase.com/docs/guides/functions',
  },
  
  tools: {
    cli: 'https://supabase.com/docs/reference/cli',
    studio: 'https://supabase.com/docs/guides/getting-started/local-development#supabase-studio',
    migrations: 'https://supabase.com/docs/guides/cli/local-development#database-migrations',
  },
  
  bestPractices: {
    performance: 'https://supabase.com/docs/guides/database/performance',
    security: 'https://supabase.com/docs/guides/auth/row-level-security#tips',
    realtime: 'https://supabase.com/docs/guides/realtime/rate-limits',
  },
} as const
```

### Common Supabase Patterns
```typescript
// lib/patterns/supabase-patterns.ts

// 1. Optimistic Updates Pattern
export async function optimisticUpdate<T>(
  optimisticData: T,
  actualUpdate: () => Promise<T>,
  rollback: (data: T) => void
) {
  // Apply optimistic update immediately
  const previousData = optimisticData
  
  try {
    // Perform actual update
    const result = await actualUpdate()
    return result
  } catch (error) {
    // Rollback on failure
    rollback(previousData)
    throw error
  }
}

// 2. Subscription Cleanup Pattern
export function useSupabaseSubscription(
  channelName: string,
  callback: (payload: any) => void,
  dependencies: any[] = []
) {
  useEffect(() => {
    const supabase = createClient()
    
    const subscription = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public' }, callback)
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, dependencies)
}

// 3. Batch Operations Pattern
export async function batchInsert<T>(
  tableName: string,
  records: T[],
  batchSize: number = 100
) {
  const supabase = createClient()
  const results = []
  
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize)
    
    const { data, error } = await supabase
      .from(tableName)
      .insert(batch)
      .select()

    if (error) throw error
    results.push(...(data || []))
  }
  
  return results
}
```

## 🚀 Final Notes for Supabase Integration

This comprehensive guide provides everything needed for building scalable, secure Next.js applications with Supabase. Key highlights:

### **🔑 Key Advantages of Supabase Integration:**
1. **Built-in Authentication** - OAuth providers, email auth, phone auth
2. **Real-time Subscriptions** - Live data updates without additional infrastructure
3. **Row Level Security** - Database-level security policies
4. **Auto-generated APIs** - RESTful and GraphQL APIs from your schema
5. **Edge Functions** - Serverless functions close to your users
6. **Storage Integration** - File uploads and management

### **🛡️ Security Best Practices:**
1. **Always use RLS policies** for data protection
2. **Validate inputs** with Zod schemas
3. **Use service role key** only on server-side operations
4. **Implement rate limiting** on API routes
5. **Monitor real-time usage** to prevent abuse

### **⚡ Performance Optimization:**
1. **Use indexes** on frequently queried columns
2. **Implement proper caching** strategies
3. **Clean up subscriptions** to prevent memory leaks
4. **Monitor query performance** with built-in tools
5. **Use pagination** for large datasets

### **🧪 Testing Strategy:**
1. **Test RLS policies** thoroughly
2. **Mock Supabase client** in tests
3. **Test real-time subscriptions** cleanup
4. **Validate auth flows** end-to-end
5. **Performance test** under load

Remember: Supabase provides a complete backend-as-a-service solution that scales with your application while maintaining developer productivity and security. Always refer to the latest Supabase documentation for the most current best practices and features.

Happy coding with Next.js and Supabase! 🚀 file paths** and import statements before use
- **Keep CLAUDE.md updated** when adding new patterns or dependencies
- **Test your code** - No feature is complete without tests
- **Document your decisions** - Future developers will thank you
- **Use TypeScript strictly** - No `any` types in production code
- **Optimize for performance** - Server Components by default, Client Components when needed
- **Follow security best practices** - Validate inputs, sanitize outputs, implement proper auth

## 🔧 Development Tools Configuration

### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-const': 'error',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
```

### Prettier Configuration
```javascript
// .prettierrc.js
module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss'],
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

## 📊 Performance Metrics

### Core Web Vitals Monitoring
```typescript
// lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function reportWebVitals() {
  getCLS(metric => {
    console.log('CLS:', metric)
    // Send to analytics
    gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: 'CLS',
      value: Math.round(metric.value * 1000),
    })
  })

  getFID(metric => {
    console.log('FID:', metric)
    gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: 'FID',
      value: Math.round(metric.value),
    })
  })

  getFCP(metric => {
    console.log('FCP:', metric)
    gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: 'FCP',
      value: Math.round(metric.value),
    })
  })

  getLCP(metric => {
    console.log('LCP:', metric)
    gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: 'LCP',
      value: Math.round(metric.value),
    })
  })

  getTTFB(metric => {
    console.log('TTFB:', metric)
    gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: 'TTFB',
      value: Math.round(metric.value),
    })
  })
}
```

## 🚀 Final Notes

This guide provides a comprehensive foundation for building scalable, maintainable Next.js applications with AI integration. Remember to:

1. **Start simple** and iterate based on requirements
2. **Prioritize user experience** and performance
3. **Maintain code quality** through testing and reviews
4. **Document everything** for future maintainers
5. **Stay updated** with Next.js and React best practices
6. **Security first** - validate inputs, sanitize outputs, protect routes
7. **Monitor and measure** - track performance, errors, and user behavior

