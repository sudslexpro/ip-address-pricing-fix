# SmartPrice Component Documentation

## Overview

The `SmartPrice` component is a versatile React component that automatically converts pricing based on the user's IP address location. It provides real-time currency conversion with manual override options and customizable rounding controls.

## Features

- 🌍 **Automatic IP-based location detection**
- 💱 **Real-time currency conversion**
- 🎛️ **Manual currency selection**
- 🔄 **Customizable rounding options**
- 📱 **Multiple display variants**
- ⚡ **Lightweight and easy to integrate**

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
