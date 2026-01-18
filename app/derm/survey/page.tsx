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
import { dermSurveySchema, type DermSurveyData, STATE_OPTIONS } from '@/types/survey'
import { submitSurvey } from '@/lib/actions'

const TOTAL_STEPS = 9

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
    watch,
  } = useForm<DermSurveyData>({
    resolver: zodResolver(dermSurveySchema),
    defaultValues: {
      segment: 'derm',
      practiceType: '',
      practiceSetting: '',
      patientVolume: '',
      noShowRate: '',
      pipelineInterest: '',
      asyncReviewFit: '',
      emrSystem: '',
      zipCode: '',
      state: '',
      wantsUpdates: false,
      wantsInterview: false,
      contact: {
        name: '',
        email: '',
        phone: '',
        preferredContact: '',
        availability: [],
      },
    },
  })

  const watchUpdates = watch('wantsUpdates')
  const watchInterview = watch('wantsInterview')

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
        fieldsToValidate.push('noShowRate')
        break
      case 5:
        fieldsToValidate.push('pipelineInterest')
        break
      case 6:
        fieldsToValidate.push('asyncReviewFit')
        break
      case 7:
        fieldsToValidate.push('emrSystem')
        break
      case 8:
        fieldsToValidate.push('state')
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
        const params = new URLSearchParams({ segment: 'derm' })
        if (data.wantsInterview) params.append('interview', 'true')
        router.push(`/thank-you?${params.toString()}`)
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

        {step === 5 && (
          <QuestionBlock
            question="How interested are you in receiving patients from trained observers?"
            description="Patients observed by hair professionals with documented scalp concerns"
            required
          >
            <Controller
              name="pipelineInterest"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={interestOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.pipelineInterest?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 6 && (
          <QuestionBlock
            question="Would reviewing patient images asynchronously fit into your workflow?"
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

        {step === 7 && (
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

        {step === 8 && (
          <QuestionBlock
            question="Your Practice Location"
            description="This helps us understand where demand exists. Your survey responses remain anonymous."
          >
            <div className="space-y-4">
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Practice ZIP Code"
                    placeholder="e.g., 02101"
                    maxLength={10}
                  />
                )}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-coral">*</span>
                </label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all"
                    >
                      <option value="">Select your state</option>
                      {STATE_OPTIONS.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-coral">{errors.state.message}</p>
                )}
              </div>
            </div>
          </QuestionBlock>
        )}

        {step === 9 && (
          <QuestionBlock
            question="Stay Connected (Optional)"
            description="Your survey responses above are anonymous. Only fill this out if you'd like us to contact you."
          >
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Controller
                    name="wantsUpdates"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="mt-1 h-4 w-4 text-teal border-gray-300 rounded focus:ring-teal"
                      />
                    )}
                  />
                  <span className="text-sm text-gray-700">
                    Keep me updated on SHA launch and clinical anchor opportunities
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <Controller
                    name="wantsInterview"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="mt-1 h-4 w-4 text-teal border-gray-300 rounded focus:ring-teal"
                      />
                    )}
                  />
                  <div>
                    <span className="text-sm text-gray-700">
                      I&apos;m interested in a 15-minute interview to share more
                    </span>
                    <p className="text-xs text-teal mt-1">✓ Be first in line to use SHA when we launch</p>
                  </div>
                </label>
              </div>

              {(watchUpdates || watchInterview) && (
                <div className="space-y-4 p-4 bg-teal/5 rounded-lg mt-4">
                  <p className="text-sm text-gray-600">Please provide your contact information:</p>

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
                        required
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

                  {watchInterview && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred contact method</label>
                        <Controller
                          name="contact.preferredContact"
                          control={control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all"
                            >
                              <option value="">Select preference</option>
                              <option value="email">Email</option>
                              <option value="phone">Phone call</option>
                              <option value="text">Text message</option>
                            </select>
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Best times to reach you</label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekends"].map((time) => (
                            <Controller
                              key={time}
                              name="contact.availability"
                              control={control}
                              render={({ field }) => (
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={field.value?.includes(time) || false}
                                    onChange={(e) => {
                                      const current = field.value || []
                                      if (e.target.checked) {
                                        field.onChange([...current, time])
                                      } else {
                                        field.onChange(current.filter((t: string) => t !== time))
                                      }
                                    }}
                                    className="h-4 w-4 text-teal rounded border-gray-300 focus:ring-teal"
                                  />
                                  {time}
                                </label>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
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
