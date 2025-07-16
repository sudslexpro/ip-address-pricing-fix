# Lex Protector Authentication System

A comprehensive authentication system built with Next.js 15, NextAuth.js, and Prisma supporting multiple OAuth providers and email/password authentication.

## Features

- 🔐 **Multiple Authentication Methods**

  - Email/Password authentication
  - Google OAuth
  - Facebook OAuth
  - Twitter OAuth
  - SSO/SAML support (enterprise)

- 🛡️ **Security Features**

  - Password hashing with bcrypt
  - JWT tokens for session management
  - Protected routes with middleware
  - Role-based access control (USER, ADMIN, SUPER_ADMIN)

- 📱 **User Experience**

  - Modern, responsive UI components
  - Password strength validation
  - Email verification support
  - Password reset functionality
  - User dashboard and profile management

- 🏗️ **Technical Stack**
  - Next.js 15 with App Router
  - NextAuth.js for authentication
  - Prisma ORM with PostgreSQL
  - TypeScript for type safety
  - Tailwind CSS + shadcn/ui components

## Setup Instructions

### 1. Environment Configuration

Copy the environment template:

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/lex_protector_db"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-replace-with-random-string

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
```

### 2. Database Setup

1. **Install PostgreSQL** (if not already installed)
2. **Create a database:**

   ```sql
   CREATE DATABASE lex_protector_db;
   ```

3. **Run database migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

### 3. OAuth Provider Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

#### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URI: `http://localhost:3000/api/auth/callback/facebook`

#### Twitter OAuth

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Enable OAuth 2.0
4. Add callback URL: `http://localhost:3000/api/auth/callback/twitter`

### 4. Install Dependencies

```bash
yarn install
```

### 5. Run the Application

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## Authentication Routes

- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page
- `/auth/forgot-password` - Password reset request
- `/dashboard` - Protected user dashboard
- `/api/auth/register` - Registration API endpoint
- `/api/auth/forgot-password` - Password reset API endpoint

## Protected Routes

Routes are automatically protected using NextAuth.js middleware. The following routes require authentication:

- `/dashboard/*` - User dashboard and settings
- Any route not explicitly listed as public in `middleware.ts`

## Database Schema

The system includes the following models:

- **User** - Core user information
- **Account** - OAuth account linking
- **Session** - User sessions
- **UserProfile** - Extended user profile data
- **VerificationToken** - Email verification tokens
- **PasswordResetToken** - Password reset tokens

## Role-Based Access

Users can have the following roles:

- `USER` - Default role for regular users
- `ADMIN` - Administrative access
- `SUPER_ADMIN` - Full system access

## SSO/SAML Configuration

For enterprise SSO, add SAML configuration to your environment:

```env
SAML_ISSUER=your-saml-issuer
SAML_ENTRY_POINT=your-saml-entry-point
SAML_CERT=your-saml-certificate
```

## API Documentation

### Registration Endpoint

```json
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Password Reset Endpoint

```json
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## Components

Key authentication components:

- `SignInPage` - Login form with OAuth buttons
- `SignUpPage` - Registration form
- `ForgotPasswordPage` - Password reset request
- `DashboardPage` - Protected user dashboard
- `AuthProvider` - NextAuth session provider
- `Header` - Navigation with auth-aware menu

## Security Considerations

- Passwords are hashed using bcrypt with 12 rounds
- JWT tokens are signed with NEXTAUTH_SECRET
- OAuth state parameters prevent CSRF attacks
- Database queries use Prisma's built-in SQL injection protection
- Environment variables contain sensitive configuration

## Development

To contribute to the authentication system:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## Troubleshooting

**Database Connection Issues:**

- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

**OAuth Errors:**

- Verify client IDs and secrets
- Check redirect URIs match exactly
- Ensure OAuth apps are in development/production mode as appropriate

**Session Issues:**

- Verify NEXTAUTH_SECRET is set
- Clear browser cookies and try again
- Check that NEXTAUTH_URL matches your domain

## License

This authentication system is part of the Lex Protector Portal project.
