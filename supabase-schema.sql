-- Supabase Schema for SHA Discovery Responses
-- Run this in your Supabase SQL Editor before testing the application

CREATE TABLE IF NOT EXISTS discovery_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  segment TEXT NOT NULL CHECK (segment IN ('hp', 'derm', 'client')),
  responses JSONB NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  wants_updates BOOLEAN DEFAULT FALSE
);

-- Create an index on segment for faster queries
CREATE INDEX IF NOT EXISTS idx_discovery_responses_segment ON discovery_responses(segment);

-- Create an index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_discovery_responses_created_at ON discovery_responses(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE discovery_responses ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts from anyone (for anonymous submissions)
CREATE POLICY "Allow anonymous inserts" ON discovery_responses
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows reads only for authenticated users (admin access)
CREATE POLICY "Allow authenticated reads" ON discovery_responses
  FOR SELECT
  USING (auth.role() = 'authenticated');
