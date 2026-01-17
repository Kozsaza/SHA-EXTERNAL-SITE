'use server'

import { supabase } from './supabase'
import type { SurveyData, DiscoveryResponse, Segment } from '@/types/survey'

export async function submitSurvey(data: SurveyData): Promise<{ success: boolean; error?: string }> {
  try {
    const { contact, segment, ...responses } = data

    const record: DiscoveryResponse = {
      segment: segment as Segment,
      responses: responses,
      contact_name: contact?.name || undefined,
      contact_email: contact?.email || undefined,
      contact_phone: contact?.phone || undefined,
      wants_updates: contact?.wantsUpdates || false,
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
