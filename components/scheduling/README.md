# Calendly Scheduler Components

This directory contains three different Calendly scheduler components, each designed for different use cases and integration patterns.

## Components Overview

### 1. CalendlyScheduler (Original)

The original modal-based scheduler with information view and embedded iframe.

### 2. VersatileCalendlyScheduler (New - Recommended)

A comprehensive component that supports both modal and inline modes, combining the best of both worlds.

### 3. InlineCalendlyScheduler (New - Simple)

A lightweight component specifically for inline Calendly widgets using the official Calendly script.

## Usage Examples

### VersatileCalendlyScheduler (Recommended)

This is the most flexible component that supports multiple modes:

#### Modal Mode (Default)

```tsx
import { VersatileCalendlyScheduler } from "@/components/scheduling";

<VersatileCalendlyScheduler
	calendlyUrl="https://calendly.com/lexprotector-int"
	eventType="30min"
	title="Schedule Your Demo"
	description="Book a personalized demo with our team"
	mode="modal" // default
/>;
```

#### Inline Mode

```tsx
import { VersatileCalendlyScheduler } from "@/components/scheduling";

<VersatileCalendlyScheduler
	calendlyUrl="https://calendly.com/lexprotector-int"
	eventType="30min"
	title="Schedule Your Demo"
	mode="inline"
	responsiveHeight={{
		mobile: "500px",
		tablet: "600px",
		desktop: "700px",
	}}
	containerClassName="my-custom-class"
/>;
```

#### Widget Mode (Similar to original)

```tsx
import { VersatileCalendlyScheduler } from "@/components/scheduling";

<VersatileCalendlyScheduler
	calendlyUrl="https://calendly.com/lexprotector-int"
	eventType="30min"
	mode="widget"
	startWithWidget={false}
	compact={true}
/>;
```

### InlineCalendlyScheduler (Simple Inline)

For when you just want a simple inline Calendly widget:

```tsx
import { InlineCalendlyScheduler } from "@/components/scheduling";

<InlineCalendlyScheduler
	calendlyUrl="https://calendly.com/lexprotector-int/30min"
	title="Schedule Your Demo"
	description="Book a personalized demo with our team"
	height="700px"
	responsiveHeight={{
		mobile: "500px",
		tablet: "600px",
		desktop: "700px",
	}}
/>;
```

### CalendlyScheduler (Original)

The original component maintains backward compatibility:

```tsx
import { CalendlyScheduler } from "@/components/scheduling";

<CalendlyScheduler
	calendlyUrl="https://calendly.com/lexprotector-int"
	eventType="30min"
	title="Schedule Your Demo"
	description="Book a personalized demo with our team"
	compact={false}
	startWithWidget={false}
/>;
```

## Key Differences

| Feature              | CalendlyScheduler | VersatileCalendlyScheduler | InlineCalendlyScheduler |
| -------------------- | ----------------- | -------------------------- | ----------------------- |
| Modal Support        | ✅                | ✅                         | ❌                      |
| Inline Widget        | ❌                | ✅                         | ✅                      |
| Uses Calendly Script | ❌                | ✅ (inline mode)           | ✅                      |
| Iframe Fallback      | ✅                | ✅ (modal/widget mode)     | ❌                      |
| Info/Features View   | ✅                | ✅                         | ❌                      |
| Responsive Design    | ✅                | ✅                         | ✅                      |
| Compact Mode         | ✅                | ✅                         | ❌                      |
| Auto Script Loading  | ❌                | ✅                         | ✅                      |

## Inline Widget Advantages

The inline widget method offers several benefits:

1. **Better Integration**: Uses the official Calendly widget script for better performance
2. **Native Calendly Features**: Access to all native Calendly features and updates
3. **Better Mobile Experience**: Optimized mobile experience provided by Calendly
4. **Event Tracking**: Better analytics and event tracking capabilities
5. **Automatic Updates**: Automatically receives Calendly's latest features and bug fixes

## Implementation Notes

### Script Loading

Both `VersatileCalendlyScheduler` (inline mode) and `InlineCalendlyScheduler` automatically load the Calendly script:

```html
<script
	type="text/javascript"
	src="https://assets.calendly.com/assets/external/widget.js"
	async></script>
```

### URL Format

- **Modal/Widget modes**: Base URL + event type suffix (e.g., `https://calendly.com/lexprotector-int` + `/30min`)
- **Inline mode**: Full URL including event type (e.g., `https://calendly.com/lexprotector-int/30min`)

### Responsive Design

All components support responsive height configurations:

```tsx
responsiveHeight={{
  mobile: "500px",    // < 768px
  tablet: "600px",    // 768px - 1024px
  desktop: "700px"    // > 1024px
}}
```

## Migration Guide

### From CalendlyScheduler to VersatileCalendlyScheduler

1. Change the import:

```tsx
// Before
import { CalendlyScheduler } from "@/components/scheduling";

// After
import { VersatileCalendlyScheduler } from "@/components/scheduling";
```

1. Update the component name and add mode prop:

```tsx
// Before
<CalendlyScheduler {...props} />

// After
<VersatileCalendlyScheduler {...props} mode="modal" />
```

### To Use Inline Mode

Simply change the mode prop:

```tsx
<VersatileCalendlyScheduler
	{...props}
	mode="inline"
	calendlyUrl="https://calendly.com/lexprotector-int/30min" // Full URL for inline
/>
```

## Best Practices

1. **Use VersatileCalendlyScheduler** for new implementations
2. **Use inline mode** for better user experience when space allows
3. **Use modal mode** for compact layouts or when you need the info/features view
4. **Use InlineCalendlyScheduler** for simple, dedicated scheduling pages
5. **Always provide responsive heights** for mobile optimization
6. **Test on mobile devices** to ensure optimal user experience

## Browser Support

All components support modern browsers. The inline widget requires:

- Modern browsers with ES6+ support
- JavaScript enabled
- Third-party cookies enabled (for Calendly functionality)
