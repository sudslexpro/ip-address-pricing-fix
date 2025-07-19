# OAuth Troubleshooting Guide

## Issue Summary

You're experiencing an `ETIMEDOUT` error during Google OAuth authentication. This is a common issue that can be resolved with the following steps.

## Root Cause

The `ETIMEDOUT` error indicates that the OAuth callback is timing out during the authentication flow. This typically happens due to:

1. **Network connectivity issues**
2. **Incorrect OAuth redirect URIs in Google Console**
3. **OAuth provider configuration problems**
4. **Timeout issues with the authentication flow**

## Solution Steps

### 1. Google Console Configuration

Ensure your Google OAuth settings are configured correctly:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, make sure you have:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)

### 2. Environment Variables

Verify your `.env.local` file has the correct Google OAuth credentials:

```env
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### 3. Network and Firewall

- Ensure your internet connection is stable
- Check if any firewall or proxy is blocking OAuth requests
- Try using a different network if possible

### 4. Browser Settings

- Clear browser cache and cookies
- Disable browser extensions that might interfere with OAuth
- Try using an incognito/private browsing window

### 5. OAuth Provider Alternatives

If Google OAuth continues to fail, you can:

- Use the credentials provider (email/password) instead
- Test with a different OAuth provider
- Contact Google support if the issue persists

## Changes Made

I've updated your authentication configuration with:

1. **Enhanced Error Handling**: Added proper error logging and debugging
2. **Timeout Configuration**: Added 10-second timeout for OAuth requests
3. **Custom Error Page**: Created `/auth/error` page with troubleshooting information
4. **Next.js Configuration**: Added headers for better OAuth handling

## Testing Steps

1. **Restart your development server**:

   ```bash
   yarn dev
   ```

2. **Try the OAuth flow again**:

   - Go to `http://localhost:3000/auth/signin`
   - Click "Sign in with Google"
   - Monitor the console for detailed error messages

3. **Check the error page**:
   - If the OAuth fails, you'll be redirected to `/auth/error` with detailed troubleshooting information

## Additional Debugging

If the issue persists, enable debug mode by checking the console logs. The enhanced error handling will provide more detailed information about what's failing in the OAuth flow.

## Next Steps

1. Verify your Google Console OAuth configuration
2. Test with a fresh browser session
3. Check your network connectivity
4. Try the updated error handling to get more detailed error information

The timeout and error handling improvements should resolve most OAuth callback issues. If you continue to experience problems, the detailed error logging will help identify the specific cause.
