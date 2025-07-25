# PDF Viewer Components

This folder contains components for viewing and displaying PDF-style documents with the Lex Protector letterhead, including a comprehensive PDF viewer modal system.

## Components

### 1. LexProtectorLetterhead

A React component that renders the official Lex Protector letterhead with company branding.

**Props:**

- `date?: string` - Custom date to display (defaults to current date)
- `quoteNumber?: string` - Custom quote number (defaults to auto-generated number)

**Features:**

- Professional company branding with logo
- Contact information display
- Quote number and date
- Responsive design optimized for A4 paper

### 2. PDFDownloadComponent

A React component that generates and downloads PDF quotes with the letterhead and quote details.

**Props:**

- `quote: GeneratedQuote` - The quote data to include in the PDF
- `onDownloadComplete?: () => void` - Callback function called after successful PDF generation

**Features:**

- A4 size PDF generation
- Professional letterhead formatting
- Tabular quote breakdown by country
- Services summary
- Terms and conditions
- Automatic filename with timestamp
- High-quality PDF output (2x scale)

### 3. PDFViewerModal ⭐ VIEW-ONLY

A simplified PDF viewer modal component for displaying documents in a professional format.

**Props:**

```typescript
interface PDFViewerModalProps {
 isOpen: boolean; // Controls modal visibility
 onClose: () => void; // Callback when modal closes
 title?: string; // Modal title (default: "PDF Document")
 content: React.ReactNode; // Content to display
 size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto"; // Modal size
}
```

**Features:**

- **Document Viewing**: Professional A4-sized document display
- **Responsive Design**: Multiple size options and mobile-friendly
- **Clean Interface**: Simplified view-only modal with professional styling
- **Accessibility**: Full keyboard navigation and screen reader support
- **Professional Formatting**: A4 page sizing with proper margins and styling

### 4. usePDFViewerModal Hook

A custom hook for managing PDF viewer modal state.

**Usage:**

```typescript
const pdfModal = usePDFViewerModal({
 defaultTitle: "My Document",
 defaultSize: "xl",
});

// Open modal with content
pdfModal.openModal(<MyContent />, {
 title: "Custom Title",
});
```

### 5. PDFViewerDemo

A demonstration component showing sample quotation and schedule of charges with the PDF viewer modal.

## Dependencies

- `@radix-ui/react-dialog` - Modal components for accessibility
- React and TypeScript for component functionality

## Usage Example

```tsx
import {
 PDFViewerModal,
 usePDFViewerModal,
} from "@/components/pages-ui/download-pdf";

// In your component
const MyComponent = () => {
 const pdfModal = usePDFViewerModal();

 const handleShowDocument = () => {
  const content = (
   <div>
    <h1>My Document Title</h1>
    <p>Document content goes here...</p>
   </div>
  );

  pdfModal.openModal(content, {
   title: "My Custom Document",
  });
 };

 return (
  <div>
   <button onClick={handleShowDocument}>View Document</button>

   <PDFViewerModal
    isOpen={pdfModal.isOpen}
    onClose={pdfModal.closeModal}
    title={pdfModal.title}
    content={pdfModal.content}
    size={pdfModal.size}
   />
  </div>
 );
};
```

## Technical Details

- Documents are displayed in A4 size format (210mm x 297mm)
- Professional styling with proper margins and spacing
- Modal-based viewing with responsive design
- Clean, distraction-free viewing experience
- Optimized for both desktop and mobile devices

## File Structure

```directory
components/pages-ui/download-pdf/
├── index.ts                     # Export file
├── LexProtectorLetterhead.tsx   # Letterhead component
├── PDFDownloadComponent.tsx     # PDF generation component
├── PDFViewerModal.tsx          # Document viewer modal (view-only)
├── PDFViewerDemo.tsx           # Demo component
└── README.md                   # This documentation
```
