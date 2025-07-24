# Unified Theme Toggle Component

The `ThemeToggle` component is a versatile, all-in-one theme switching solution that replaces all previous theme toggle components. It supports multiple variants and configurations to fit different UI needs.

## 🎯 Component Features

### Variants

- **`dropdown`** (default): Full dropdown menu with Light/Dark/System options
- **`switch`**: Simple toggle button between light and dark modes
- **`compact`**: Button showing current theme icon with optional label
- **`icon-only`**: Icon-only dropdown with animated sun/moon transition

### Customization Options

- **Size**: `default`, `sm`, `lg`, `icon`
- **Appearance**: `default`, `outline`, `ghost`, `secondary`
- **Show Label**: Display text alongside icons
- **Enable Cycle**: Allow cycling through all themes (Light → Dark → System)

## 📖 Usage Examples

### Basic Usage

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Default dropdown with all theme options
<ThemeToggle />

// Simple toggle switch
<ThemeToggle variant="switch" />

// Compact button with current theme
<ThemeToggle variant="compact" />

// Icon-only with animated transition
<ThemeToggle variant="icon-only" />
```

### Advanced Configuration

```tsx
// Dropdown with label and custom size
<ThemeToggle
  variant="dropdown"
  showLabel
  size="default"
  appearance="outline"
/>

// Compact toggle with cycling through all themes
<ThemeToggle
  variant="compact"
  showLabel
  enableCycle
  appearance="ghost"
/>

// Switch with custom styling
<ThemeToggle
  variant="switch"
  showLabel
  size="sm"
  appearance="secondary"
  className="bg-accent"
/>
```

### Navigation Integration

```tsx
// Desktop header (icon-only)
<ThemeToggle variant="icon-only" />

// Mobile header (compact with label)
<ThemeToggle variant="compact" showLabel />

// Sidebar (full dropdown)
<ThemeToggle variant="dropdown" showLabel size="default" />
```

## 🎨 Variant Details

### 1. Dropdown (Default)

- Full dropdown menu with all three theme options
- Shows current theme icon in trigger button
- Best for: Main navigation, settings pages

```tsx
<ThemeToggle variant="dropdown" showLabel />
```

### 2. Switch

- Simple toggle between light and dark only
- Quick switching without dropdown
- Best for: Compact spaces, quick access

```tsx
<ThemeToggle variant="switch" showLabel />
```

### 3. Compact

- Shows current theme icon
- Click to toggle or cycle themes
- Optional text label
- Best for: Toolbars, mobile interfaces

```tsx
<ThemeToggle variant="compact" showLabel enableCycle />
```

### 4. Icon-Only

- Animated sun/moon icons
- Dropdown with all options
- Classic theme toggle appearance
- Best for: Headers, minimal interfaces

```tsx
<ThemeToggle variant="icon-only" />
```

## 🔧 Props Reference

| Prop          | Type                                                 | Default      | Description            |
| ------------- | ---------------------------------------------------- | ------------ | ---------------------- |
| `variant`     | `'dropdown' \| 'switch' \| 'compact' \| 'icon-only'` | `'dropdown'` | Theme toggle style     |
| `size`        | `'default' \| 'sm' \| 'lg' \| 'icon'`                | `'icon'`     | Button size            |
| `showLabel`   | `boolean`                                            | `false`      | Show text label        |
| `appearance`  | `'default' \| 'outline' \| 'ghost' \| 'secondary'`   | `'outline'`  | Button style           |
| `enableCycle` | `boolean`                                            | `false`      | Enable theme cycling   |
| `className`   | `string`                                             | -            | Additional CSS classes |

## 🎛️ Theme Options

All variants support the three theme modes:

- **Light**: Force light theme
- **Dark**: Force dark theme
- **System**: Follow OS preference

## 🔄 Migration Guide

Replace old components with the unified `ThemeToggle`:

```tsx
// Old components (remove these)
import { ThemeToggleEnhanced } from "@/components/ui/theme-toggle-enhanced";
import { ThemeToggleSwitch } from "@/components/ui/theme-toggle-switch";

// New unified component
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Migration examples:
<ThemeToggleEnhanced variant="default" showLabel />
// becomes:
<ThemeToggle variant="dropdown" showLabel />

<ThemeToggleEnhanced variant="icon-only" />
// becomes:
<ThemeToggle variant="icon-only" />

<ThemeToggleEnhanced variant="compact" showLabel />
// becomes:
<ThemeToggle variant="compact" showLabel />

<ThemeToggleSwitch variant="simple" />
// becomes:
<ThemeToggle variant="switch" />
```

## 🎨 Styling Examples

### Custom Appearances

```tsx
// Ghost button style
<ThemeToggle variant="compact" appearance="ghost" showLabel />

// Secondary button style
<ThemeToggle variant="switch" appearance="secondary" />

// Large dropdown with outline
<ThemeToggle
  variant="dropdown"
  size="lg"
  appearance="outline"
  showLabel
/>
```

### Custom Classes

```tsx
// Add custom styling
<ThemeToggle
 variant="compact"
 className="bg-accent/10 hover:bg-accent/20 border-2"
 showLabel
/>
```

## 🧪 Testing Different Variants

Visit `/theme-demo` to see all variants in action and test their behavior. The demo page showcases:

- All four variants side by side
- Different size and appearance combinations
- Label and cycling options
- Real-time theme switching

## 💡 Best Practices

1. **Choose the right variant** for your use case:

   - `dropdown`: Full-featured, main navigation
   - `switch`: Quick toggle, compact spaces
   - `compact`: Current state display, mobile
   - `icon-only`: Minimal, classic appearance

2. **Consider context**:

   - Desktop headers: `icon-only` or `compact`
   - Mobile interfaces: `compact` with `showLabel`
   - Settings pages: `dropdown` with `showLabel`
   - Toolbars: `switch` or `compact`

3. **Maintain consistency** across your app by using the same variant in similar contexts

4. **Test accessibility** - all variants include proper ARIA labels and keyboard navigation

The unified `ThemeToggle` component provides all the functionality you need for theme switching in a single, well-tested, and documented component!
