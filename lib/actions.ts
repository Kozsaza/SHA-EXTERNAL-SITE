'use server'

import { supabase } from './supabase'
import type { SurveyData, DiscoveryResponse, Segment, InterviewInterestData } from '@/types/survey'

export async function submitSurvey(data: SurveyData): Promise<{ success: boolean; error?: string }> {
  try {
    const { contact, segment, zipCode, state, wantsUpdates, wantsInterview, ...responses } = data

    // Determine source based on what's being submitted
    const source = wantsInterview ? 'both' : 'survey'

    const record: DiscoveryResponse = {
      segment: segment as Segment,
      responses: responses,
      zip_code: zipCode || undefined,
      state: state || undefined,
      contact_name: contact?.name || undefined,
      contact_email: contact?.email || undefined,
      contact_phone: contact?.phone || undefined,
      preferred_contact: contact?.preferredContact || undefined,
      availability: contact?.availability || undefined,
      wants_updates: wantsUpdates || false,
      wants_interview: wantsInterview || false,
      source: source,
    }

    const { error } = await supabase
      .from('discovery_responses')
      .insert([record])

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Submission error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function submitInterviewInterest(
  segment: string,
  data: InterviewInterestData
): Promise<{ success: boolean; error?: string }> {
  try {
    const record: DiscoveryResponse = {
      segment: segment as Segment,
      responses: {}, // Empty responses for interview-only
      zip_code: data.zip_code || undefined,
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone || undefined,
      availability: data.availability || undefined,
      wants_interview: true,
      wants_updates: true, // Default to true for interview interest
      source: 'interview_only',
    }

    const { error } = await supabase
      .from('discovery_responses')
      .insert([record])

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Submission error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
