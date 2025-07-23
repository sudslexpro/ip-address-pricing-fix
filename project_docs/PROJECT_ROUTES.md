# Lex Protector Portal - Project Routes

## Project Overview

Next.js 15 application for a legal quotation portal with React 19, TypeScript, and Tailwind CSS. Uses shadcn/ui "new-york" style components with custom theming and PDF generation capabilities.

---

### Public Routes

All routes are located in the `app/` directory using Next.js App Router:

| Route              | Component            | Description                             |
| ------------------ | -------------------- | --------------------------------------- |
| `/`                | `LandingPage`        | Home/Landing page with hero section     |
| `/pricing`         | `PricingPage`        | Pricing plans and commission calculator |
| `/training`        | `TrainingPage`       | Training resources and materials        |
| `/help-center`     | `HelpCenterPage`     | Help and support documentation          |
| `/support`         | `SupportPage`        | Customer support and ticketing          |
| `/legal-resources` | `LegalResourcesPage` | Legal resource library                  |
| `/system-status`   | `SystemStatusPage`   | System monitoring dashboard             |

### Legal & Compliance Routes

| Route               | Component            | Description                  |
| ------------------- | -------------------- | ---------------------------- |
| `/privacy-policy`   | `PrivacyPolicyPage`  | Privacy policy documentation |
| `/terms-of-service` | `TermsOfServicePage` | Terms of service             |
| `/gdpr-compliance`  | `GDPRCompliancePage` | GDPR compliance information  |
| `/cookie-policy`    | `CookiePolicyPage`   | Cookie policy and settings   |

---

### PDF Generation System

- **Location**: `components/pages-ui/download-pdf/`
- **Features**:
  - jsPDF + html2canvas integration
  - A4 format with 2x scale for quality
  - Professional letterhead template
  - Temporary DOM rendering pattern
  - Quote formatting and layout

### Pricing Calculator

- **Location**: `components/pages-ui/pricing/`
- **Features**:
  - Multi-country pricing calculations
  - Commission calculations (15% default)
  - Service-based pricing tiers
  - Timeline estimations
  - Interactive quote generation

---

## Technology Stack

### Core Dependencies

- **Next.js 15** with App Router
- **React 19** with latest features
- **TypeScript 5** with strict mode
- **Tailwind CSS 4** with custom configuration

### Key Libraries

- **UI Framework**: Radix UI primitives via shadcn/ui
- **Forms**: react-hook-form + zod validation
- **PDF Generation**: jspdf + html2canvas
- **Maps**: OpenLayers (ol) for interactive maps
- **Charts**: recharts for data visualization
- **Icons**: lucide-react
- **Animations**: framer-motion + tailwindcss-animate

### Package Management

- **Yarn 4.9.2** (configured in `.yarnrc.yml`)
