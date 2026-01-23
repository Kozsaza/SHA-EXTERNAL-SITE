# CLAUDE.md - AI Assistant Guide for SHA External Site

## Project Overview

**SHA External Site** is the customer discovery platform for the Scalp Health Alliance (SHA). It serves as a multi-segment survey and lead capture system designed to gather insights from three key user groups: Hair Professionals, Dermatologists, and Clients seeking scalp health care.

The platform's mission is to bridge the gap between salon chairs and dermatologist offices by understanding the needs and pain points of each stakeholder group.

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3.4 |
| Database | Supabase (PostgreSQL) |
| Forms | React Hook Form + Zod validation |
| Package Manager | npm |

## Project Structure

```
SHA-EXTERNAL-SITE/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Landing page with segment cards
│   ├── globals.css           # Global styles + Tailwind imports
│   ├── icon.svg              # Favicon
│   ├── hp/                   # Hair Professional segment
│   │   ├── page.tsx          # HP info page with interview form
│   │   └── survey/page.tsx   # HP multi-step survey
│   ├── derm/                 # Dermatologist segment
│   │   ├── page.tsx          # Derm info page
│   │   └── survey/page.tsx   # Derm multi-step survey
│   ├── client/               # Client segment
│   │   ├── page.tsx          # Client info page
│   │   └── survey/page.tsx   # Client multi-step survey
│   └── thank-you/page.tsx    # Confirmation page with segment-specific messaging
├── components/
│   ├── landing/              # Landing page components
│   │   ├── Hero.tsx          # Hero section
│   │   └── DiscoveryCard.tsx # Segment card component
│   ├── layout/               # Layout components
│   │   ├── Header.tsx        # Fixed navigation header
│   │   ├── Footer.tsx        # Page footer
│   │   └── Container.tsx     # Content container wrapper
│   ├── survey/               # Survey-specific components
│   │   ├── SurveyWrapper.tsx # Survey page layout with progress
│   │   ├── ProgressBar.tsx   # Step progress indicator
│   │   └── QuestionBlock.tsx # Question wrapper component
│   └── ui/                   # Reusable UI components
│       ├── Button.tsx        # Button with variants (primary/secondary/outline)
│       ├── Card.tsx          # Card container
│       ├── Input.tsx         # Text input with label/error
│       ├── Checkbox.tsx      # Checkbox input
│       ├── RadioGroup.tsx    # Radio button group
│       └── Select.tsx        # Select dropdown
├── lib/
│   ├── actions.ts            # Server actions for form submissions
│   └── supabase.ts           # Supabase client initialization
├── types/
│   └── survey.ts             # TypeScript types + Zod schemas for all surveys
├── docs/                     # Documentation and resources
├── public/
│   └── logo.svg              # SHA logo
├── supabase-schema.sql       # Database schema for Supabase
├── tailwind.config.ts        # Tailwind configuration with brand colors
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Key Concepts

### User Segments

The application serves three distinct user segments, each with dedicated pages and surveys:

1. **Hair Professionals (HP)** - `/hp`
   - Hairstylists, barbers, braiders, salon owners
   - Accent color: `gold` (#C9A227)
   - Focus: Scalp observation experiences, interest in referral tools

2. **Dermatologists (Derm)** - `/derm`
   - Practicing dermatologists
   - Accent color: `teal` (#2A9D8F)
   - Focus: Practice types, patient pipeline, EMR systems

3. **Clients** - `/client`
   - People seeking scalp health care
   - Accent color: `coral` (#E07A5F)
   - Focus: Prior experiences, trust levels, service interest

### Brand Colors (defined in `tailwind.config.ts`)

```typescript
colors: {
  navy: '#1B365D',   // Primary text color
  gold: '#C9A227',   // HP accent, primary buttons
  teal: '#2A9D8F',   // Derm accent
  coral: '#E07A5F',  // Client accent, errors
  cream: '#FAF8F5',  // Background color
}
```

### Data Flow

1. User selects segment on landing page
2. User views info page with benefits and options
3. User can:
   - Take survey (multi-step form)
   - Express interview interest (quick form)
   - Both
4. Data submitted via Server Actions to Supabase
5. User redirected to thank-you page with segment-specific messaging

## Development

### Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Setup

Copy `.env.local.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

Run `supabase-schema.sql` in your Supabase SQL Editor to create the `discovery_responses` table with:
- Row Level Security (RLS) enabled
- Anonymous inserts allowed
- Authenticated reads only

## Code Conventions

### Component Patterns

1. **Server Components** (default): Use for pages without interactivity
2. **Client Components**: Mark with `'use client'` for:
   - Forms with state
   - Interactive elements
   - React hooks usage

### Form Handling

All surveys use React Hook Form with Zod schemas:

```typescript
// Schema definition in types/survey.ts
export const hpSurveySchema = z.object({
  segment: z.literal('hp'),
  professionalType: z.string().min(1, 'Required'),
  // ...
})

// Form usage in survey pages
const { control, handleSubmit } = useForm<HpSurveyData>({
  resolver: zodResolver(hpSurveySchema),
  defaultValues: { segment: 'hp', ... }
})
```

### Styling Guidelines

- Use Tailwind utility classes
- Brand colors via config names (`text-navy`, `bg-gold`, etc.)
- Consistent border-radius: `rounded-xl` (forms), `rounded-2xl` (cards), `rounded-3xl` (large containers)
- Font families: Inter (sans), Playfair Display (serif/headings)

### Server Actions

Located in `lib/actions.ts`:

```typescript
// Submit full survey
submitSurvey(data: SurveyData): Promise<{ success: boolean; error?: string }>

// Submit interview interest only
submitInterviewInterest(segment: string, data: InterviewInterestData): Promise<{ success: boolean; error?: string }>
```

## Important Files

| File | Purpose |
|------|---------|
| `types/survey.ts` | All TypeScript types and Zod validation schemas |
| `lib/actions.ts` | Server actions for database submissions |
| `lib/supabase.ts` | Supabase client configuration |
| `tailwind.config.ts` | Brand colors and theme extensions |
| `supabase-schema.sql` | Database table and policy definitions |

## Testing Considerations

- Ensure all three survey flows complete successfully
- Verify Supabase connection with valid credentials
- Test responsive layouts (mobile, tablet, desktop)
- Validate form error states and required field messaging

## Common Tasks

### Adding a New Survey Question

1. Add field to schema in `types/survey.ts`
2. Add to `defaultValues` in survey page
3. Add validation step in `handleNext` switch statement
4. Create step UI with `QuestionBlock` wrapper
5. Update `TOTAL_STEPS` constant

### Modifying Brand Colors

1. Update `tailwind.config.ts` colors object
2. Update CSS variables in `app/globals.css`
3. Verify component usage of color classes

### Adding New UI Components

1. Create in `components/ui/` directory
2. Use `forwardRef` for form-compatible components
3. Include variant and size props where applicable
4. Export with `displayName` for DevTools

## Notes for AI Assistants

- This is a customer discovery tool, not the main SHA product
- Survey responses are stored as JSONB for flexibility
- The platform is pre-launch; focus is on data collection
- No authentication required for survey submission
- All surveys support optional contact info collection for follow-up interviews
