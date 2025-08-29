# ChatBot Authentication System

This document describes the authentication system implemented for the ChatBot application.

## Features

### 🔐 Authentication Features
- **Login/Signup Form**: Unified form that toggles between login and signup modes
- **Form Validation**: Client-side validation with error messages
- **Social Login**: Google and GitHub OAuth buttons (UI only, needs backend integration)
- **Responsive Design**: Mobile-friendly design with dark/light theme support
- **Protected Routes**: Automatic redirection for unauthenticated users

### 🎨 UI Components
- **AuthForm**: Main authentication form component
- **Input**: Reusable form input component with error handling
- **Button**: Enhanced button component with loading states
- **ThemeToggle**: Dark/light theme switcher

### 🚀 Technical Features
- **Context API**: React Context for global authentication state
- **Local Storage**: Persistent authentication state
- **Route Protection**: Automatic route protection and redirection
- **TypeScript**: Full type safety throughout the system

## File Structure

```
components/
├── auth/
│   ├── AuthForm.tsx          # Main authentication form
│   ├── AuthRedirect.tsx      # Redirect component for authenticated users
│   └── ProtectedRoute.tsx    # Route protection wrapper
├── ui/
│   ├── Button.tsx            # Enhanced button component
│   └── Input.tsx             # Form input component
lib/
├── auth-context.tsx          # Authentication context
└── utils.ts                  # Utility functions
app/
├── auth/
│   └── page.tsx              # Authentication page
├── layout.tsx                # Root layout with providers
└── page.tsx                  # Protected main page
```

## Usage

### 1. Authentication Flow
1. User visits `/auth` page
2. User fills out login/signup form
3. Form validates input and submits
4. User is redirected to main chat page
5. Unauthenticated users are automatically redirected to `/auth`

### 2. Protected Routes
Wrap any component that requires authentication with `ProtectedRoute`:

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function MyPage() {
  return (
    <ProtectedRoute>
      <div>Protected content here</div>
    </ProtectedRoute>
  )
}
```

### 3. Using Authentication Context
Access authentication state and functions in any component:

```tsx
import { useAuth } from '@/lib/auth-context'

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  if (isAuthenticated) {
    return <div>Welcome, {user?.name}!</div>
  }
  
  return <div>Please log in</div>
}
```

## Configuration

### Environment Variables
Currently, the system uses mock authentication. To integrate with a real backend:

1. Create `.env.local` file
2. Add your backend API endpoints
3. Update the auth context functions to make real API calls

### Backend Integration
Replace the mock functions in `auth-context.tsx`:

```tsx
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  if (!response.ok) {
    throw new Error('Login failed')
  }
  
  const user = await response.json()
  setUser(user)
}
```

## Styling

The authentication system uses Tailwind CSS with:
- **Responsive Design**: Mobile-first approach
- **Dark/Light Themes**: Automatic theme switching
- **Custom Colors**: Primary, accent, and semantic color schemes
- **Smooth Transitions**: CSS transitions for better UX

## Security Considerations

### Current Implementation
- Client-side validation only
- Local storage for persistence
- No CSRF protection
- No rate limiting

### Production Recommendations
- Implement server-side validation
- Use HTTP-only cookies for session management
- Add CSRF tokens
- Implement rate limiting
- Use HTTPS in production
- Add password strength requirements
- Implement account lockout after failed attempts

## Future Enhancements

- [ ] Real backend integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Remember me functionality
- [ ] Session management
- [ ] Role-based access control

## Testing

To test the authentication system:

1. Start the development server: `npm run dev`
2. Visit `/auth` to see the login/signup form
3. Try switching between login and signup modes
4. Test form validation with invalid inputs
5. Test successful authentication flow
6. Test protected route access

## Troubleshooting

### Common Issues

1. **Form not submitting**: Check browser console for validation errors
2. **Redirect loops**: Ensure `AuthRedirect` and `ProtectedRoute` are properly configured
3. **Styling issues**: Verify Tailwind CSS is properly configured
4. **TypeScript errors**: Check that all imports are correct

### Debug Mode
Enable debug logging by adding console.log statements in the auth context functions.

## Contributing

When adding new authentication features:

1. Follow the existing component structure
2. Add proper TypeScript types
3. Include error handling
4. Test both light and dark themes
5. Ensure mobile responsiveness
6. Update this documentation
