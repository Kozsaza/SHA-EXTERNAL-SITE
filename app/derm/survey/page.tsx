'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SurveyWrapper } from '@/components/survey/SurveyWrapper'
import { QuestionBlock } from '@/components/survey/QuestionBlock'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { dermSurveySchema, type DermSurveyData } from '@/types/survey'
import { submitSurvey } from '@/lib/actions'

const TOTAL_STEPS = 10

const practiceTypeOptions = [
  { value: 'general_derm', label: 'General Dermatology' },
  { value: 'medical_derm', label: 'Medical Dermatology' },
  { value: 'cosmetic', label: 'Cosmetic / Aesthetic' },
  { value: 'surgical', label: 'Surgical Dermatology' },
  { value: 'mixed', label: 'Mixed Practice' },
]

const practiceSettingOptions = [
  { value: 'solo', label: 'Solo Practice' },
  { value: 'group', label: 'Group Practice' },
  { value: 'hospital', label: 'Hospital / Health System' },
  { value: 'academic', label: 'Academic Medical Center' },
  { value: 'telehealth', label: 'Telehealth-focused' },
]

const patientVolumeOptions = [
  { value: 'under_50', label: 'Under 50 patients' },
  { value: '50_100', label: '50-100 patients' },
  { value: '100_150', label: '100-150 patients' },
  { value: 'over_150', label: 'Over 150 patients' },
]

const acquisitionCostOptions = [
  { value: 'under_50', label: 'Under $50' },
  { value: '50_100', label: '$50-$100' },
  { value: '100_200', label: '$100-$200' },
  { value: 'over_200', label: 'Over $200' },
  { value: 'unknown', label: "Don't know" },
]

const noShowRateOptions = [
  { value: 'under_5', label: 'Under 5%' },
  { value: '5_10', label: '5-10%' },
  { value: '10_20', label: '10-20%' },
  { value: 'over_20', label: 'Over 20%' },
]

const interestOptions = [
  { value: 'very_interested', label: 'Very interested' },
  { value: 'somewhat_interested', label: 'Somewhat interested' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'not_interested', label: 'Not interested' },
]

const asyncFitOptions = [
  { value: 'great_fit', label: 'Great fit - would love this' },
  { value: 'good_fit', label: 'Good fit for some cases' },
  { value: 'maybe', label: 'Maybe - need to learn more' },
  { value: 'not_fit', label: 'Not a fit for my practice' },
]

const maxFeeOptions = [
  { value: 'under_100', label: 'Under $100/month' },
  { value: '100_250', label: '$100-$250/month' },
  { value: '250_500', label: '$250-$500/month' },
  { value: 'over_500', label: 'Over $500/month' },
  { value: 'performance', label: 'Prefer performance-based' },
]

const emrOptions = [
  { value: 'modmed', label: 'ModMed / EMA' },
  { value: 'epic', label: 'Epic' },
  { value: 'athena', label: 'athenahealth' },
  { value: 'advancedmd', label: 'AdvancedMD' },
  { value: 'drchrono', label: 'DrChrono' },
  { value: 'other', label: 'Other' },
  { value: 'none', label: 'No EMR' },
]

export default function DermSurveyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<DermSurveyData>({
    resolver: zodResolver(dermSurveySchema),
    defaultValues: {
      segment: 'derm',
      practiceType: '',
      practiceSetting: '',
      patientVolume: '',
      acquisitionCost: '',
      noShowRate: '',
      referralInterest: '',
      asyncReviewFit: '',
      maxMonthlyFee: '',
      emrSystem: '',
      contact: {
        name: '',
        email: '',
        phone: '',
        wantsUpdates: false,
      },
    },
  })

  const handleNext = async () => {
    const fieldsToValidate: (keyof DermSurveyData)[] = []

    switch (step) {
      case 1:
        fieldsToValidate.push('practiceType')
        break
      case 2:
        fieldsToValidate.push('practiceSetting')
        break
      case 3:
        fieldsToValidate.push('patientVolume')
        break
      case 4:
        fieldsToValidate.push('acquisitionCost')
        break
      case 5:
        fieldsToValidate.push('noShowRate')
        break
      case 6:
        fieldsToValidate.push('referralInterest')
        break
      case 7:
        fieldsToValidate.push('asyncReviewFit')
        break
      case 8:
        fieldsToValidate.push('maxMonthlyFee')
        break
      case 9:
        fieldsToValidate.push('emrSystem')
        break
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: DermSurveyData) => {
    setIsSubmitting(true)
    try {
      const result = await submitSurvey(data)
      if (result.success) {
        router.push('/thank-you?segment=derm')
      } else {
        console.error('Submission failed:', result.error)
        alert('There was an error submitting your response. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your response. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SurveyWrapper
      title="Dermatologist Discovery Survey"
      subtitle="Clinical Anchors"
      currentStep={step}
      totalSteps={TOTAL_STEPS}
      accentColor="teal"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <QuestionBlock
            question="What type of dermatology practice do you have?"
            required
          >
            <Controller
              name="practiceType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={practiceTypeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.practiceType?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 2 && (
          <QuestionBlock
            question="What is your practice setting?"
            required
          >
            <Controller
              name="practiceSetting"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={practiceSettingOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.practiceSetting?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 3 && (
          <QuestionBlock
            question="How many patients do you see per week?"
            required
          >
            <Controller
              name="patientVolume"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={patientVolumeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.patientVolume?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 4 && (
          <QuestionBlock
            question="What is your estimated patient acquisition cost?"
            description="Approximate cost to acquire a new patient through marketing/referrals"
            required
          >
            <Controller
              name="acquisitionCost"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={acquisitionCostOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.acquisitionCost?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 5 && (
          <QuestionBlock
            question="What is your current no-show rate for new patients?"
            required
          >
            <Controller
              name="noShowRate"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={noShowRateOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.noShowRate?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 6 && (
          <QuestionBlock
            question="How interested are you in receiving pre-screened scalp condition referrals?"
            description="Patients observed by trained hair professionals with documented concerns"
            required
          >
            <Controller
              name="referralInterest"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={interestOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.referralInterest?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 7 && (
          <QuestionBlock
            question="How well would async/store-and-forward review fit your workflow?"
            description="Reviewing documented images and observations before scheduling"
            required
          >
            <Controller
              name="asyncReviewFit"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={asyncFitOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.asyncReviewFit?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 8 && (
          <QuestionBlock
            question="What would you pay monthly for a quality referral pipeline?"
            description="For a steady stream of pre-vetted, high-intent patients"
            required
          >
            <Controller
              name="maxMonthlyFee"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={maxFeeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.maxMonthlyFee?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 9 && (
          <QuestionBlock
            question="What EMR/EHR system does your practice use?"
            required
          >
            <Controller
              name="emrSystem"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={emrOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.emrSystem?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 10 && (
          <QuestionBlock
            question="Would you like to stay updated on SHA?"
            description="Optional - leave your contact info to hear about launch and clinical anchor opportunities"
          >
            <div className="space-y-4">
              <Controller
                name="contact.name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Name"
                    placeholder="Your name"
                  />
                )}
              />
              <Controller
                name="contact.email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    label="Email"
                    placeholder="your@email.com"
                    error={errors.contact?.email?.message}
                  />
                )}
              />
              <Controller
                name="contact.phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="tel"
                    label="Phone (optional)"
                    placeholder="(555) 123-4567"
                  />
                )}
              />
              <label className="flex items-center gap-3 cursor-pointer">
                <Controller
                  name="contact.wantsUpdates"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 text-teal border-gray-300 rounded focus:ring-teal"
                    />
                  )}
                />
                <span className="text-sm text-gray-600">
                  Yes, send me updates about SHA launch and clinical anchor opportunities
                </span>
              </label>
            </div>
          </QuestionBlock>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <Button type="button" variant="secondary" onClick={handleNext} className="bg-teal hover:bg-teal/90">
              Continue
            </Button>
          ) : (
            <Button type="submit" variant="secondary" disabled={isSubmitting} className="bg-teal hover:bg-teal/90">
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </Button>
          )}
        </div>
      </form>
    </SurveyWrapper>
  )
}
