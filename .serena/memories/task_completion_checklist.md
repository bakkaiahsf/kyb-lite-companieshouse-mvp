# Task Completion Checklist

## Before Marking Any Task Complete

### 1. Code Quality Checks
- [ ] **TypeScript Compilation**: `npm run type-check`
- [ ] **Linting**: `npm run lint` (should produce no errors)
- [ ] **Code Formatting**: Prettier formatting should be applied

### 2. Testing Requirements
- [ ] **Unit Tests**: `npm run test` (all tests pass)
- [ ] **Test Coverage**: Verify adequate coverage for new code
- [ ] **E2E Tests**: `npm run test:e2e` (if applicable)

### 3. Build Validation
- [ ] **Development Build**: `npm run dev` starts without errors
- [ ] **Production Build**: `npm run build` completes successfully
- [ ] **No Build Warnings**: Address any webpack or Next.js warnings

### 4. Environment Configuration
- [ ] **Environment Variables**: All required vars properly configured
- [ ] **Zod Validation**: Environment schema validation passes
- [ ] **Database Connection**: Supabase connectivity verified
- [ ] **External APIs**: Third-party service connections tested

### 5. Security & Performance
- [ ] **No Sensitive Data**: No hardcoded secrets or API keys
- [ ] **Error Handling**: Proper error boundaries and validation
- [ ] **Performance**: No obvious performance regressions

### 6. Documentation
- [ ] **Code Comments**: Complex logic properly documented
- [ ] **Type Definitions**: Interfaces and types properly defined
- [ ] **README Updates**: If public APIs changed

## Quality Gates
1. All tests must pass (zero failures)
2. TypeScript compilation must succeed
3. Linting must produce zero errors
4. Build process must complete without errors
5. Environment validation must pass