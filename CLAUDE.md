# CLAUDE.md - SHA Customer Discovery Site

> **Last Updated:** January 23, 2026
> **Purpose:** Shared context for AI assistants and team coordination

---

## TEAM PROTOCOL: COORDINATED AI DEVELOPMENT

This document is the "Project Brain" - the single source of truth for all Claude AI instances working on this codebase.

### Before Every Session

```bash
# 1. Pull latest changes (including this file)
git pull origin main

# 2. Start Claude Code and verify context
claude
# Then type: "Check CLAUDE.md for latest project rules."
```

### Branching Strategy (No Direct Pushes to Main)

```bash
# Create feature branch
git checkout -b feature/your-task-name

# Work in isolation
# Push to your branch only
git push origin feature/your-task-name

# Merge via Pull Request - never direct to main
```

### If You Change Anything Significant

Update this CLAUDE.md file immediately:
- New database tables -> Add to Database section
- New environment variables -> Add to Environment section
- New pages/routes -> Add to Structure section
- New survey questions -> Add to Survey Segments section

---

## PROJECT OVERVIEW

**SHA Customer Discovery Site** is the pre-launch platform for Scalp Health Alliance. It serves as a multi-segment survey and lead capture system designed to gather insights from three key user groups: Hair Professionals, Dermatologists, and Clients seeking scalp health care.

### Purpose

- Validate market hypotheses before full launch
- Capture survey responses from HP, Derm, and Client segments
- Schedule I-Corps interviews
- Build early interest list

### Mission

Bridge the gap between salon chairs and dermatologist offices by understanding the needs and pain points of each stakeholder group.

---

## TECH STACK

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3.4 |
| Database | Supabase (PostgreSQL) |
| Forms | React Hook Form + Zod validation |
| Package Manager | npm |

---

## PROJECT STRUCTURE

```
SHA-EXTERNAL-SITE/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout with fonts & metadata
│   ├── page.tsx                # Landing page (segment selection)
│   ├── globals.css             # Global styles & Tailwind imports
│   ├── icon.svg                # Favicon
│   │
│   ├── hp/                     # Hair Professional segment
│   │   ├── page.tsx            # HP info page with interview form
│   │   └── survey/page.tsx     # HP multi-step survey
│   │
│   ├── derm/                   # Dermatologist segment
│   │   ├── page.tsx            # Derm info page
│   │   └── survey/page.tsx     # Derm multi-step survey
│   │
│   ├── client/                 # Client segment
│   │   ├── page.tsx            # Client info page
│   │   └── survey/page.tsx     # Client multi-step survey
│   │
│   └── thank-you/page.tsx      # Shared confirmation page with segment-specific messaging
│
├── components/
│   ├── landing/                # Landing page components
│   │   ├── Hero.tsx            # Hero section
│   │   └── DiscoveryCard.tsx   # Segment card component
│   │
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx          # Fixed navigation header
│   │   ├── Footer.tsx          # Page footer
│   │   └── Container.tsx       # Content container wrapper
│   │
│   ├── survey/                 # Survey-specific components
│   │   ├── SurveyWrapper.tsx   # Survey page layout with progress
│   │   ├── ProgressBar.tsx     # Step progress indicator
│   │   └── QuestionBlock.tsx   # Question wrapper component
│   │
│   └── ui/                     # Reusable UI components
│       ├── Button.tsx          # Button with variants (primary/secondary/outline)
│       ├── Card.tsx            # Card container
│       ├── Input.tsx           # Text input with label/error
│       ├── Checkbox.tsx        # Checkbox input
│       ├── RadioGroup.tsx      # Radio button group
│       └── Select.tsx          # Select dropdown
│
├── lib/
│   ├── actions.ts              # Server actions for form submissions
│   └── supabase.ts             # Supabase client configuration
│
├── types/
│   └── survey.ts               # TypeScript types + Zod schemas for all surveys
│
├── docs/                       # Documentation and resources
│   └── Technical Whitepaper... # SHA Compliance Infrastructure doc
│
├── public/
│   └── logo.svg                # SHA logo
│
├── CLAUDE.md                   # THIS FILE - AI assistant guide
├── supabase-schema.sql         # Database schema for Supabase
├── tailwind.config.ts          # Tailwind configuration with brand colors
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies and scripts
```

---

## DATABASE

### Critical Rules for Claude AI

| Rule | Description |
|------|-------------|
| **No Dashboard Changes** | Do not manually edit tables in the Supabase UI |
| **Migrations Only** | All schema changes via SQL files |
| **No Hardcoded Keys** | Always use `process.env` |
| **No PII in Logs** | Don't log email addresses or personal info |

### Schema: discovery_responses

```sql
CREATE TABLE discovery_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  segment TEXT NOT NULL CHECK (segment IN ('hp', 'derm', 'client')),
  responses JSONB NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  wants_updates BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_discovery_responses_segment ON discovery_responses(segment);
CREATE INDEX idx_discovery_responses_created_at ON discovery_responses(created_at DESC);

-- RLS Policies
ALTER TABLE discovery_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON discovery_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated reads" ON discovery_responses FOR SELECT USING (auth.role() = 'authenticated');
```

### Extended Fields (in application)

The `DiscoveryResponse` TypeScript interface includes additional fields handled by server actions:
- `zip_code`, `state` - Location data
- `preferred_contact`, `availability` - Interview scheduling
- `wants_interview` - Interview interest flag
- `source` - Submission source ('survey', 'interview_only', 'both')

---

## USER SEGMENTS

### Hair Professional (HP)

| Property | Value |
|----------|-------|
| Route | `/hp` (info page), `/hp/survey` (survey) |
| Accent Color | Gold (`#C9A227`) |
| Focus | Scalp observation experiences, interest in referral tools |
| Survey Fields | Professional type, years experience, condition frequency, current actions, client reactions, tool interest, training interest |

### Dermatologist (Derm)

| Property | Value |
|----------|-------|
| Route | `/derm` (info page), `/derm/survey` (survey) |
| Accent Color | Teal (`#2A9D8F`) |
| Focus | Practice types, patient pipeline, EMR systems |
| Survey Fields | Practice type, practice setting, patient volume, no-show rate, pipeline interest, async review fit, EMR system |

### Client

| Property | Value |
|----------|-------|
| Route | `/client` (info page), `/client/survey` (survey) |
| Accent Color | Coral (`#E07A5F`) |
| Focus | Prior experiences, trust levels, service interest |
| Survey Fields | Has experience, condition types, previous actions, derm wait time, HP trust, service interest, photo comfort |

---

## BRAND COLORS

Defined in `tailwind.config.ts`:

```typescript
colors: {
  navy: '#1B365D',   // Primary text color
  gold: '#C9A227',   // HP accent, primary buttons
  teal: '#2A9D8F',   // Derm accent
  coral: '#E07A5F',  // Client accent, errors
  cream: '#FAF8F5',  // Background color
}
```

### Font Families

```typescript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  serif: ['Playfair Display', 'serif'],
}
```

---

## DATA FLOW

```
Landing Page (/)
    │
    ▼
User selects segment
    │
    ▼
Info Page (/hp, /derm, /client)
    │
    ├─► Survey (/hp/survey, etc.)
    │       │
    │       ▼
    │   Form validation (Zod + React Hook Form)
    │       │
    │       ▼
    │   Server Action (submitSurvey)
    │
    └─► Interview Interest Form (on info page)
            │
            ▼
        Server Action (submitInterviewInterest)
            │
            ▼
        Supabase insert (discovery_responses)
            │
            ▼
        Thank You Page (/thank-you?segment=hp|derm|client)
```

---

## ENVIRONMENT VARIABLES

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Setup: Copy `.env.local.example` to `.env.local` and configure.

---

## COMMON COMMANDS

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## CODE CONVENTIONS

### Component Patterns

1. **Server Components** (default): Use for pages without interactivity
2. **Client Components**: Mark with `'use client'` for:
   - Forms with state
   - Interactive elements
   - React hooks usage

### Form Pattern

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hpSurveySchema, type HpSurveyData } from '@/types/survey';

export default function SurveyPage() {
  const form = useForm<HpSurveyData>({
    resolver: zodResolver(hpSurveySchema),
    defaultValues: { segment: 'hp', ... },
  });

  const onSubmit = async (data: HpSurveyData) => {
    await submitSurvey(data);
    router.push('/thank-you?segment=hp');
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

### Server Action Pattern

```typescript
// lib/actions.ts
'use server';

import { supabase } from './supabase';
import type { SurveyData, DiscoveryResponse } from '@/types/survey';

export async function submitSurvey(data: SurveyData): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('discovery_responses')
    .insert([record]);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
```

### Styling Guidelines

- Use Tailwind utility classes
- Brand colors via config names (`text-navy`, `bg-gold`, etc.)
- Consistent border-radius: `rounded-xl` (forms), `rounded-2xl` (cards), `rounded-3xl` (large containers)
- Consistent spacing: `p-6`, `gap-4`, `space-y-4`
- Card pattern: `bg-white rounded-xl shadow-sm p-6`
- Responsive: Mobile-first, `md:` for tablet, `lg:` for desktop

---

## IMPORTANT FILES

| File | Purpose |
|------|---------|
| `types/survey.ts` | All TypeScript types and Zod validation schemas |
| `lib/actions.ts` | Server actions (`submitSurvey`, `submitInterviewInterest`) |
| `lib/supabase.ts` | Supabase client configuration |
| `tailwind.config.ts` | Brand colors and theme extensions |
| `supabase-schema.sql` | Database table and policy definitions |

---

## COMMON TASKS

### Adding a New Survey Question

1. Add field to Zod schema in `types/survey.ts`
2. Add to `defaultValues` in survey page
3. Add validation step in `handleNext` switch statement
4. Create step UI with `QuestionBlock` wrapper
5. Update `TOTAL_STEPS` constant

### Modifying Brand Colors

1. Update `tailwind.config.ts` colors object
2. Update CSS variables in `app/globals.css` if needed
3. Verify component usage of color classes

### Adding New UI Components

1. Create in `components/ui/` directory
2. Use `forwardRef` for form-compatible components
3. Include variant and size props where applicable
4. Export with `displayName` for DevTools

### Adding a New Segment

1. Create `/app/[segment]/page.tsx` (info page)
2. Create `/app/[segment]/survey/page.tsx` (survey)
3. Add segment card to landing page (`app/page.tsx`)
4. Create Zod validation schema in `types/survey.ts`
5. Update `Segment` type union
6. Update database CHECK constraint if needed

---

## TESTING CONSIDERATIONS

- Ensure all three survey flows complete successfully
- Verify Supabase connection with valid credentials
- Test responsive layouts (mobile, tablet, desktop)
- Validate form error states and required field messaging
- Test interview-only form submissions
- Verify thank-you page shows correct segment-specific messaging

---

## NOTES FOR AI ASSISTANTS

- This is a customer discovery tool, not the main SHA product
- Survey responses are stored as JSONB for flexibility
- The platform is pre-launch; focus is on data collection
- No authentication required for survey submission
- All surveys support optional contact info collection for follow-up interviews
- Single shared thank-you page handles all segments via query parameter

---

## CURRENT SPRINT: I-CORPS VALIDATION

### Key Hypotheses to Test

| ID | Segment | Hypothesis | Target |
|----|---------|------------|--------|
| H4 | HP | Images essential for confidence | >=70% |
| H5 | HP | Referral-only insufficient | >=60% |
| H10 | Derm | Would accept referrals WITHOUT images | >=40% |
| H13 | Client | Comfortable with HP photo capture | >=60% |

### Interview Targets

- HP: 15 interviews
- Derm: 15 interviews
- Client: 15 interviews

---

*This file is the shared context for all team members and AI assistants. Keep it updated!*
