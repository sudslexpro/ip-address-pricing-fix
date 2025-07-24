# Modal Components Documentation

A versatile, reusable modal system built on top of Radix UI Dialog primitives, following shadcn/ui patterns.

## Components Overview

### Base Modal Component

Located in `components/ui/modal.tsx` - The core modal system with all necessary primitives.

### CalendlyScheduler Component

Located in `components/scheduling/CalendlyScheduler.tsx` - A specialized component for Calendly integration.

### Modal Examples

Located in `components/ui/modal-examples.tsx` - Pre-built modal patterns for common use cases.

## Basic Usage

### 1. Simple Modal

```tsx
import {
 Modal,
 ModalContent,
 ModalHeader,
 ModalTitle,
 ModalDescription,
 ModalTrigger,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

function SimpleModal() {
 return (
  <Modal>
   <ModalTrigger asChild>
    <Button>Open Modal</Button>
   </ModalTrigger>
   <ModalContent>
    <ModalHeader>
     <ModalTitle>Modal Title</ModalTitle>
     <ModalDescription>
      This is a description of what this modal does.
     </ModalDescription>
    </ModalHeader>
    <div className="p-4">
     <p>Your modal content goes here.</p>
    </div>
   </ModalContent>
  </Modal>
 );
}
```

### 2. Controlled Modal

```tsx
import { Modal, ModalContent } from "@/components/ui/modal";

function ControlledModal() {
 const [open, setOpen] = useState(false);

 return (
  <Modal open={open} onOpenChange={setOpen}>
   <ModalContent>
    <p>Controlled modal content</p>
   </ModalContent>
  </Modal>
 );
}
```

## Modal Sizes

The modal supports different sizes:

```tsx
<ModalContent size="sm">Small Modal</ModalContent>
<ModalContent size="default">Default Modal</ModalContent>
<ModalContent size="md">Medium Modal</ModalContent>
<ModalContent size="lg">Large Modal</ModalContent>
<ModalContent size="xl">Extra Large Modal</ModalContent>
<ModalContent size="full">Full Width Modal</ModalContent>
<ModalContent size="auto">Auto-sized Modal</ModalContent>
```

## Calendly Integration

### Basic Calendly Modal

```tsx
import { CalendlyModal } from "@/components/ui/modal-examples";
import { Button } from "@/components/ui/button";

function ScheduleDemo() {
 return (
  <CalendlyModal
   trigger={<Button>Schedule Demo</Button>}
   eventType="demo"
   title="Schedule Your Demo"
   description="Book a personalized demo with our team."
  />
 );
}
```

### Custom Calendly Scheduler

```tsx
import { CalendlyScheduler } from "@/components/scheduling";
import { Modal, ModalContent } from "@/components/ui/modal";

function CustomCalendlyModal() {
 const [open, setOpen] = useState(false);

 return (
  <Modal open={open} onOpenChange={setOpen}>
   <ModalContent size="md">
    <CalendlyScheduler
     eventType="consultation"
     calendlyUrl="https://calendly.com/custom-url"
     title="Custom Title"
     features={[
      "Custom feature 1",
      "Custom feature 2",
      "Custom feature 3",
     ]}
     compact={false}
     onCalendlyOpen={() => setOpen(false)}
    />
   </ModalContent>
  </Modal>
 );
}
```

## Pre-built Modal Examples

### 1. Confirmation Modal

```tsx
import { ConfirmationModal } from "@/components/ui/modal-examples";
import { Button } from "@/components/ui/button";

function DeleteButton() {
 return (
  <ConfirmationModal
   title="Are you sure?"
   description="This action cannot be undone."
   trigger={<Button variant="destructive">Delete</Button>}
   onConfirm={() => console.log("Confirmed")}
   onCancel={() => console.log("Cancelled")}
   confirmText="Delete"
   cancelText="Cancel"
  />
 );
}
```

### 2. Form Modal

```tsx
import { FormModal } from "@/components/ui/modal-examples";
import { Button } from "@/components/ui/button";

function EditForm() {
 return (
  <FormModal
   title="Edit Profile"
   description="Make changes to your profile here."
   trigger={<Button>Edit Profile</Button>}
   size="lg">
   <form className="space-y-4">
    <input
     type="text"
     placeholder="Name"
     className="w-full p-2 border rounded"
    />
    <input
     type="email"
     placeholder="Email"
     className="w-full p-2 border rounded"
    />
    <Button type="submit">Save Changes</Button>
   </form>
  </FormModal>
 );
}
```

### 3. Media Modal

```tsx
import { MediaModal } from "@/components/ui/modal-examples";

function ImageGallery() {
 return (
  <MediaModal
   trigger={
    <img src="/thumbnail.jpg" alt="Thumbnail" className="cursor-pointer" />
   }
   src="/full-image.jpg"
   alt="Full size image"
   title="Image Title"
   description="Image description"
  />
 );
}
```

### 4. Web Content Modal

```tsx
import { WebContentModal } from "@/components/ui/modal-examples";
import { Button } from "@/components/ui/button";

function EmbedDemo() {
 return (
  <WebContentModal
   trigger={<Button>View Demo</Button>}
   url="https://example.com/demo"
   title="Product Demo"
   description="Interactive product demonstration"
   height="600px"
  />
 );
}
```

### 5. Custom Content Modal

```tsx
import { CustomContentModal } from "@/components/ui/modal-examples";
import { Button } from "@/components/ui/button";

function VideoModal() {
 return (
  <CustomContentModal trigger={<Button>Play Video</Button>} size="xl">
   <div className="aspect-video">
    <iframe
     src="https://www.youtube.com/embed/VIDEO_ID"
     className="w-full h-full"
     allowFullScreen
    />
   </div>
  </CustomContentModal>
 );
}
```

## API Reference

### Modal Props

- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - Open state change handler

### ModalContent Props

- `size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto"` - Modal size
- `className?: string` - Additional CSS classes

### CalendlyScheduler Props

- `calendlyUrl?: string` - Custom Calendly URL
- `eventType?: "consultation" | "demo" | "30min" | "60min"` - Predefined event types
- `title?: string` - Custom title
- `description?: string` - Custom description
- `features?: string[]` - List of features to highlight
- `buttonText?: string` - Custom button text
- `duration?: string` - Duration text
- `onCalendlyOpen?: () => void` - Callback when Calendly opens
- `showFeatures?: boolean` - Show/hide features list
- `compact?: boolean` - Compact mode for smaller displays

## Styling

All modal components inherit from the project's design system using CSS variables defined in `app/globals.css`. You can customize the appearance by:

1. **Using CSS variables** - Modify the design tokens in globals.css
2. **Passing className props** - Add custom classes to any component
3. **Extending variants** - Add new size variants to the modalVariants in modal.tsx

## Accessibility

The modal system is built on Radix UI primitives and includes:

- Focus trapping
- Escape key handling
- Screen reader support
- Keyboard navigation
- Proper ARIA attributes

## Best Practices

1. **Use semantic HTML** - Include proper titles and descriptions
2. **Handle loading states** - Show loading indicators for async operations
3. **Provide clear actions** - Make it obvious how to close or confirm
4. **Mobile optimization** - Test on various screen sizes
5. **Performance** - Lazy load heavy content when possible

## Examples in the Codebase

See the PricingSection component for a real-world implementation:
`components/pages-ui/pricing/PricingSection.tsx`
