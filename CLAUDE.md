# CLAUDE.md - SHA Customer Discovery Site

> **Last Updated:** January 23, 2026
> **Purpose:** Shared context for AI assistants and team coordination

---

## 🤝 TEAM PROTOCOL: COORDINATED AI DEVELOPMENT

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
- New database tables → Add to Database section
- New environment variables → Add to Environment section
- New pages/routes → Add to Structure section
- New survey questions → Add to Survey Segments section

---

## 📋 PROJECT OVERVIEW

**SHA Customer Discovery Site** is the pre-launch platform for Scalp Health Alliance. It serves as a multi-segment survey and lead capture system designed to gather insights from three key user groups.

### Purpose
- Validate market hypotheses before full launch
- Capture survey responses from HP, Derm, and Client segments
- Schedule I-Corps interviews
- Build early interest list

### Relationship to Main Platform

| Site | Repository | Purpose | URL |
|------|------------|---------|-----|
| **This Site** | SHA-EXTERNAL-SITE | Customer discovery surveys | scalphealthalliance.com |
| **MVP Platform** | Scalp-Health-Alliance | Full application | mvp.scalphealthalliance.com |

---

## 🛠️ TECH STACK

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3.4 |
| Database | Supabase (PostgreSQL) |
| Forms | React Hook Form + Zod validation |
| Package Manager | npm |
| Hosting | Vercel |

---

## 📁 PROJECT STRUCTURE

```
SHA-EXTERNAL-SITE/
├── app/
│   ├── layout.tsx              # Root layout with fonts & metadata
│   ├── page.tsx                # Landing page (segment selection)
│   ├── globals.css             # Global styles & Tailwind imports
│   ├── icon.svg                # Favicon
│   │
│   ├── hp/                     # Hair Professional segment
│   │   ├── page.tsx            # HP info page with interview form
│   │   └── survey/page.tsx     # HP multi-step survey (9 steps)
│   │
│   ├── derm/                   # Dermatologist segment
│   │   ├── page.tsx            # Derm info page
│   │   └── survey/page.tsx     # Derm multi-step survey
│   │
│   ├── client/                 # Client/Patient segment
│   │   ├── page.tsx            # Client info page
│   │   └── survey/page.tsx     # Client multi-step survey
│   │
│   └── thank-you/page.tsx      # Shared confirmation page (segment-specific messaging)
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
│   └── survey.ts               # TypeScript types + Zod validation schemas
│
├── docs/                       # Documentation and resources
├── public/
│   └── logo.svg                # SHA logo
│
├── supabase-schema.sql         # Database schema for Supabase
├── tailwind.config.ts          # Tailwind configuration with brand colors
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies and scripts
```

---

## 🗄️ SUPABASE & DATABASE RULES

### ⚠️ CRITICAL: Rules for Claude AI

| Rule | Description |
|------|-------------|
| **No Dashboard Changes** | Do not manually edit tables in the Supabase UI |
| **Migrations Only** | All schema changes via SQL files |
| **No Hardcoded Keys** | Always use `process.env` |
| **No PII in Logs** | Don't log email addresses or personal info |

### Database Table: discovery_responses

```sql
CREATE TABLE discovery_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    segment TEXT NOT NULL CHECK (segment IN ('hp', 'derm', 'client')),
    responses JSONB NOT NULL,
    zip_code TEXT,
    state TEXT,
    contact_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    preferred_contact TEXT,
    availability TEXT[],
    wants_updates BOOLEAN DEFAULT FALSE,
    wants_interview BOOLEAN DEFAULT FALSE,
    source TEXT  -- 'survey', 'interview_only', or 'both'
);

-- Indexes
CREATE INDEX idx_discovery_responses_segment ON discovery_responses(segment);
CREATE INDEX idx_discovery_responses_created_at ON discovery_responses(created_at DESC);

-- RLS Policies
ALTER TABLE discovery_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON discovery_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated reads" ON discovery_responses FOR SELECT USING (auth.role() = 'authenticated');
```

---

## 👥 USER SEGMENTS

### Hair Professional (HP)
- **Route:** `/hp` (info) → `/hp/survey` (survey)
- **Accent Color:** Gold (`#C9A227`)
- **Focus:** Scalp observation experiences, interest in referral tools, training interest
- **Survey Steps:** 9 (professional type, experience, frequency, actions, reactions, tool interest, training interest, location, contact)
- **Key Validation:** Do they see conditions 2-4x/week? Would they pay $10-15/triage?

### Dermatologist (Derm)
- **Route:** `/derm` (info) → `/derm/survey` (survey)
- **Accent Color:** Teal (`#2A9D8F`)
- **Focus:** Practice types, patient volume, no-show rates, async review interest, EMR systems
- **Key Validation:** Would they accept referrals WITHOUT images? (HIPAA pivot point)

### Client/Patient
- **Route:** `/client` (info) → `/client/survey` (survey)
- **Accent Color:** Coral (`#E07A5F`)
- **Focus:** Prior experiences, trust levels, photo comfort, service interest
- **Key Validation:** Comfortable with HP photo capture? Would pay $15-35?

---

## 🎨 BRAND COLORS

```typescript
// tailwind.config.ts
colors: {
  navy: '#1B365D',    // Primary text color
  gold: '#C9A227',    // HP accent, primary buttons
  teal: '#2A9D8F',    // Derm accent
  coral: '#E07A5F',   // Client accent, errors
  cream: '#FAF8F5',   // Background color
}
```

### Font Families
- **Sans:** Inter (body text)
- **Serif:** Playfair Display (headings)

---

## 📊 DATA FLOW

```
Landing Page (/)
    ↓
User selects segment (HP, Derm, or Client)
    ↓
Info Page (/hp, /derm, /client)
    ├── Option 1: Quick interview interest form
    └── Option 2: Take full survey →
            ↓
        Survey Page (/hp/survey, /derm/survey, /client/survey)
            ↓
        Multi-step form with validation (React Hook Form + Zod)
            ↓
        Server Action (lib/actions.ts → submitSurvey)
            ↓
        Supabase insert (discovery_responses)
            ↓
        Thank You Page (/thank-you?segment=hp&interview=true)
```

---

## ⚙️ ENVIRONMENT VARIABLES

```env
# Required - Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Optional
NEXT_PUBLIC_APP_URL=https://scalphealthalliance.com
```

### Environment Separation (Vercel)

| Environment | Database |
|-------------|----------|
| Production | Production Supabase |
| Preview | Staging Supabase |

---

## 💻 COMMON COMMANDS

```bash
# Development
npm run dev           # Start dev server (localhost:3000)

# Build
npm run build         # Production build

# Lint
npm run lint          # ESLint check

# Start
npm run start         # Start production server
```

---

## 📝 CODE CONVENTIONS

### Component Patterns

1. **Server Components** (default): Use for pages without interactivity
2. **Client Components**: Mark with `'use client'` for:
   - Forms with state
   - Interactive elements (buttons, toggles)
   - React hooks usage

### Form Pattern (React Hook Form + Zod)

```typescript
'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { hpSurveySchema, type HpSurveyData } from '@/types/survey'

export default function SurveyPage() {
  const { control, handleSubmit, trigger, formState: { errors } } = useForm<HpSurveyData>({
    resolver: zodResolver(hpSurveySchema),
    defaultValues: {
      segment: 'hp',
      professionalType: '',
      // ...
    },
  })

  const onSubmit = async (data: HpSurveyData) => {
    const result = await submitSurvey(data)
    if (result.success) {
      router.push('/thank-you?segment=hp')
    }
  }
}
```

### Server Action Pattern

```typescript
// lib/actions.ts
'use server'

import { supabase } from './supabase'
import type { SurveyData, DiscoveryResponse, Segment } from '@/types/survey'

export async function submitSurvey(data: SurveyData): Promise<{ success: boolean; error?: string }> {
  const { contact, segment, zipCode, state, wantsUpdates, wantsInterview, ...responses } = data

  const record: DiscoveryResponse = {
    segment: segment as Segment,
    responses: responses,
    // ... map other fields
  }

  const { error } = await supabase.from('discovery_responses').insert([record])

  if (error) return { success: false, error: error.message }
  return { success: true }
}
```

### Styling Guidelines

- Use Tailwind utility classes exclusively
- Brand colors via config names (`text-navy`, `bg-gold`, etc.)
- Consistent border-radius: `rounded-xl` (forms), `rounded-2xl` (cards), `rounded-3xl` (large containers)
- Consistent spacing: `p-6`, `gap-4`, `space-y-4`
- Card pattern: `bg-white rounded-xl shadow-sm p-6`
- Responsive: Mobile-first, `md:` for tablet, `lg:` for desktop

---

## 🔧 COMMON TASKS

### Add a New Survey Question

1. Add field to Zod schema in `types/survey.ts`
2. Add to `defaultValues` in survey page
3. Add validation step in `handleNext` switch statement
4. Create step UI with `QuestionBlock` wrapper
5. Update `TOTAL_STEPS` constant

### Modify Segment Colors

Edit `tailwind.config.ts` and update the segment page's accent classes.

### Add New Segment

1. Create `/app/[segment]/page.tsx` (info page)
2. Create `/app/[segment]/survey/page.tsx` (survey form)
3. Add segment card to landing page
4. Create Zod validation schema in `types/survey.ts`
5. Update `Segment` type and database CHECK constraint
6. Update server action if needed

---

## 📋 PENDING CHANGES

### Landing Page Updates (from change request)

| Section | Change |
|---------|--------|
| Logo | Remove bold/italic split, remove white glare |
| HP | "awkward" → compassionate language |
| HP | "What We Build" → "Your Input Shapes the Future of Scalp Health" |
| HP | "2-4 scalp conditions" → "2-4 scalps needing health help per week" |
| Derm | "Better" → "Stronger" |
| Derm | Make revenue the section HEADER |
| Client | "shouldn't have" → "Don't Wait Months for Answers" |

---

## 🔄 DAILY COORDINATION ROUTINE

```bash
# Morning
git pull origin main                    # Get latest code + CLAUDE.md
git checkout -b feature/my-task         # Create branch

# Work session
claude                                  # Start Claude Code
# "Check CLAUDE.md for latest project rules."

# Evening
git add .
git commit -m "feat: description (updated CLAUDE.md if applicable)"
git push origin feature/my-task
# Create PR on GitHub for review
```

---

## 🎯 CURRENT SPRINT: I-CORPS VALIDATION

### Key Hypotheses to Test

| ID | Segment | Hypothesis | Target |
|----|---------|------------|--------|
| H4 | HP | Images essential for confidence | ≥70% |
| H5 | HP | Referral-only insufficient | ≥60% |
| H10 | Derm | Would accept referrals WITHOUT images | ≥40% |
| H13 | Client | Comfortable with HP photo capture | ≥60% |

### Interview Targets
- HP: 15 interviews
- Derm: 15 interviews
- Client: 15 interviews

---

## ✅ TESTING CONSIDERATIONS

- Ensure all three survey flows complete successfully
- Verify Supabase connection with valid credentials
- Test responsive layouts (mobile, tablet, desktop)
- Validate form error states and required field messaging
- Test interview-only submission vs full survey submission

---

## 🗒️ NOTES FOR AI ASSISTANTS

- This is a customer discovery tool, not the main SHA product
- Survey responses are stored as JSONB for flexibility
- The platform is pre-launch; focus is on data collection
- No authentication required for survey submission
- All surveys support optional contact info collection for follow-up interviews
- The thank-you page uses query params (`segment`, `interview`) for personalized messaging

---

## 📞 RESOURCES

| Resource | Location |
|----------|----------|
| Repository | GitHub: SHA-EXTERNAL-SITE |
| Production | scalphealthalliance.com |
| Supabase | Supabase Dashboard |
| Vercel | Vercel Dashboard |
| Main Platform Repo | Scalp-Health-Alliance |

---

*This file is the shared context for all team members and AI assistants. Keep it updated!*
