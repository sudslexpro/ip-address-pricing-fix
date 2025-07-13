# PDF Download Components

This folder contains components for generating and downloading PDF quotes with the Lex Protector letterhead.

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
- Professional letterhead integration
- Tabular quote breakdown by country
- Services summary
- Terms and conditions
- Automatic filename with timestamp
- High-quality PDF output (2x scale)

## Dependencies

- `jspdf` - PDF generation library
- `html2canvas` - HTML to canvas conversion for PDF
- `@types/jspdf` - TypeScript definitions for jsPDF

## Usage Example

```tsx
import { PDFDownloadComponent } from "@/components/pages-ui/download-pdf";

// In your component
const MyComponent = () => {
	const quote = {
		countries: [
			{
				country: "United States",
				flag: "🇺🇸",
				governmentFee: 325,
				attorneyFee: 200,
				commission: 78,
				total: 603,
				timeline: "8-12 months",
				services: ["Trademark Search", "Application Filing"],
			},
			// ... more countries
		],
		services: [
			{
				id: "search",
				name: "Trademark Search",
				description: "Comprehensive database search",
				basePrice: 150,
			},
			// ... more services
		],
		grandTotal: 1500,
		generatedAt: new Date().toISOString(),
	};

	return (
		<PDFDownloadComponent
			quote={quote}
			onDownloadComplete={() => {
				console.log("PDF download completed");
			}}
		/>
	);
};
```

## Technical Details

- PDF is generated at A4 size (210mm x 297mm)
- Uses 2x scaling for high-quality output
- Supports multi-page PDFs for long content
- Currency formatting in USD
- Professional styling with proper margins and spacing
- Print-optimized CSS for clean PDF output

## File Structure

```
components/pages-ui/download-pdf/
├── index.ts                     # Export file
├── LexProtectorLetterhead.tsx   # Letterhead component
├── PDFDownloadComponent.tsx     # Main PDF generation component
└── README.md                    # This documentation
```
