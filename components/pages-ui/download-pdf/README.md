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

### 3. PDFViewerModal ⭐ ENHANCED VIEW-ONLY

A versatile PDF viewer modal component for displaying both React content and PDF files.

**Props:**

```typescript
interface PDFViewerModalProps {
 isOpen: boolean; // Controls modal visibility
 onClose: () => void; // Callback when modal closes
 title?: string; // Modal title (default: "PDF Document")
 content?: React.ReactNode; // React content to display
 pdfPath?: string; // PDF file path/URL to load
 size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto"; // Modal size
}
```

**Features:**

- **Dual Mode Support**: Display either React content or PDF files
- **PDF File Rendering**: Uses react-pdf for proper PDF file display
- **Page Navigation**: Next/Previous page controls for multi-page PDFs
- **Responsive Design**: Automatically scales PDF content for optimal viewing
- **Loading States**: Shows loading indicators and error messages
- **Professional Formatting**: A4 page sizing with proper margins for React content
- **Accessibility**: Full keyboard navigation and screen reader support

**PDF File Features:**

- Multi-page PDF support with navigation
- Automatic page scaling
- Error handling for invalid PDF files
- Loading indicators
- Page counter display

### 4. usePDFViewerModal Hook

A custom hook for managing PDF viewer modal state with support for both React content and PDF files.

**Usage:**

```typescript
const pdfModal = usePDFViewerModal({
 defaultTitle: "My Document",
 defaultSize: "xl",
});

// Open modal with React content
pdfModal.openModal(<MyContent />, {
 title: "Custom Title",
});

// Open modal with PDF file
pdfModal.openPDFModal("/path/to/document.pdf", {
 title: "PDF Document",
});
```

**Methods:**

- `openModal(content, options)` - Opens modal with React content
- `openPDFModal(pdfPath, options)` - Opens modal with PDF file
- `closeModal()` - Closes the modal

### 5. PDFViewerDemo

A demonstration component showing sample quotation and schedule of charges with the PDF viewer modal.

## Dependencies

- `@radix-ui/react-dialog` - Modal components for accessibility
- `react-pdf` - PDF file rendering and display
- `pdfjs-dist` - PDF.js library for PDF processing
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

 const handleShowPDFFile = () => {
  pdfModal.openPDFModal("/path/to/document.pdf", {
   title: "PDF Document",
  });
 };

 return (
  <div>
   <button onClick={handleShowDocument}>View React Content</button>
   <button onClick={handleShowPDFFile}>View PDF File</button>

   <PDFViewerModal
    isOpen={pdfModal.isOpen}
    onClose={pdfModal.closeModal}
    title={pdfModal.title}
    content={pdfModal.content}
    pdfPath={pdfModal.pdfPath}
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
