# Next.js + Node.js Project Development Rules

### 🔄 Project Awareness & Context
- **Always read `PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `TASK.md`** before starting a new task. If the task isn't listed, add it with a brief description and today's date.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `PLANNING.md`.
- **Use the correct package manager** (npm/yarn/pnpm) as specified in the project. Install dependencies in the appropriate workspace (frontend/backend).

### 🧱 Code Structure & Modularity
- **Never create a file longer than 500 lines of code.** If a file approaches this limit, refactor by splitting it into modules or helper files.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.
  
  **Frontend (Next.js) structure:**
  - `components/` - Reusable UI components
  - `pages/` or `app/` - Route components (depending on App Router vs Pages Router)
  - `lib/` - Utility functions and configurations
  - `hooks/` - Custom React hooks
  - `types/` - TypeScript type definitions
  - `styles/` - CSS/styling files

  **Backend (Node.js) structure:**
  - `routes/` or `controllers/` - API endpoint handlers
  - `middleware/` - Express middleware functions
  - `models/` - Database models/schemas
  - `services/` - Business logic layer
  - `utils/` - Helper functions
  - `config/` - Configuration files

- **Use clear, consistent imports** (prefer absolute imports with path mapping for better maintainability).
- **Use environment variables** with proper `.env` file management and validation.

### 🧪 Testing & Reliability
- **Always create tests for new features** using the appropriate testing framework:
  - **Frontend**: Jest + React Testing Library for components, Cypress/Playwright for E2E
  - **Backend**: Jest/Vitest + Supertest for API endpoints
- **After updating any logic**, check whether existing tests need to be updated. If so, do it.
- **Tests should live in appropriate folders**:
  - `__tests__/` folders alongside components/modules, or
  - `/tests` folder mirroring the main app structure
  - Include at least:
    - 1 test for expected behavior
    - 1 edge case
    - 1 error/failure case

### ✅ Task Completion
- **Mark completed tasks in `TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a "Discovered During Work" section.

### 📎 Style & Conventions
- **Use TypeScript** for both frontend and backend for better type safety.
- **Follow consistent code formatting** using Prettier and ESLint configurations.
- **Use proper TypeScript types** and interfaces, avoid `any` type.

**Frontend conventions:**
- Use **functional components with hooks** over class components
- Follow **React best practices** (proper key props, useEffect dependencies, etc.)
- Use **Tailwind CSS** or styled-components for consistent styling
- Implement **proper error boundaries** and loading states

**Backend conventions:**
- Use **Express.js** with proper middleware structure
- Implement **input validation** using libraries like Zod or Joi
- Use **proper HTTP status codes** and consistent error responses
- Follow **RESTful API design** or GraphQL conventions

- Write **JSDoc comments for complex functions**:
  ```typescript
  /**
   * Brief summary of the function
   * @param param1 - Description of parameter
   * @param param2 - Description of parameter
   * @returns Description of return value
   */
  function example(param1: string, param2: number): boolean {
    // implementation
  }
  ```

### 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add an inline `// Reason:` comment** explaining the why, not just the what.
- **Document API endpoints** using tools like Swagger/OpenAPI for backend routes.

### 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or packages** – only use known, verified npm packages from the ecosystem.
- **Always confirm file paths and module names** exist before referencing them in code or tests.
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `TASK.md`.
- **Check package.json** for existing dependencies before suggesting new ones.
- **Respect the chosen architecture** (App Router vs Pages Router, monorepo vs separate repos, etc.).

### 🔒 Security & Best Practices
- **Never commit sensitive data** (API keys, passwords) to version control.
- **Validate all user inputs** on both frontend and backend.
- **Use proper authentication/authorization** patterns.
- **Implement proper CORS configuration** for API endpoints.
- **Use HTTPS** in production and secure headers middleware.

### 🎯 Performance Considerations
- **Optimize bundle sizes** with proper code splitting and tree shaking.
- **Use Next.js built-in optimizations** (Image component, dynamic imports, etc.).
- **Implement proper caching strategies** for both client and server.
- **Monitor and optimize database queries** and API response times.