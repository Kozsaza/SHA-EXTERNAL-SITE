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
import { clientSurveySchema, type ClientSurveyData, STATE_OPTIONS } from '@/types/survey'
import { submitSurvey } from '@/lib/actions'

const TOTAL_STEPS = 10

const experienceOptions = [
  { value: 'yes_current', label: 'Yes, currently dealing with one' },
  { value: 'yes_past', label: 'Yes, in the past' },
  { value: 'no', label: 'No, never' },
  { value: 'unsure', label: 'Not sure' },
]

const conditionTypeOptions = [
  { value: 'dandruff', label: 'Dandruff / Flaking' },
  { value: 'hair_loss', label: 'Hair loss / Thinning' },
  { value: 'itching', label: 'Itching / Irritation' },
  { value: 'redness', label: 'Redness / Inflammation' },
  { value: 'bumps', label: 'Bumps / Lesions' },
  { value: 'dryness', label: 'Dryness' },
  { value: 'other', label: 'Other' },
]

const previousActionOptions = [
  { value: 'doctor', label: 'Saw a dermatologist' },
  { value: 'primary', label: 'Saw a primary care doctor' },
  { value: 'products', label: 'Tried over-the-counter products' },
  { value: 'hp_advice', label: 'Asked my hair professional for advice' },
  { value: 'internet', label: 'Researched online' },
  { value: 'nothing', label: 'Did nothing / Waited it out' },
]

const waitTimeOptions = [
  { value: 'under_2_weeks', label: 'Under 2 weeks' },
  { value: '2_4_weeks', label: '2-4 weeks' },
  { value: '1_2_months', label: '1-2 months' },
  { value: '2_3_months', label: '2-3 months' },
  { value: 'over_3_months', label: 'Over 3 months' },
  { value: 'never_tried', label: 'Never tried to see one' },
]

const trustOptions = [
  { value: 'very_trust', label: 'Very much - they see my scalp regularly' },
  { value: 'somewhat_trust', label: 'Somewhat - depends on the concern' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'not_trust', label: 'Not really - prefer to go straight to a doctor' },
]

const serviceInterestOptions = [
  { value: 'definitely_yes', label: 'Definitely yes' },
  { value: 'probably_yes', label: 'Probably yes' },
  { value: 'not_sure', label: 'Not sure' },
  { value: 'probably_not', label: 'Probably not' },
  { value: 'definitely_not', label: 'Definitely not' },
]

const photoComfortOptions = [
  { value: 'very_comfortable', label: 'Very comfortable' },
  { value: 'somewhat_comfortable', label: 'Somewhat comfortable' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'uncomfortable', label: 'Uncomfortable' },
  { value: 'very_uncomfortable', label: 'Very uncomfortable' },
]

const comfortFactorOptions = [
  { value: 'hp_takes', label: 'If my hair professional takes the photo' },
  { value: 'not_stored', label: 'Knowing the photo is not stored long-term' },
  { value: 'doctor_only', label: 'Knowing only a doctor sees it' },
  { value: 'encrypted', label: 'If the photo is encrypted' },
  { value: 'urgent', label: 'If I knew it would speed up my care' },
  { value: 'nothing', label: 'Nothing would make me comfortable' },
]

export default function ClientSurveyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedActions, setSelectedActions] = useState<string[]>([])
  const [selectedFactors, setSelectedFactors] = useState<string[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<ClientSurveyData>({
    resolver: zodResolver(clientSurveySchema),
    defaultValues: {
      segment: 'client',
      hasExperience: '',
      conditionTypes: [],
      previousActions: [],
      dermWaitTime: '',
      trustHpObservation: '',
      serviceInterest: '',
      photoSharingComfort: '',
      photoComfortFactors: [],
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
    const fieldsToValidate: (keyof ClientSurveyData)[] = []

    switch (step) {
      case 1:
        fieldsToValidate.push('hasExperience')
        break
      case 5:
        fieldsToValidate.push('trustHpObservation')
        break
      case 6:
        fieldsToValidate.push('serviceInterest')
        break
      case 7:
        fieldsToValidate.push('photoSharingComfort')
        break
      case 9:
        fieldsToValidate.push('state')
        break
    }

    const isValid = fieldsToValidate.length > 0 ? await trigger(fieldsToValidate) : true
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const toggleCondition = (value: string) => {
    const newConditions = selectedConditions.includes(value)
      ? selectedConditions.filter((c) => c !== value)
      : [...selectedConditions, value]
    setSelectedConditions(newConditions)
    setValue('conditionTypes', newConditions)
  }

  const toggleAction = (value: string) => {
    const newActions = selectedActions.includes(value)
      ? selectedActions.filter((a) => a !== value)
      : [...selectedActions, value]
    setSelectedActions(newActions)
    setValue('previousActions', newActions)
  }

  const toggleFactor = (value: string) => {
    const newFactors = selectedFactors.includes(value)
      ? selectedFactors.filter((f) => f !== value)
      : [...selectedFactors, value]
    setSelectedFactors(newFactors)
    setValue('photoComfortFactors', newFactors)
  }

  const onSubmit = async (data: ClientSurveyData) => {
    setIsSubmitting(true)
    try {
      const result = await submitSurvey(data)
      if (result.success) {
        const params = new URLSearchParams({ segment: 'client' })
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
      title="Client Discovery Survey"
      subtitle="Care Seekers"
      currentStep={step}
      totalSteps={TOTAL_STEPS}
      accentColor="coral"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <QuestionBlock
            question="Have you ever experienced a scalp condition that concerned you?"
            required
          >
            <Controller
              name="hasExperience"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={experienceOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.hasExperience?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 2 && (
          <QuestionBlock
            question="What type of scalp condition(s) have you experienced?"
            description="Select all that apply"
          >
            <div className="space-y-2">
              {conditionTypeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:border-coral/50
                    ${selectedConditions.includes(option.value)
                      ? 'border-coral bg-coral/5'
                      : 'border-gray-200 bg-white'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(option.value)}
                    onChange={() => toggleCondition(option.value)}
                    className="h-4 w-4 text-coral border-gray-300 rounded focus:ring-coral"
                  />
                  <span className="font-medium text-navy">{option.label}</span>
                </label>
              ))}
            </div>
          </QuestionBlock>
        )}

        {step === 3 && (
          <QuestionBlock
            question="What actions did you take when you had a scalp concern?"
            description="Select all that apply"
          >
            <div className="space-y-2">
              {previousActionOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:border-coral/50
                    ${selectedActions.includes(option.value)
                      ? 'border-coral bg-coral/5'
                      : 'border-gray-200 bg-white'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedActions.includes(option.value)}
                    onChange={() => toggleAction(option.value)}
                    className="h-4 w-4 text-coral border-gray-300 rounded focus:ring-coral"
                  />
                  <span className="font-medium text-navy">{option.label}</span>
                </label>
              ))}
            </div>
          </QuestionBlock>
        )}

        {step === 4 && (
          <QuestionBlock
            question="How long did you wait to see a dermatologist (or how long was the wait time quoted)?"
          >
            <Controller
              name="dermWaitTime"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={waitTimeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 5 && (
          <QuestionBlock
            question="Would you trust your hair professional to recommend when you should see a dermatologist?"
            required
          >
            <Controller
              name="trustHpObservation"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={trustOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.trustHpObservation?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 6 && (
          <QuestionBlock
            question="Would you use a service that connects you to a dermatologist faster through your hair professional?"
            required
          >
            <Controller
              name="serviceInterest"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={serviceInterestOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.serviceInterest?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 7 && (
          <QuestionBlock
            question="How comfortable would you be with your hair professional taking a photo of your scalp to share with a dermatologist?"
            required
          >
            <Controller
              name="photoSharingComfort"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={photoComfortOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.photoSharingComfort?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 8 && (
          <QuestionBlock
            question="What would make you more comfortable with photo sharing?"
            description="Select all that apply"
          >
            <div className="space-y-2">
              {comfortFactorOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:border-coral/50
                    ${selectedFactors.includes(option.value)
                      ? 'border-coral bg-coral/5'
                      : 'border-gray-200 bg-white'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedFactors.includes(option.value)}
                    onChange={() => toggleFactor(option.value)}
                    className="h-4 w-4 text-coral border-gray-300 rounded focus:ring-coral"
                  />
                  <span className="font-medium text-navy">{option.label}</span>
                </label>
              ))}
            </div>
          </QuestionBlock>
        )}

        {step === 9 && (
          <QuestionBlock
            question="Your Location"
            description="This helps us understand where demand exists. Your survey responses remain anonymous."
          >
            <div className="space-y-4">
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="ZIP Code"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all"
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

        {step === 10 && (
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
                        className="mt-1 h-4 w-4 text-coral border-gray-300 rounded focus:ring-coral"
                      />
                    )}
                  />
                  <span className="text-sm text-gray-700">
                    Keep me updated on SHA launch news
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
                        className="mt-1 h-4 w-4 text-coral border-gray-300 rounded focus:ring-coral"
                      />
                    )}
                  />
                  <div>
                    <span className="text-sm text-gray-700">
                      I&apos;m interested in a 15-minute interview to share more
                    </span>
                    <p className="text-xs text-coral mt-1">✓ Be first in line to use SHA when we launch</p>
                  </div>
                </label>
              </div>

              {(watchUpdates || watchInterview) && (
                <div className="space-y-4 p-4 bg-coral/5 rounded-lg mt-4">
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
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all"
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
                                    className="h-4 w-4 text-coral rounded border-gray-300 focus:ring-coral"
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
            <Button type="button" variant="secondary" onClick={handleNext} className="bg-coral hover:bg-coral/90">
              Continue
            </Button>
          ) : (
            <Button type="submit" variant="secondary" disabled={isSubmitting} className="bg-coral hover:bg-coral/90">
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </Button>
          )}
        </div>
      </form>
    </SurveyWrapper>
  )
}
