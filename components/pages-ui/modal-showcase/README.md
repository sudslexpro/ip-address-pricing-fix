# Modal Showcase Page

## Overview

The Modal Showcase page (`/modal-showcase`) provides a comprehensive demonstration of all modal components and variants available in the Lex Protector Portal. It serves as both a visual reference and testing ground for the modal system.

## Features Demonstrated

### Modal Sizes

| Size                 | Width         | Best For                                 |
| -------------------- | ------------- | ---------------------------------------- |
| **Small (sm)**       | 384px (24rem) | Alerts, confirmations, simple dialogs    |
| **Default**          | 512px (32rem) | General purpose modals, basic forms      |
| **Medium (md)**      | 640px (40rem) | Detailed forms, content displays         |
| **Large (lg)**       | 768px (48rem) | Rich content, complex forms              |
| **Extra Large (xl)** | 896px (56rem) | Calendly integration, complex interfaces |
| **Full Screen**      | 100% viewport | Immersive experiences, full applications |
| **Auto Size**        | Fit content   | Dynamic content that varies in size      |

### Special Modal Types

1. **Scrollable Content Modal**

   - Demonstrates automatic scrolling when content exceeds viewport height
   - Maintains header and footer visibility
   - Smooth scroll behavior

2. **Calendly Scheduler Modal**

   - Integration with CalendlyScheduler component
   - Two-step booking experience
   - Embedded iframe functionality

3. **Confirmation Dialog**

   - Destructive action confirmation
   - Warning indicators and icons
   - Clear action buttons

4. **Form Modal**

   - Input field demonstrations
   - Form layout best practices
   - Validation-ready structure

5. **Alert Modal**
   - Success/error message display
   - Centered icon and content
   - Single action confirmation

## Component Architecture

### Files Structure

```directory
components/pages-ui/modal-showcase/
├── ModalShowcasePage.tsx     # Main showcase component
└── index.ts                  # Export barrel
```

### Page Route

- **URL**: `/modal-showcase`
- **File**: `app/modal-showcase/page.tsx`

## Usage Examples

### Basic Modal Implementation

```tsx
import {
 Modal,
 ModalContent,
 ModalHeader,
 ModalTitle,
} from "@/components/ui/modal";

const [isOpen, setIsOpen] = useState(false);

<Modal open={isOpen} onOpenChange={setIsOpen}>
 <ModalContent size="md">
  <ModalHeader>
   <ModalTitle>My Modal</ModalTitle>
  </ModalHeader>
  <div className="p-6">Content goes here</div>
 </ModalContent>
</Modal>;
```

### Calendly Integration

```tsx
<Modal open={calendlyOpen} onOpenChange={setCalendlyOpen}>
 <ModalContent size="xl">
  <CalendlyScheduler
   calendlyUrl="https://calendly.com/your-username"
   eventType="demo"
   title="Schedule Demo"
   widgetHeight="700px"
  />
 </ModalContent>
</Modal>
```

### Confirmation Dialog

```tsx
<Modal open={confirmOpen} onOpenChange={setConfirmOpen}>
 <ModalContent size="sm">
  <ModalHeader>
   <ModalTitle>Confirm Action</ModalTitle>
   <ModalDescription>Are you sure you want to proceed?</ModalDescription>
  </ModalHeader>
  <ModalFooter>
   <Button variant="outline" onClick={() => setConfirmOpen(false)}>
    Cancel
   </Button>
   <Button variant="destructive" onClick={handleConfirm}>
    Delete
   </Button>
  </ModalFooter>
 </ModalContent>
</Modal>
```

## Technical Details

### Dependencies

- **Radix UI Dialog**: Headless modal primitives
- **shadcn/ui**: Design system and styling
- **React useState**: State management for modal open/close
- **Tailwind CSS**: Responsive styling and animations

### Accessibility Features

- Keyboard navigation (ESC to close)
- Focus management and trap
- ARIA labels and descriptions
- Screen reader compatibility
- Backdrop click to close

### Responsive Behavior

- Automatic width adjustment on mobile
- Proper spacing and padding
- Touch-friendly interaction areas
- Smooth animations and transitions

## Best Practices Demonstrated

1. **Size Selection**

   - Use appropriate sizes for content type
   - Consider mobile experience
   - Test with various content amounts

2. **Content Structure**

   - Clear header with title and description
   - Consistent spacing and padding
   - Logical footer with actions

3. **User Experience**

   - Clear action buttons
   - Proper error states
   - Loading states where appropriate
   - Intuitive close mechanisms

4. **Performance**
   - Lazy loading of modal content
   - Efficient state management
   - Minimal re-renders

## Testing

The showcase page allows you to:

- Test all modal sizes on different screen sizes
- Verify scrolling behavior with long content
- Test Calendly integration (requires valid URL)
- Validate form interactions
- Check confirmation flows
- Verify accessibility features

## Development

### Adding New Modal Types

1. Add state management for the new modal
2. Add button to trigger the modal
3. Implement the modal with appropriate content
4. Add to the special modals array if needed
5. Update documentation

### Customizing Styles

The modals inherit from the global design system. To customize:

1. Update `components/ui/modal.tsx` for global changes
2. Use className props for specific modifications
3. Follow shadcn/ui theming patterns

---

_This showcase serves as both documentation and testing tool for the modal system._
