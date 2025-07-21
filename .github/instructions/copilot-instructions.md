# Lex Protector Portal - AI Coding Instructions

## Project Overview

Next.js 15 application for a legal quotation portal with React 19, TypeScript, and Tailwind CSS. Uses shadcn/ui "new-york" style components with custom theming and PDF generation capabilities.

## Architecture Patterns

### Component Organization

- **Pages**: `components/pages-ui/[feature]/` - Feature-specific page components (landing, pricing)
- **UI Components**: `components/ui/` - shadcn/ui components with customizations
- **Layout**: `components/navigation/`, `components/footer/`, `components/cta/` - Global layout elements
- **Utilities**: `lib/utils.ts` exports `cn()` for className merging with clsx + tailwind-merge

### File Structure Convention

```
components/pages-ui/[feature]/
├── [Feature]Page.tsx      # Main page component
├── [Feature]Section.tsx   # Section components
└── index.ts              # Optional barrel exports
```

Example: `components/pages-ui/pricing/` contains `PricingPage.tsx`, `PricingSection.tsx`, `CommissionCalculator.tsx`

### Import Aliases

- `@/components` - All components
- `@/lib` - Utilities and shared logic
- `@/hooks` - Custom React hooks
- `@/app` - Next.js app directory

## Key Features & Patterns

### PDF Generation

Located in `components/pages-ui/download-pdf/`:

- Uses `jspdf` + `html2canvas` for PDF generation
- `LexProtectorLetterhead.tsx` - Reusable letterhead component
- `PDFDownloadComponent.tsx` - Main PDF generation logic
- A4 format with 2x scale for quality, temporary DOM rendering pattern

### State Management

- Uses React hooks for local state
- Complex forms use react-hook-form with zod validation
- No global state management currently implemented

### Styling System

- **shadcn/ui**: "new-york" style with custom theme in `app/globals.css`
- **Custom Colors**: Uses OKLCH color space for consistent theming
- **Animations**: `framer-motion` for interactions, `tw-animate-css` for utilities
- **Responsive**: Mobile-first approach with Tailwind breakpoints

## Development Workflow

### Scripts

```bash
yarn dev                # Development with Turbopack
yarn build             # Production build
yarn lint              # ESLint checking
```

### Adding shadcn/ui Components

Components are pre-configured in `components.json` with aliases. Add new ones via shadcn CLI or manually following the existing pattern in `components/ui/`.

### Theming

CSS variables in `app/globals.css` define the design system. Use semantic color names (primary, secondary, muted) rather than specific colors.

## Critical Dependencies

### Core Stack

- **Next.js 15** with App Router
- **React 19** with new features
- **TypeScript 5** with strict mode
- **Tailwind CSS 4** with custom configuration

### Key Libraries

- **UI**: Radix UI primitives via shadcn/ui
- **Forms**: react-hook-form + @hookform/resolvers + zod
- **PDF**: jspdf + html2canvas + @types/jspdf
- **Charts**: recharts for data visualization
- **Icons**: lucide-react (configured in components.json)
- **Animations**: framer-motion + tailwindcss-animate

### Specialized Tools

- **Maps**: OpenLayers (`ol`) for interactive coverage maps
- **Data Viz**: D3.js for custom visualizations
- **Package Manager**: Yarn 4.9.2 (see `.yarnrc.yml`)

## Code Conventions

### Component Patterns

```tsx
// Prefer named exports with explicit typing
const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
	return <div className={cn("base-classes", conditionalClasses)}>content</div>;
};
export default ComponentName;
```

### Styling

- Use `cn()` utility for conditional classes: `cn("base", condition && "conditional")`
- Prefer Tailwind utilities over custom CSS
- Use semantic color tokens: `bg-primary`, `text-muted-foreground`

### File Naming

- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Pages: PascalCase matching feature (e.g., `LandingPage.tsx`)

## Business Context

Legal technology platform focused on quotation generation and PDF document creation. Features include pricing calculators, interactive maps, and professional PDF letterhead generation for law firms.
