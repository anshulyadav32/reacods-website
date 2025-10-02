# Testing Guide

This document outlines the comprehensive testing setup for the Record Repo full-stack application.

## 🧪 Testing Stack

### Backend Testing
- **Jest** - Unit and integration testing
- **Supertest** - API endpoint testing
- **@nestjs/testing** - NestJS testing utilities

### Frontend Testing
- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing

## 🚀 Running Tests

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Debug E2E tests
npm run test:e2e:debug
```

## 📋 Test Structure

### Backend Tests

```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.service.spec.ts     # Unit tests for auth service
│   │   └── auth.controller.spec.ts   # Unit tests for auth controller
│   └── ...
└── test/
    ├── auth.e2e-spec.ts             # E2E tests for auth endpoints
    └── app.e2e-spec.ts               # E2E tests for app
```

### Frontend Tests

```
frontend/
├── src/
│   ├── stores/
│   │   └── __tests__/
│   │       └── auth.store.test.ts    # Store unit tests
│   └── app/
│       └── auth/
│           └── login/
│               └── __tests__/
│                   └── page.test.tsx # Component tests
└── tests/
    └── e2e/
        └── auth.spec.ts              # E2E tests
```

## 🔧 Test Configuration

### Jest Configuration (Backend)
- **Environment**: Node.js
- **Coverage**: Enabled
- **Transform**: TypeScript files
- **Test Files**: `*.spec.ts`

### Jest Configuration (Frontend)
- **Environment**: jsdom
- **Setup**: Custom setup file
- **Mocks**: Next.js router, fetch, localStorage
- **Coverage**: Component and utility functions

### Playwright Configuration
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: iPhone 12, Pixel 5
- **Base URL**: http://localhost:3000
- **Parallel**: Enabled

## 📊 Test Coverage

### Backend Coverage
- **Services**: Authentication, User management
- **Controllers**: API endpoints
- **Guards**: JWT authentication
- **Strategies**: Passport strategies

### Frontend Coverage
- **Stores**: Zustand state management
- **Components**: React components
- **Pages**: Authentication pages
- **API Routes**: Next.js API routes

### E2E Coverage
- **Authentication Flow**: Login, Register, Logout
- **Protected Routes**: Dashboard access
- **Error Handling**: Invalid credentials
- **Form Validation**: Input validation

## 🎯 Test Scenarios

### Authentication Tests

#### Backend
- ✅ User registration with valid data
- ✅ User login with correct credentials
- ✅ JWT token generation and validation
- ✅ Refresh token functionality
- ✅ Password hashing
- ✅ Error handling for invalid credentials

#### Frontend
- ✅ Login form submission
- ✅ Registration form validation
- ✅ State management updates
- ✅ Error message display
- ✅ Loading states
- ✅ Protected route access

#### E2E
- ✅ Complete login flow
- ✅ Complete registration flow
- ✅ Logout functionality
- ✅ Protected route redirection
- ✅ Form validation errors

## 🔍 Debugging Tests

### Backend Debugging
```bash
# Debug specific test
npm run test:debug -- --testNamePattern="AuthService"

# Debug with verbose output
npm test -- --verbose

# Debug E2E tests
npm run test:e2e -- --verbose
```

### Frontend Debugging
```bash
# Debug unit tests
npm test -- --verbose

# Debug E2E tests with UI
npm run test:e2e:ui

# Debug specific E2E test
npm run test:e2e:debug -- tests/e2e/auth.spec.ts
```

## 📈 Continuous Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd backend && npm ci
      - run: cd backend && npm test
      - run: cd backend && npm run test:e2e

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd frontend && npm ci
      - run: cd frontend && npm test
      - run: cd frontend && npm run test:e2e
```

## 🛠️ Test Utilities

### Mock Data
- **Users**: Test user objects
- **Tokens**: JWT tokens for testing
- **API Responses**: Mock API responses

### Test Helpers
- **Database**: Test database setup/teardown
- **Authentication**: Mock authentication states
- **API**: Mock API endpoints

### Custom Matchers
- **Jest**: Custom matchers for API responses
- **Playwright**: Custom assertions for UI elements

## 📝 Writing Tests

### Unit Test Example
```typescript
describe('AuthService', () => {
  it('should validate user credentials', async () => {
    const result = await authService.validateUser('test@example.com', 'password');
    expect(result).toBeDefined();
    expect(result.email).toBe('test@example.com');
  });
});
```

### Component Test Example
```typescript
test('should render login form', () => {
  render(<LoginPage />);
  expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
});
```

### E2E Test Example
```typescript
test('should login successfully', async ({ page }) => {
  await page.goto('/auth/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## 🎉 Best Practices

1. **Test Isolation**: Each test should be independent
2. **Mock External Dependencies**: Use mocks for APIs and databases
3. **Clear Test Names**: Describe what the test is testing
4. **Arrange-Act-Assert**: Structure tests clearly
5. **Coverage Goals**: Aim for >80% code coverage
6. **Fast Tests**: Keep unit tests fast, E2E tests can be slower
7. **Reliable Tests**: Avoid flaky tests with proper waits and assertions

---

**Happy Testing! 🧪✨**

