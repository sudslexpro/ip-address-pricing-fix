# SmartPrice Component Documentation

## Overview

The `SmartPrice` component is a versatile React component that automatically converts pricing based on the user's location. It supports both IP-based detection and browser geolocation for maximum accuracy and flexibility.

## Features

- 🌍 **Automatic location detection (IP + Browser Geolocation)**
- 📍 **High-precision GPS location support**
- 💱 **Real-time currency conversion**
- 🎛️ **Manual currency selection**
- 🔄 **Customizable rounding options**
- 📱 **Multiple display variants**
- 🔒 **Privacy-friendly with user control**
- ⚡ **Lightweight and easy to integrate**

## Detection Methods

### 1. IP-Based Detection (Default)

- ✅ No permissions required
- ✅ Works immediately
- ✅ Anonymous and private
- 🟡 Medium accuracy
- 🟡 Affected by VPNs

### 2. Browser Geolocation (Enhanced)

- 🟢 High accuracy (GPS/WiFi/Cell towers)
- 🟢 Works through VPNs (real location)
- 🟢 User controlled
- 🟡 Requires permission
- 🟡 Slightly slower initial load

## Available Components

### SmartPrice (IP-based)

- **File**: `components/ui/smart-price.tsx`
- **Detection**: IP address location
- **Best for**: General use, privacy-conscious applications

### EnhancedSmartPrice (GPS + IP fallback)

- **File**: `components/ui/enhanced-smart-price.tsx`
- **Detection**: Browser geolocation with IP fallback
- **Best for**: High-accuracy requirements, mobile apps

## Basic Usage

### Simple Price Display

```tsx
import SmartPrice from "@/components/ui/smart-price";

// Basic usage - automatically detects user location and converts from USD
<SmartPrice amount={299} />

// With prefix and suffix
<SmartPrice
  amount={599}
  prefix="Starting at "
  suffix="/month"
/>
```

### Display Variants

```tsx
// Compact - for inline text
<SmartPrice amount={199} variant="compact" />

// Block - full width with controls on the side
<SmartPrice amount={599} variant="block" />

// Large - prominent display for hero sections
<SmartPrice amount={999} variant="large" />

// Inline (default) - standard display with inline controls
<SmartPrice amount={299} variant="inline" />
```

### Control Options

```tsx
// Hide currency selector
<SmartPrice
  amount={299}
  showCurrencySelector={false}
/>

// Enable rounding controls
<SmartPrice
  amount={1249.99}
  showRoundingControls={true}
/>

// Hide location indicator
<SmartPrice
  amount={599}
  showLocationIndicator={false}
/>

// Disable auto-detection (manual selection only)
<SmartPrice
  amount={399}
  enableAutoDetection={false}
/>
```

## Props Reference

| Prop                    | Type                                                  | Default           | Description                                  |
| ----------------------- | ----------------------------------------------------- | ----------------- | -------------------------------------------- |
| `amount`                | `number`                                              | **required**      | The base price amount in USD                 |
| `className`             | `string`                                              | -                 | Additional CSS classes                       |
| `prefix`                | `string`                                              | -                 | Text to display before the price             |
| `suffix`                | `string`                                              | -                 | Text to display after the price              |
| `variant`               | `"inline" \| "block" \| "compact" \| "large"`         | `"inline"`        | Display style variant                        |
| `showCurrencySelector`  | `boolean`                                             | `true`            | Show currency selector dropdown              |
| `showRoundingControls`  | `boolean`                                             | `false`           | Show settings icon for manual rounding       |
| `showLocationIndicator` | `boolean`                                             | `true`            | Show location indicator when auto-detected   |
| `enableAutoDetection`   | `boolean`                                             | `true`            | Enable automatic IP-based currency detection |
| `onChange`              | `(currency: string, convertedAmount: number) => void` | -                 | Callback when currency or amount changes     |
| `loadingText`           | `string`                                              | `"Converting..."` | Custom loading text                          |

## Integration Examples

### Pricing Tables

```tsx
const plans = [
 { name: "Basic", price: 299 },
 { name: "Pro", price: 599 },
 { name: "Enterprise", price: 999 },
];

return (
 <div className="grid grid-cols-3 gap-6">
  {plans.map((plan, index) => (
   <div key={plan.name} className="border rounded-lg p-6">
    <h3>{plan.name}</h3>
    <SmartPrice
     amount={plan.price}
     variant="large"
     showCurrencySelector={index === 1} // Only show on middle plan
     showRoundingControls={index === 1}
    />
   </div>
  ))}
 </div>
);
```

### Inline Text Pricing

```tsx
<p>
 Our basic plan starts at{" "}
 <SmartPrice amount={199} variant="compact" showCurrencySelector={false} /> per
 month.
</p>
```

### Hero Section Pricing

```tsx
<div className="text-center">
 <h1>Enterprise Solution</h1>
 <SmartPrice
  amount={999}
  variant="large"
  prefix="Starting at "
  suffix="/month"
  showRoundingControls={true}
 />
</div>
```

## Advanced Usage

### Bulk Price Conversion

```tsx
import { BulkSmartPrice } from "@/components/ui/smart-price-utils";

const priceItems = [
 { id: "basic", amount: 299, label: "Basic Plan" },
 { id: "pro", amount: 599, label: "Pro Plan" },
 { id: "enterprise", amount: 999, label: "Enterprise Plan" },
];

<BulkSmartPrice
 items={priceItems}
 variant="block"
 showCurrencySelector={true}
 className="space-y-4"
/>;
```

### Higher-Order Component

```tsx
import { withSmartPrice } from "@/components/ui/smart-price-utils";

const PriceCard = ({ price, name }) => (
 <div>
  <h3>{name}</h3>
  <span>${price}</span>
 </div>
);

const SmartPriceCard = withSmartPrice(PriceCard);

// Usage
<SmartPriceCard
 price={299}
 name="Basic Plan"
 enableSmartPrice={true}
 smartPriceProps={{ variant: "large" }}
/>;
```

## Dependencies

The SmartPrice component relies on:

- `useCurrencyConversion` hook (existing in your project)
- `/api/geolocation` endpoint for IP detection
- `/api/exchange-rates` endpoint for currency conversion
- Shadcn/ui components (`Button`, `Select`, `Popover`, `Input`, `Label`, `Switch`)

## Backend Requirements

### Geolocation API (`/api/geolocation/route.ts`)

Already implemented in your project. Returns user location based on IP address.

### Exchange Rates API (`/api/exchange-rates/route.ts`)

Already implemented in your project. Provides real-time currency conversion rates.

## Styling

The component uses Tailwind CSS classes and follows your existing design system. All variants are responsive and work with both light and dark themes.

## Performance Considerations

- IP detection happens once per session
- Exchange rates are cached and updated periodically
- Loading states provide smooth user experience
- Fallback to USD if detection fails

## Browser Support

Works in all modern browsers. Gracefully degrades to show USD prices if:

- IP detection fails
- Exchange rate API is unavailable
- JavaScript is disabled

## Migration from Static Prices

### Before (Static)

```tsx
<span>$299/month</span>
<div className="price">$599</div>
```

### After (Smart)

```tsx
<SmartPrice amount={299} suffix="/month" variant="compact" showCurrencySelector={false} />
<SmartPrice amount={599} variant="inline" />
```

## Best Practices

1. **Use `variant="compact"` for inline text** - keeps layout clean
2. **Show controls on primary prices only** - avoid UI clutter
3. **Group currency selectors** - one per pricing section
4. **Provide loading states** - better user experience
5. **Test with VPN** - verify different locations work correctly

## Troubleshooting

### Common Issues

**Prices not converting:**

- Check if `/api/geolocation` is working
- Verify `/api/exchange-rates` is accessible
- Ensure network connectivity

**Wrong currency detected:**

- IP detection may be inaccurate for VPN users
- Users can manually override via currency selector

**Layout issues:**

- Use appropriate `variant` for your use case
- Consider `showCurrencySelector={false}` for cleaner layouts

### Debug Mode

Add this to see conversion details:

```tsx
<SmartPrice
 amount={299}
 onChange={(currency, amount) => {
  console.log(`Converted to ${currency}: ${amount}`);
 }}
/>
```

## Enhanced SmartPrice (GPS + Browser Geolocation)

### Overview

The `EnhancedSmartPrice` component provides high-accuracy location detection using the browser's Geolocation API with IP-based fallback. This component offers GPS-level precision while maintaining compatibility with the standard SmartPrice API.

### Key Features

- 📍 **GPS-level accuracy** using browser geolocation
- 🔄 **Automatic IP fallback** if GPS is unavailable
- 🔐 **Permission management** with user-friendly prompts
- ⚡ **Smart caching** to avoid repeated permission requests
- 🌐 **Reverse geocoding** to convert coordinates to country

### Usage Examples

#### Basic Enhanced Implementation

```tsx
import { EnhancedSmartPrice } from "@/components/ui/enhanced-smart-price";

// High-accuracy GPS-based pricing
<EnhancedSmartPrice basePrice={99} baseCurrency="USD" />;
```

#### With Full Configuration

```tsx
<EnhancedSmartPrice
 basePrice={299.99}
 baseCurrency="EUR"
 variant="large"
 enableRounding={true}
 enableManualSelection={true}
 className="my-custom-class"
/>
```

#### In Pricing Tables

```tsx
const plans = [
 { name: "Starter", price: 99 },
 { name: "Professional", price: 199 },
 { name: "Enterprise", price: 399 },
];

return (
 <div className="grid grid-cols-3 gap-6">
  {plans.map((plan) => (
   <div key={plan.name} className="border rounded-lg p-6">
    <h3 className="text-lg font-semibold">{plan.name}</h3>
    <EnhancedSmartPrice
     basePrice={plan.price}
     baseCurrency="USD"
     variant="block"
     enableRounding={true}
    />
   </div>
  ))}
 </div>
);
```

### Props Reference (Enhanced)

All standard SmartPrice props plus:

| Prop                    | Type                                          | Default      | Description                                 |
| ----------------------- | --------------------------------------------- | ------------ | ------------------------------------------- |
| `basePrice`             | `number`                                      | **required** | The base price amount                       |
| `baseCurrency`          | `string`                                      | **required** | The base currency code (e.g., "USD", "EUR") |
| `variant`               | `"inline" \| "block" \| "compact" \| "large"` | `"inline"`   | Display style variant                       |
| `enableRounding`        | `boolean`                                     | `false`      | Show rounding controls                      |
| `enableManualSelection` | `boolean`                                     | `true`       | Allow manual currency selection             |
| `className`             | `string`                                      | -            | Additional CSS classes                      |

### Permission Flow

1. **First Load**: Component attempts GPS detection
2. **Permission Prompt**: Browser requests location access
3. **User Response**:
   - ✅ **Allow**: Uses GPS coordinates for accurate detection
   - ❌ **Deny**: Falls back to IP-based detection
   - ⏳ **Ignore**: Timeout after 10s, uses IP fallback

### Detection Methods Comparison

| Method              | Accuracy | Speed  | Privacy  | Permissions | VPN-Proof |
| ------------------- | -------- | ------ | -------- | ----------- | --------- |
| **IP-based**        | Medium   | Fast   | High     | None        | No        |
| **Browser GPS**     | High     | Medium | Medium   | Required    | Yes       |
| **Enhanced (Both)** | High     | Smart  | Flexible | Optional    | Yes       |

### When to Use Enhanced vs Standard

#### Use **EnhancedSmartPrice** when:

- Accuracy is critical (financial apps, location-sensitive pricing)
- Users are likely on mobile devices
- You want to handle VPN users correctly
- User experience benefits from precision

#### Use **SmartPrice** when:

- Privacy is paramount
- Simplicity is preferred
- Permission prompts might be disruptive
- Quick loading is essential

### Troubleshooting Enhanced Features

**GPS permission denied:**

- Component automatically falls back to IP detection
- User can still manually select currency
- No functionality is lost

**Slow GPS detection:**

- 10-second timeout prevents hanging
- Loading indicators keep users informed
- IP fallback ensures quick resolution

**HTTPS requirement:**

- Geolocation API requires HTTPS in production
- Development (localhost) works with HTTP
- Component handles gracefully on HTTP sites

### Demo Pages

Visit these pages to see the components in action:

- `/currency-demo` - Standard IP-based SmartPrice
- `/geolocation-pricing-demo` - Enhanced GPS+IP SmartPrice

Both pages include side-by-side comparisons and real-time debugging information.
