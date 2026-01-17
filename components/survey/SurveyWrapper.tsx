'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProgressBar } from './ProgressBar'

interface SurveyWrapperProps {
  children: ReactNode
  title: string
  subtitle: string
  currentStep: number
  totalSteps: number
  accentColor: 'gold' | 'teal' | 'coral'
}

export function SurveyWrapper({
  children,
  title,
  subtitle,
  currentStep,
  totalSteps,
  accentColor,
}: SurveyWrapperProps) {
  const accentClasses = {
    gold: 'text-gold',
    teal: 'text-teal',
    coral: 'text-coral',
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className={`text-xs font-bold uppercase tracking-widest ${accentClasses[accentColor]} mb-2`}>
              {subtitle}
            </p>
            <h1 className="text-3xl font-bold text-navy mb-4">{title}</h1>
            <ProgressBar current={currentStep} total={totalSteps} accentColor={accentColor} />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
