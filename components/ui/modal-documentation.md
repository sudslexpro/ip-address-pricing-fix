# Modal Components Documentation

A versatile, reusable modal system built on top of Radix UI Dialog primitives, following shadcn/ui patterns with integrated provider system for automatic floating element management.

## Components Overview

### Consolidated Modal System

Located in `components/ui/modal.tsx` - Contains all modal components:

- **Modal** - Basic Radix UI modal wrapper
- **EnhancedModal** - Modal with automatic floating element management
- **ModalProvider** - Context provider for global modal state tracking
- **ModalClient** - Helper component for modal registration
- **All modal primitives** - ModalContent, ModalHeader, ModalTitle, etc.

### CalendlyScheduler Component

Located in `components/scheduling/CalendlyScheduler.tsx` - A specialized component for Calendly integration.

### Modal Examples

Located in `components/ui/modal-examples.tsx` - Pre-built modal patterns for common use cases.

## Basic Usage

### 1. Enhanced Modal (Recommended)

````tsx
import {
    EnhancedModal as Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalDescription,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

function EnhancedModalExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                open={isOpen}
                onOpenChange={setIsOpen}
                modalId="example-modal" // Optional: auto-generated if not provided
            >
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Modal Title</ModalTitle>
                        <ModalDescription>
                            This modal automatically hides floating elements when open.
                        </ModalDescription>
                    </ModalHeader>
                    <div className="p-4">
                        <p>Your modal content goes here.</p>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}
### 2. Simple Modal (Basic)

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
````

### 3. Controlled Modal

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

## Provider Setup

The modal system includes an integrated provider for automatic floating element management. The ModalProvider is already configured in your app's LayoutClient:

```tsx
import { ModalProvider } from "@/components/ui/modal";

function App() {
 return (
  <ModalProvider>
   <YourApp />
  </ModalProvider>
 );
}
```

## Enhanced Modal Features

The `EnhancedModal` component provides:

- **Automatic floating element hiding**: FloatingCTA and QuickAccessMenu are automatically hidden when modal opens
- **Multiple modal support**: Track multiple modals simultaneously
- **Unique modal IDs**: Auto-generated or custom modal identification
- **Context integration**: Seamless integration with the modal provider system

## Modal Context Usage

Access modal state throughout your application:

```tsx
import { useModalContext } from "@/components/ui/modal";

function MyComponent() {
 const { isAnyModalOpen, openModals } = useModalContext();

 return (
  <div>
   {isAnyModalOpen ? "Modal is open" : "No modal open"}
   <p>Open modals: {openModals.size}</p>
  </div>
 );
}
```

### Advanced Usage with Multiple Modals

Track multiple modals with unique IDs:

```tsx
function MultiModalComponent() {
 const [isPricingOpen, setIsPricingOpen] = useState(false);
 const [isHeroOpen, setIsHeroOpen] = useState(false);

 return (
  <>
   <EnhancedModal
    modalId="pricing-demo"
    open={isPricingOpen}
    onOpenChange={setIsPricingOpen}>
    <ModalContent>{/* Pricing demo content */}</ModalContent>
   </EnhancedModal>

   <EnhancedModal
    modalId="hero-demo"
    open={isHeroOpen}
    onOpenChange={setIsHeroOpen}>
    <ModalContent>{/* Hero demo content */}</ModalContent>
   </EnhancedModal>
  </>
 );
}
```

## Implementation Details

### Provider Integration

The ModalProvider is automatically included in the app layout:

```tsx
// app/LayoutClient.tsx
export default function LayoutClient({ children }) {
 return (
  <ModalProvider>
   <LayoutContent>{children}</LayoutContent>
  </ModalProvider>
 );
}
```

### Floating Element Logic

The layout automatically hides floating elements when modals are open:

```tsx
function LayoutContent({ children }) {
 const { isAnyModalOpen } = useModalContext();
 const shouldShowFloatingElements =
  !isDashboardRoute && !isDevRoute && !isAnyModalOpen;

 return (
  <>
   {shouldShowFloatingElements && (
    <>
     <FloatingCTA />
     <QuickAccessMenu />
    </>
   )}
   {children}
  </>
 );
}
```

### Modal Registration Process

1. **EnhancedModal** wraps content with **ModalClient**
2. **ModalClient** registers the modal with the provider when mounted
3. Provider tracks modal state changes via `setModalOpen()`
4. Layout listens to `isAnyModalOpen` to hide/show floating elements
5. Modal is unregistered when component unmounts

### Multiple Modal Support

The system can track multiple modals simultaneously:

```tsx
const { openModals } = useModalContext();
// openModals is a Set containing IDs of all currently open modals
console.log(`Currently ${openModals.size} modals are open`);
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

The Calendly integration now supports **inline widget rendering** instead of opening external links. Users can schedule appointments directly within the modal without leaving your application.

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
   widgetHeight="700px"
  />
 );
}
```

### Custom Calendly Scheduler

```tsx
import { CalendlyScheduler } from "@/components/scheduling";
import { EnhancedModal as Modal, ModalContent } from "@/components/ui/modal";

function CustomCalendlyModal() {
 const [open, setOpen] = useState(false);

 return (
  <Modal open={open} onOpenChange={setOpen} modalId="custom-calendly">
   <ModalContent size="xl">
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
     responsiveHeight={{
      mobile: "500px", // Height on mobile devices
      tablet: "600px", // Height on tablets (768px+)
      desktop: "700px", // Height on desktop (1024px+)
     }}
     startWithWidget={false}
    />
   </ModalContent>
  </Modal>
 );
}
```

### Responsive Height Configuration

The CalendlyScheduler supports responsive heights that automatically adjust based on screen size:

```tsx
<CalendlyScheduler
 responsiveHeight={{
  mobile: "500px", // Default height on mobile devices
  tablet: "600px", // Height on tablets (768px and above)
  desktop: "700px", // Height on desktop (1024px and above)
 }}
/>
```

### Two-Step Calendly Experience

The CalendlyScheduler component provides a two-step experience:

1. **Information View**: Shows features, description, and a "Schedule Now" button
2. **Widget View**: Displays the Calendly iframe directly in the modal

Users can navigate back and forth between these views using the "Back to Details" button.

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

### EnhancedModal Props

- `open: boolean` - Controlled open state (required)
- `onOpenChange: (open: boolean) => void` - Open state change handler (required)
- `modalId?: string` - Unique modal identifier (auto-generated if not provided)
- `children: React.ReactNode` - Modal content

### ModalProvider Props

- `children: React.ReactNode` - App content to wrap with modal context

### ModalClient Props

- `children: React.ReactNode` - Modal content to wrap
- `modalId: string` - Unique modal identifier
- `isOpen: boolean` - Current open state

### useModalContext Hook

Returns:

- `isAnyModalOpen: boolean` - Whether any modal is currently open
- `openModals: Set<string>` - Set of currently open modal IDs
- `registerModal: (modalId: string) => void` - Register a modal
- `unregisterModal: (modalId: string) => void` - Unregister a modal
- `setModalOpen: (modalId: string, isOpen: boolean) => void` - Set modal open state

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
- `onCalendlyOpen?: () => void` - Callback when Calendly widget is shown
- `showFeatures?: boolean` - Show/hide features list
- `compact?: boolean` - Compact mode for smaller displays
- `startWithWidget?: boolean` - Start with Calendly widget open (default: false)
- `widgetHeight?: string` - Height of the Calendly iframe (default: "650px")
- `responsiveHeight?: { mobile: string; tablet: string; desktop: string }` - Responsive height configuration

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

## Migration Guide

### From Basic Modal to EnhancedModal

Replace basic Modal usage:

```tsx
import { Modal } from "@/components/ui/modal";

<Modal open={isOpen} onOpenChange={setIsOpen}>
 <ModalContent>Content</ModalContent>
</Modal>;
```

With EnhancedModal:

```tsx
import { EnhancedModal as Modal } from "@/components/ui/modal";

<Modal open={isOpen} onOpenChange={setIsOpen} modalId="unique-id">
 <ModalContent>Content</ModalContent>
</Modal>;
```

### From Separate Provider Files

If migrating from the previous separate provider structure:

1. Update imports from `@/components/providers` to `@/components/ui/modal`
2. Use `EnhancedModal` instead of `Modal` for automatic floating element management
3. The provider is already integrated - no separate setup needed

### Backward Compatibility

The basic `Modal` component is still available and works as before, but doesn't integrate with the floating element management system.

## Troubleshooting

### Floating elements not hiding

- **Solution**: Ensure you're using `EnhancedModal`, not basic `Modal`
- **Check**: ModalProvider is properly wrapped around your app
- **Verify**: Modal ID is being passed correctly

### Multiple modals not tracked

- **Solution**: Each modal needs a unique `modalId` prop
- **Debug**: Check browser dev tools for modal provider state
- **Example**: Use descriptive IDs like "pricing-demo", "hero-signup"

### TypeScript errors

- **Solution**: Ensure all provider imports are correct
- **Check**: ModalProvider is properly typed in context usage
- **Verify**: All required props are passed to EnhancedModal

### Modal content overflow

- **Solution**: Use appropriate `size` prop on ModalContent
- **Check**: Content height and use `overflow-y-auto` if needed
- **Consider**: Responsive design for different screen sizes

### Calendly widget not responsive

- **Solution**: Use `responsiveHeight` prop instead of fixed `widgetHeight`
- **Example**: `responsiveHeight={{ mobile: "500px", tablet: "600px", desktop: "700px" }}`

## Best Practices

1. **Use EnhancedModal for better UX** - Automatically hides floating elements when modal opens
2. **Provide unique modal IDs** - For better tracking and debugging in applications with multiple modals
3. **Follow semantic naming** - Use descriptive IDs like "pricing-demo", "hero-signup", "contact-form"
4. **Use semantic HTML** - Include proper titles and descriptions for accessibility
5. **Handle loading states** - Show loading indicators for async operations
6. **Provide clear actions** - Make it obvious how to close or confirm
7. **Mobile optimization** - Test on various screen sizes with responsive heights
8. **Keep content responsive** - Use responsive height options for embedded content
9. **Performance** - Lazy load heavy content when possible
10. **Test modal interactions** - Ensure proper hiding/showing of floating elements

## Examples in the Codebase

### Real-world Implementation Examples

- **PricingSection**: `components/pages-ui/pricing/PricingSection.tsx` - EnhancedModal with Calendly integration
- **HeroSection**: `components/pages-ui/landing/HeroSection.tsx` - Demo scheduling modal
- **LayoutClient**: `app/LayoutClient.tsx` - ModalProvider integration and floating element management

### Key Integration Points

- **ModalProvider Setup**: Already configured in `app/LayoutClient.tsx`
- **Floating Element Management**: Automatic hiding of FloatingCTA and QuickAccessMenu when modals open
- **Responsive Design**: CalendlyScheduler with responsive height support (500px mobile, 600px tablet, 700px+ desktop)

## Migration from Separate Provider Files

If migrating from the previous separate provider structure:

1. Update imports from `@/components/providers` to `@/components/ui/modal`
2. Use `EnhancedModal` instead of `Modal` for automatic floating element management
3. The provider is already integrated - no separate setup needed
