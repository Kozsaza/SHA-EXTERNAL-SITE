import { z } from 'zod'

export type Segment = 'hp' | 'derm' | 'client'

// State options for location selection
export const STATE_OPTIONS = [
  { value: 'MA', label: 'Massachusetts' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'ME', label: 'Maine' },
  { value: 'VT', label: 'Vermont' },
  { value: 'NY', label: 'New York' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'Washington, D.C.' },
  { value: 'OTHER', label: 'Outside US' },
]

// Extended contact info schema with interview fields
export const contactInfoSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  preferredContact: z.string().optional(),
  availability: z.array(z.string()).optional(),
})

// HP Survey Schema
export const hpSurveySchema = z.object({
  segment: z.literal('hp'),
  professionalType: z.string().min(1, 'Please select your professional type'),
  yearsExperience: z.string().min(1, 'Please select your experience level'),
  scalpConditionFrequency: z.string().min(1, 'Please select how often you see scalp conditions'),
  currentAction: z.array(z.string()).min(1, 'Please select at least one action'),
  clientReaction: z.string().min(1, 'Please select a typical client reaction'),
  connectionToolInterest: z.string().min(1, 'Please indicate your interest level'),
  trainingInterest: z.string().min(1, 'Please indicate your interest in training'),
  zipCode: z.string().optional(),
  state: z.string().min(1, 'Please select your state'),
  wantsUpdates: z.boolean().optional(),
  wantsInterview: z.boolean().optional(),
  contact: contactInfoSchema.optional(),
})

// Derm Survey Schema
export const dermSurveySchema = z.object({
  segment: z.literal('derm'),
  practiceType: z.string().min(1, 'Please select your practice type'),
  practiceSetting: z.string().min(1, 'Please select your practice setting'),
  patientVolume: z.string().min(1, 'Please select your patient volume'),
  noShowRate: z.string().min(1, 'Please select your no-show rate'),
  pipelineInterest: z.string().min(1, 'Please indicate your interest'),
  asyncReviewFit: z.string().min(1, 'Please indicate fit for async review'),
  emrSystem: z.string().min(1, 'Please select your EMR system'),
  zipCode: z.string().optional(),
  state: z.string().min(1, 'Please select your state'),
  wantsUpdates: z.boolean().optional(),
  wantsInterview: z.boolean().optional(),
  contact: contactInfoSchema.optional(),
})

// Client Survey Schema
export const clientSurveySchema = z.object({
  segment: z.literal('client'),
  hasExperience: z.string().min(1, 'Please indicate your experience'),
  conditionTypes: z.array(z.string()).optional(),
  previousActions: z.array(z.string()).optional(),
  dermWaitTime: z.string().optional(),
  trustHpObservation: z.string().min(1, 'Please indicate your trust level'),
  serviceInterest: z.string().min(1, 'Please indicate your interest'),
  photoSharingComfort: z.string().min(1, 'Please indicate your comfort level'),
  photoComfortFactors: z.array(z.string()).optional(),
  zipCode: z.string().optional(),
  state: z.string().min(1, 'Please select your state'),
  wantsUpdates: z.boolean().optional(),
  wantsInterview: z.boolean().optional(),
  contact: contactInfoSchema.optional(),
})

export type HpSurveyData = z.infer<typeof hpSurveySchema>
export type DermSurveyData = z.infer<typeof dermSurveySchema>
export type ClientSurveyData = z.infer<typeof clientSurveySchema>

export type SurveyData = HpSurveyData | DermSurveyData | ClientSurveyData

// Database record type
export interface DiscoveryResponse {
  id?: string
  created_at?: string
  segment: Segment
  responses: Record<string, unknown>
  zip_code?: string
  state?: string
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  preferred_contact?: string
  availability?: string[]
  wants_updates?: boolean
  wants_interview?: boolean
  source?: 'survey' | 'interview_only' | 'both'
}

// Interview interest form data (for info pages)
export interface InterviewInterestData {
  contact_name: string
  contact_email: string
  contact_phone?: string
  zip_code: string
  availability?: string[]
  wants_interview: boolean
}
