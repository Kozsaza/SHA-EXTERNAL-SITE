import { z } from 'zod'

export type Segment = 'hp' | 'derm' | 'client'

// Base contact info schema (optional fields)
export const contactInfoSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  wantsUpdates: z.boolean().optional(),
})

// HP Survey Schema
export const hpSurveySchema = z.object({
  segment: z.literal('hp'),
  professionalType: z.string().min(1, 'Please select your professional type'),
  yearsExperience: z.string().min(1, 'Please select your experience level'),
  scalpConditionFrequency: z.string().min(1, 'Please select how often you see scalp conditions'),
  currentAction: z.array(z.string()).min(1, 'Please select at least one action'),
  clientReaction: z.string().min(1, 'Please select a typical client reaction'),
  referralToolInterest: z.string().min(1, 'Please indicate your interest level'),
  trainingInterest: z.string().min(1, 'Please indicate your interest in training'),
  contact: contactInfoSchema.optional(),
})

// Derm Survey Schema
export const dermSurveySchema = z.object({
  segment: z.literal('derm'),
  practiceType: z.string().min(1, 'Please select your practice type'),
  practiceSetting: z.string().min(1, 'Please select your practice setting'),
  patientVolume: z.string().min(1, 'Please select your patient volume'),
  acquisitionCost: z.string().min(1, 'Please select patient acquisition cost'),
  noShowRate: z.string().min(1, 'Please select your no-show rate'),
  referralInterest: z.string().min(1, 'Please indicate your interest'),
  asyncReviewFit: z.string().min(1, 'Please indicate fit for async review'),
  maxMonthlyFee: z.string().min(1, 'Please select maximum monthly fee'),
  emrSystem: z.string().min(1, 'Please select your EMR system'),
  contact: contactInfoSchema.optional(),
})

// Client Survey Schema
export const clientSurveySchema = z.object({
  segment: z.literal('client'),
  hasExperience: z.string().min(1, 'Please indicate your experience'),
  conditionTypes: z.array(z.string()).optional(),
  previousActions: z.array(z.string()).optional(),
  dermWaitTime: z.string().optional(),
  trustHpReferral: z.string().min(1, 'Please indicate your trust level'),
  willingnessToPay: z.string().min(1, 'Please indicate your willingness'),
  photoSharingComfort: z.string().min(1, 'Please indicate your comfort level'),
  photoComfortFactors: z.array(z.string()).optional(),
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
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  wants_updates?: boolean
}
