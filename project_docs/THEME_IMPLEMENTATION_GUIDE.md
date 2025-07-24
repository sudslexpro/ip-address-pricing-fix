# Theme Implementation Guide

## Overview

This guide covers the comprehensive dark mode implementation and the unified ThemeToggle component system in the Lex Protector Portal.

## Quick Start

The project now has a single, versatile `ThemeToggle` component that can handle all theme switching needs:

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Basic usage - dropdown with icon only
<ThemeToggle />

// Switch style with label
<ThemeToggle variant="switch" showLabel />

// Compact button for mobile
<ThemeToggle variant="compact" />

// Icon-only for headers
<ThemeToggle variant="icon-only" />
```

## Component Variants

### 1. Dropdown (Default)

Best for: Settings panels, detailed theme selection

```tsx
<ThemeToggle variant="dropdown" />
<ThemeToggle variant="dropdown" showLabel />
<ThemeToggle variant="dropdown" size="sm" />
```

### 2. Switch

Best for: Quick toggles, toolbars

```tsx
<ThemeToggle variant="switch" />
<ThemeToggle variant="switch" showLabel />
<ThemeToggle variant="switch" appearance="ghost" />
```

### 3. Compact

Best for: Mobile navigation, constrained spaces

```tsx
<ThemeToggle variant="compact" />
<ThemeToggle variant="compact" showLabel />
<ThemeToggle variant="compact" enableCycle />
```

### 4. Icon-Only

Best for: Headers, minimal interfaces

```tsx
<ThemeToggle variant="icon-only" />
<ThemeToggle variant="icon-only" appearance="ghost" />
<ThemeToggle variant="icon-only" appearance="secondary" />
```

## Props Reference

| Prop          | Type                                                 | Default      | Description                                 |
| ------------- | ---------------------------------------------------- | ------------ | ------------------------------------------- |
| `variant`     | `"dropdown" \| "switch" \| "compact" \| "icon-only"` | `"dropdown"` | Visual style variant                        |
| `size`        | `"sm" \| "default" \| "lg"`                          | `"default"`  | Component size                              |
| `showLabel`   | `boolean`                                            | `false`      | Show text labels                            |
| `appearance`  | `"default" \| "ghost" \| "secondary"`                | `"default"`  | Visual appearance                           |
| `enableCycle` | `boolean`                                            | `false`      | Enable click cycling (compact variant only) |
| `className`   | `string`                                             | -            | Additional CSS classes                      |

## Common Usage Patterns

### Desktop Header

```tsx
// components/navigation/Header.tsx
<ThemeToggle variant="icon-only" />
```

### Mobile Navigation

```tsx
// For mobile menus
<ThemeToggle variant="compact" showLabel />
```

### Settings Page

```tsx
// For detailed settings
<div className="flex items-center justify-between">
 <label>Theme Preference</label>
 <ThemeToggle variant="dropdown" showLabel />
</div>
```

### Toolbar Integration

```tsx
// In toolbars with other actions
<div className="flex items-center gap-2">
 <Button variant="ghost" size="sm">
  Action
 </Button>
 <Separator orientation="vertical" className="h-4" />
 <ThemeToggle variant="switch" />
</div>
```

## Theme System Architecture

### CSS Variables

Theme colors are defined using CSS custom properties in `app/globals.css`:

```css
:root {
 --background: oklch(98% 0.01 106);
 --foreground: oklch(15% 0.01 106);
 --primary: oklch(47% 0.14 232);
 /* ... */
}

.dark {
 --background: oklch(10% 0.01 106);
 --foreground: oklch(90% 0.01 106);
 --primary: oklch(65% 0.12 232);
 /* ... */
}
```

### Provider Setup

Theme provider is configured in `app/layout.tsx`:

```tsx
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en" suppressHydrationWarning>
   <body>
    <ThemeProvider
     attribute="class"
     defaultTheme="system"
     enableSystem
     disableTransitionOnChange>
     {children}
    </ThemeProvider>
   </body>
  </html>
 );
}
```

## Theme Utilities

### Theme Classes

Use pre-built theme classes from `lib/theme-utils.ts`:

```tsx
import { themeClasses } from "@/lib/theme-utils";

// Apply theme-aware styles
<div className={themeClasses.card}>Content</div>;
```

### Custom Hooks

Enhanced theme management with `hooks/useThemeEnhanced.ts`:

```tsx
import { useThemeEnhanced } from "@/hooks/useThemeEnhanced";

function MyComponent() {
 const { theme, status, toggleTheme, setTheme } = useThemeEnhanced();

 return (
  <div>
   <p>Current theme: {theme}</p>
   <p>Status: {status}</p>
   <button onClick={toggleTheme}>Toggle</button>
  </div>
 );
}
```

## Migration from Old Components

If you were using the old separate theme toggle components:

### From ThemeToggleEnhanced

```tsx
// Old
<ThemeToggleEnhanced showLabel />

// New
<ThemeToggle variant="dropdown" showLabel />
```

### From ThemeToggleSwitch

```tsx
// Old
<ThemeToggleSwitch />

// New
<ThemeToggle variant="switch" />
```

### From Original ThemeToggle

```tsx
// Old
<ThemeToggle />

// New
<ThemeToggle variant="icon-only" />
```

## Demo Page

Visit `/theme-demo` to see all variants in action with:

- Live examples of each variant
- Interactive theme switching
- Color system demonstration
- Status indicators
- Usage pattern examples

## Best Practices

1. **Choose the right variant**:

   - Use `icon-only` for headers and minimal interfaces
   - Use `dropdown` for settings and detailed selection
   - Use `switch` for quick toggles
   - Use `compact` for mobile or constrained spaces

2. **Consistent placement**:

   - Place theme toggles in predictable locations (header, settings)
   - Maintain consistent styling across your app

3. **Accessibility**:

   - All variants include proper ARIA labels
   - Keyboard navigation is supported
   - Focus states are clearly visible

4. **Performance**:
   - Theme switching is optimized with no flash of incorrect theme
   - Uses system preference detection
   - Minimal re-renders with proper memoization

## Troubleshooting

### Theme not persisting

- Ensure `ThemeProvider` is properly configured in layout
- Check that cookies are enabled for theme persistence

### Flash of incorrect theme

- Verify `suppressHydrationWarning` is set on `<html>` element
- Ensure `disableTransitionOnChange` is enabled

### Icons not displaying

- Check that Lucide React icons are properly installed
- Verify icon imports in the component

## Further Reading

- [next-themes documentation](https://github.com/pacocoursey/next-themes)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Radix UI Theming](https://www.radix-ui.com/themes/docs/theme/color)
