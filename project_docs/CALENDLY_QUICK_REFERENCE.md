# Calendly Quick Reference

## Component Import

```tsx
import { CalendlyScheduler } from "@/components/scheduling";
import { Modal, ModalContent } from "@/components/ui/modal";
```

## Basic Usage

```tsx
<CalendlyScheduler
 calendlyUrl="https://calendly.com/your-username"
 eventType="demo"
/>
```

## Common Configurations

### 1. Modal Integration (Current Implementation)

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);

<Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
 <ModalContent size="xl">
  <CalendlyScheduler
   calendlyUrl="https://calendly.com/your-username"
   eventType="demo"
   title="Schedule Your Demo"
   widgetHeight="700px"
  />
 </ModalContent>
</Modal>;
```

### 2. Replace Placeholder URL

**Current placeholder in component:**

```tsx
calendlyUrl = "https://calendly.com/lexprotectortech";
```

**Replace with your actual URL:**

```tsx
calendlyUrl = "https://calendly.com/your-actual-username";
```

### 3. Event Type Mapping

| Event Type     | Default Suffix  | Generated URL           |
| -------------- | --------------- | ----------------------- |
| `demo`         | `/demo`         | `your-url/demo`         |
| `consultation` | `/consultation` | `your-url/consultation` |
| `30min`        | `/30min`        | `your-url/30min`        |
| `15min`        | `/15min`        | `your-url/15min`        |

### 4. Quick Fix for PricingSection

**File:** `components/pages-ui/pricing/PricingSection.tsx`

```tsx
<CalendlyScheduler
 calendlyUrl="https://calendly.com/your-actual-username" // Replace this line
 eventType="demo"
 title="Schedule Your Demo"
 description="Book a personalized demo with our team..."
 buttonText="Schedule Demo"
 widgetHeight="700px"
/>
```

## Testing Checklist

- [ ] Replace placeholder URL with your actual Calendly URL
- [ ] Test the generated URL manually in browser
- [ ] Verify event type exists in your Calendly account
- [ ] Check modal opens and closes properly
- [ ] Test on mobile devices
- [ ] Confirm iframe loads without errors

## Environment Variables (Optional)

Add to `.env.local`:

```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
```

Use in component:

```tsx
calendlyUrl={process.env.NEXT_PUBLIC_CALENDLY_URL}
```
