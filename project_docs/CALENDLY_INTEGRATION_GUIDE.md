# Calendly Integration Guide

This document explains how to integrate and configure Calendly for appointment scheduling in the Lex Protector Portal.

## Overview

The application includes a complete Calendly integration that allows users to schedule demos and appointments directly through modal popups. The integration uses the official Calendly Widget API.

## Components

### 1. CalendlyBookingModal (`components/scheduling/CalendlyBookingModal.tsx`)

A modal component that displays an embedded Calendly widget for appointment booking.

**Props:**

- `isOpen: boolean` - Controls modal visibility
- `onClose: () => void` - Callback when modal is closed
- `calendlyUrl?: string` - Optional Calendly URL override

**Features:**

- Embedded Calendly widget with responsive design
- Loading states and error handling
- UTM tracking for analytics
- Fallback direct link option

### 2. useCalendly Hook (`hooks/useCalendly.ts`)

A custom React hook that manages Calendly script loading and provides utility functions.

**Returns:**

- `isLoaded: boolean` - Whether Calendly script is loaded
- `openPopup: (options) => void` - Open Calendly in popup mode
- `closePopup: () => void` - Close any open Calendly popups
- `initInlineWidget: (elementId, options) => void` - Initialize inline widget

### 3. Calendly Configuration (`lib/calendly-config.ts`)

Centralized configuration for Calendly settings.

**Key Settings:**

- `CALENDLY_CONFIG.URL` - Your main Calendly URL
- `CALENDLY_EVENT_TYPES` - Different meeting types
- `UTM_PARAMS` - Tracking parameters
- `WIDGET_SETTINGS` - Visual customization

## Setup Instructions

### 1. Update Calendly URL

Replace the placeholder URL in `lib/calendly-config.ts`:

```typescript
export const CALENDLY_CONFIG = {
 // Replace with your actual Calendly URL
 URL: "https://calendly.com/your-actual-username",
 // ... other settings
};
```

### 2. Configure Event Types

Update the `CALENDLY_EVENT_TYPES` object with your actual event type URLs:

```typescript
export const CALENDLY_EVENT_TYPES = {
 DEMO: "30min-demo", // Your 30-minute demo event
 CONSULTATION: "60min-consultation", // Your consultation event
 ONBOARDING: "onboarding-session", // Your onboarding event
 SUPPORT: "support-call", // Your support event
};
```

### 3. Customize Branding

Update the widget settings to match your brand:

```typescript
WIDGET_SETTINGS: {
  primaryColor: "00a2ff", // Your brand primary color (hex without #)
  textColor: "ffffff", // Text color
  backgroundColor: "ffffff", // Background color
},
```

### 4. Analytics Setup

The integration includes UTM tracking. Update the parameters in `CALENDLY_CONFIG.UTM_PARAMS`:

```typescript
UTM_PARAMS: {
  utmCampaign: "your-campaign-name",
  utmSource: "website",
  utmMedium: "booking-widget",
},
```

## Usage Examples

### Basic Usage

```tsx
import { CalendlyBookingModal } from "@/components/scheduling";

function MyComponent() {
 const [isOpen, setIsOpen] = useState(false);

 return (
  <>
   <button onClick={() => setIsOpen(true)}>Schedule Meeting</button>

   <CalendlyBookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  </>
 );
}
```

### With Custom URL

```tsx
<CalendlyBookingModal
 isOpen={isOpen}
 onClose={() => setIsOpen(false)}
 calendlyUrl="https://calendly.com/your-username/special-event"
/>
```

### Using the Hook

```tsx
import { useCalendly } from "@/hooks/useCalendly";

function MyComponent() {
 const { isLoaded, openPopup } = useCalendly();

 const handleBooking = () => {
  if (isLoaded) {
   openPopup({
    url: "https://calendly.com/your-username/30min",
    prefill: { name: "John Doe", email: "john@example.com" },
    utm: { utmSource: "my-page" },
   });
  }
 };

 return (
  <button onClick={handleBooking} disabled={!isLoaded}>
   {isLoaded ? "Schedule Meeting" : "Loading..."}
  </button>
 );
}
```

## Calendly Account Setup

### 1. Create Event Types

In your Calendly dashboard:

1. Go to "Event Types"
2. Create different meeting types (Demo, Consultation, etc.)
3. Configure duration, availability, and settings
4. Note the URL for each event type

### 2. Embed Settings

Configure your Calendly account for embedding:

1. Go to Account Settings > Embed Options
2. Enable iframe embedding
3. Configure allowed domains (add your website domain)
4. Set up custom branding if needed

### 3. Integrations

Set up integrations for better workflow:

1. **CRM Integration**: Connect to HubSpot, Salesforce, etc.
2. **Calendar Sync**: Connect to Google Calendar, Outlook
3. **Video Conferencing**: Set up Zoom, Google Meet, or Teams
4. **Notifications**: Configure email and SMS reminders

## Security Considerations

### Domain Whitelisting

Add your domain to Calendly's allowed domains:

1. Go to Calendly Account Settings > Security
2. Add your production and staging domains
3. Enable domain restrictions if needed

### Data Privacy

The integration respects user privacy:

- No personal data is stored locally
- All booking data goes directly to Calendly
- UTM parameters are used only for analytics
- Users can cancel/reschedule through Calendly

## Troubleshooting

### Common Issues

1. **Widget not loading**: Check if the Calendly URL is correct and accessible
2. **Script errors**: Ensure the Calendly script loads properly
3. **Styling issues**: Verify CSS doesn't interfere with Calendly widget
4. **Domain errors**: Add your domain to Calendly's allowed list

### Debug Mode

Enable debug mode by adding this to your component:

```tsx
useEffect(() => {
 if (window.Calendly) {
  console.log("Calendly loaded successfully");
 }
}, []);
```

### Testing

Test the integration:

1. Verify modal opens correctly
2. Check if widget loads without errors
3. Test booking flow end-to-end
4. Verify UTM tracking in Calendly analytics

## Best Practices

1. **Performance**: Load Calendly script only when needed
2. **User Experience**: Show loading states while script loads
3. **Analytics**: Use UTM parameters for proper tracking
4. **Accessibility**: Ensure modal is keyboard accessible
5. **Mobile**: Test on mobile devices for responsive behavior

## API Reference

For advanced integrations, refer to:

- [Calendly Developer Documentation](https://developer.calendly.com/)
- [Calendly Widget API](https://calendly.com/integration)
- [Calendly Webhook API](https://developer.calendly.com/api-docs/ZG9jOjQ2NDA2NA-webhook-subscriptions)
