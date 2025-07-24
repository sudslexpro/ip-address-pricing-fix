# Calendly Integration Guide

## Overview

This guide explains how to integrate Calendly scheduling into the Lex Protector Portal. The project includes a flexible `CalendlyScheduler` component that can display Calendly booking widgets in modals with automatic URL generation for different meeting durations.

## Table of Contents

1. [Quick Setup](#quick-setup)
2. [Component Architecture](#component-architecture)
3. [Configuration Options](#configuration-options)
4. [URL Structure](#url-structure)
5. [Implementation Examples](#implementation-examples)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

## Quick Setup

### Step 1: Get Your Calendly URL

1. Log into your [Calendly dashboard](https://calendly.com)
2. Find your scheduling link (usually looks like `https://calendly.com/your-username`)
3. Copy the base URL (without any specific event type suffix)

### Step 2: Configure the Component

Update any component using `CalendlyScheduler` with your actual URL:

```tsx
<CalendlyScheduler
 calendlyUrl="https://calendly.com/your-username"
 eventType="demo"
 title="Schedule Your Demo"
 buttonText="Book Now"
/>
```

### Step 3: Test the Integration

1. Run your development server: `yarn dev`
2. Navigate to the page with the Calendly component
3. Click the scheduling button to test the modal and iframe

## Component Architecture

### Core Files

- **`components/scheduling/CalendlyScheduler.tsx`** - Main component
- **`components/ui/modal.tsx`** - Modal system for displaying Calendly
- **`components/scheduling/index.ts`** - Export barrel

### Component Features

- **Two-step Experience**: Info view → Widget view
- **Automatic URL Generation**: Appends duration suffixes to base URL
- **Error Handling**: Shows configuration errors when URL is missing
- **Responsive Design**: Works on desktop and mobile
- **Modal Integration**: Uses Radix UI Dialog primitives

## Configuration Options

### CalendlyScheduler Props

```tsx
interface CalendlySchedulerProps {
 /** Base Calendly URL (without duration suffix) */
 calendlyUrl?: string;

 /** Event type for the Calendly URL */
 eventType?: "consultation" | "demo" | "15min" | "30min" | "45min" | "60min";

 /** Custom title for the scheduler */
 title?: string;

 /** Custom description */
 description?: string;

 /** Features to highlight */
 features?: string[];

 /** Button text */
 buttonText?: string;

 /** Duration text override */
 duration?: string;

 /** Callback when Calendly is opened */
 onCalendlyOpen?: () => void;

 /** Show features list */
 showFeatures?: boolean;

 /** Compact mode for smaller displays */
 compact?: boolean;

 /** Start with Calendly widget open */
 startWithWidget?: boolean;

 /** Height of the Calendly widget */
 widgetHeight?: string;

 /** Custom duration suffix mapping */
 durationSuffixes?: Record<string, string>;
}
```

### Default Values

```tsx
const defaultProps = {
 calendlyUrl: "https://calendly.com/lexprotectortech", // ⚠️ Replace this!
 eventType: "30min",
 title: "Schedule Your Demo",
 description: "Book a personalized demo with our team...",
 buttonText: "Schedule Now",
 duration: "30-minute session",
 showFeatures: true,
 compact: false,
 startWithWidget: false,
 widgetHeight: "650px",
};
```

## URL Structure

### How URL Generation Works

The component automatically generates URLs by combining:

1. **Base URL**: Your main Calendly URL
2. **Duration Suffix**: Appended based on `eventType`

### Default Suffix Mapping

```tsx
const defaultSuffixes = {
 consultation: "/consultation",
 demo: "/demo",
 "15min": "/15min",
 "30min": "/30min",
 "45min": "/45min",
 "60min": "/60min",
};
```

### Examples

| Base URL                        | Event Type     | Generated URL                               |
| ------------------------------- | -------------- | ------------------------------------------- |
| `https://calendly.com/john-doe` | `demo`         | `https://calendly.com/john-doe/demo`        |
| `https://calendly.com/john-doe` | `30min`        | `https://calendly.com/john-doe/30min`       |
| `https://calendly.com/company`  | `consultation` | `https://calendly.com/company/consultation` |

### Custom Suffix Mapping

Override default suffixes for your specific Calendly setup:

```tsx
<CalendlyScheduler
 calendlyUrl="https://calendly.com/your-username"
 eventType="demo"
 durationSuffixes={{
  demo: "/product-demo",
  consultation: "/free-consultation",
  "30min": "/30-minute-meeting",
 }}
/>
```

## Implementation Examples

### 1. Basic Modal Implementation

```tsx
import { useState } from "react";
import { Modal, ModalContent } from "@/components/ui/modal";
import { CalendlyScheduler } from "@/components/scheduling";

const MyComponent = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);

 return (
  <>
   <Button onClick={() => setIsModalOpen(true)}>Schedule Demo</Button>

   <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
    <ModalContent size="xl">
     <CalendlyScheduler
      calendlyUrl="https://calendly.com/your-username"
      eventType="demo"
      onCalendlyOpen={() => console.log("Calendly opened")}
     />
    </ModalContent>
   </Modal>
  </>
 );
};
```

### 2. Compact Inline Version

```tsx
<CalendlyScheduler
 calendlyUrl="https://calendly.com/your-username"
 eventType="consultation"
 compact={true}
 title="Quick Consultation"
 description="Get expert advice in 15 minutes"
 showFeatures={false}
/>
```

### 3. Custom Features and Styling

```tsx
<CalendlyScheduler
 calendlyUrl="https://calendly.com/your-username"
 eventType="demo"
 title="Product Walkthrough"
 description="See our platform in action"
 features={[
  "Live product demonstration",
  "Q&A with our experts",
  "Custom solution discussion",
  "Implementation roadmap",
 ]}
 buttonText="Book Your Demo"
 widgetHeight="700px"
/>
```

### 4. Multiple Event Types

```tsx
const EventTypeSelector = () => {
 const [eventType, setEventType] = useState("30min");

 return (
  <div className="space-y-4">
   <div className="flex gap-2">
    <Button
     variant={eventType === "15min" ? "default" : "outline"}
     onClick={() => setEventType("15min")}>
     15 min
    </Button>
    <Button
     variant={eventType === "30min" ? "default" : "outline"}
     onClick={() => setEventType("30min")}>
     30 min
    </Button>
    <Button
     variant={eventType === "60min" ? "default" : "outline"}
     onClick={() => setEventType("60min")}>
     60 min
    </Button>
   </div>

   <CalendlyScheduler
    calendlyUrl="https://calendly.com/your-username"
    eventType={eventType}
   />
  </div>
 );
};
```

## Troubleshooting

### Common Issues

#### 1. "Page Not Found" Error

**Problem**: Calendly shows a 404 error when the widget loads.

**Solutions**:

- Verify your Calendly URL is correct
- Check that the event type exists in your Calendly account
- Test the generated URL manually in a browser

```tsx
// Debug: Log the generated URL
const CalendlyDebug = () => {
 const url = "https://calendly.com/your-username/demo";
 console.log("Generated Calendly URL:", url);

 return <CalendlyScheduler calendlyUrl="https://calendly.com/your-username" />;
};
```

#### 2. "Calendly URL Not Configured" Message

**Problem**: Component shows configuration error instead of Calendly widget.

**Solutions**:

- Ensure `calendlyUrl` prop is provided
- Check that the URL is not null or empty
- Verify the URL format is correct

```tsx
// ❌ Wrong - will show error
<CalendlyScheduler eventType="demo" />

// ✅ Correct - will work
<CalendlyScheduler
  calendlyUrl="https://calendly.com/your-username"
  eventType="demo"
/>
```

#### 3. Widget Not Loading

**Problem**: Calendly iframe appears but content doesn't load.

**Solutions**:

- Check browser console for CORS errors
- Verify Calendly URL is publicly accessible
- Test the URL directly in a new browser tab
- Check if Calendly has embedding restrictions

#### 4. Modal Not Responsive

**Problem**: Modal or widget doesn't work well on mobile.

**Solutions**:

- Use appropriate modal sizes: `sm`, `md`, `lg`, `xl`
- Adjust `widgetHeight` for mobile
- Consider using `compact={true}` for mobile views

```tsx
// Responsive implementation
const ResponsiveCalendly = () => {
 const isMobile = useMediaQuery("(max-width: 768px)");

 return (
  <CalendlyScheduler
   calendlyUrl="https://calendly.com/your-username"
   compact={isMobile}
   widgetHeight={isMobile ? "500px" : "650px"}
  />
 );
};
```

### Debugging Tips

1. **Test URLs manually**: Copy the generated URL and test it in a browser
2. **Check browser console**: Look for JavaScript errors or network issues
3. **Verify Calendly settings**: Ensure your Calendly account allows embedding
4. **Test with known working URL**: Use a public Calendly URL first

## Advanced Configuration

### 1. Environment-Based Configuration

Create environment-specific Calendly URLs:

```tsx
// lib/calendly-config.ts
const getCalendlyUrl = () => {
 if (process.env.NODE_ENV === "development") {
  return (
   process.env.NEXT_PUBLIC_CALENDLY_DEV_URL ||
   "https://calendly.com/dev-user"
  );
 }
 return (
  process.env.NEXT_PUBLIC_CALENDLY_PROD_URL ||
  "https://calendly.com/prod-user"
 );
};

export { getCalendlyUrl };
```

```tsx
// Usage
import { getCalendlyUrl } from "@/lib/calendly-config";

<CalendlyScheduler calendlyUrl={getCalendlyUrl()} />;
```

### 2. Global Configuration Provider

Create a context for Calendly configuration:

```tsx
// contexts/CalendlyContext.tsx
import { createContext, useContext } from "react";

interface CalendlyContextType {
 baseUrl: string;
 defaultEventType: string;
 brandColor: string;
}

const CalendlyContext = createContext<CalendlyContextType | null>(null);

export const CalendlyProvider = ({ children, config }) => (
 <CalendlyContext.Provider value={config}>{children}</CalendlyContext.Provider>
);

export const useCalendly = () => {
 const context = useContext(CalendlyContext);
 if (!context)
  throw new Error("useCalendly must be used within CalendlyProvider");
 return context;
};
```

### 3. Analytics Integration

Track Calendly interactions:

```tsx
const CalendlyWithAnalytics = (props) => {
 const handleCalendlyOpen = () => {
  // Google Analytics
  gtag("event", "calendly_opened", {
   event_category: "engagement",
   event_label: props.eventType,
  });

  // Custom analytics
  analytics.track("Calendly Widget Opened", {
   eventType: props.eventType,
   source: "pricing_page",
  });

  props.onCalendlyOpen?.();
 };

 return <CalendlyScheduler {...props} onCalendlyOpen={handleCalendlyOpen} />;
};
```

### 4. Custom Styling

Override default styles:

```css
/* styles/calendly-custom.css */
.calendly-scheduler {
 --calendly-primary-color: #your-brand-color;
}

.calendly-scheduler iframe {
 border-radius: 12px;
 box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

## Best Practices

1. **Always provide a real Calendly URL** - Don't use placeholder URLs in production
2. **Test event types** - Ensure all event types exist in your Calendly account
3. **Use appropriate modal sizes** - Choose sizes that work well for your content
4. **Handle errors gracefully** - The component shows helpful error messages
5. **Consider mobile experience** - Use compact mode for smaller screens
6. **Track usage** - Monitor Calendly interaction analytics
7. **Keep URLs up to date** - Update URLs if your Calendly username changes

## Support

If you encounter issues not covered in this guide:

1. Check the [Calendly API documentation](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview)
2. Review browser console for errors
3. Test with a known working Calendly URL
4. Contact your development team for component-specific issues

---

_Last updated: July 2025
