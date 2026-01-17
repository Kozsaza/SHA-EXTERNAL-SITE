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
import { clientSurveySchema, type ClientSurveyData } from '@/types/survey'
import { submitSurvey } from '@/lib/actions'

const TOTAL_STEPS = 9

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

const willingnessOptions = [
  { value: 'yes_definitely', label: 'Yes, definitely worth it' },
  { value: 'yes_reasonable', label: 'Yes, if the price is reasonable' },
  { value: 'maybe', label: 'Maybe, depends on the situation' },
  { value: 'no', label: 'No, I expect insurance to cover it' },
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
    getValues,
    setValue,
  } = useForm<ClientSurveyData>({
    resolver: zodResolver(clientSurveySchema),
    defaultValues: {
      segment: 'client',
      hasExperience: '',
      conditionTypes: [],
      previousActions: [],
      dermWaitTime: '',
      trustHpReferral: '',
      willingnessToPay: '',
      photoSharingComfort: '',
      photoComfortFactors: [],
      contact: {
        name: '',
        email: '',
        phone: '',
        wantsUpdates: false,
      },
    },
  })

  const handleNext = async () => {
    const fieldsToValidate: (keyof ClientSurveyData)[] = []

    switch (step) {
      case 1:
        fieldsToValidate.push('hasExperience')
        break
      case 5:
        fieldsToValidate.push('trustHpReferral')
        break
      case 6:
        fieldsToValidate.push('willingnessToPay')
        break
      case 7:
        fieldsToValidate.push('photoSharingComfort')
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
        router.push('/thank-you?segment=client')
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
              name="trustHpReferral"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={trustOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.trustHpReferral?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 6 && (
          <QuestionBlock
            question="Would you pay a small fee for faster access to a dermatologist for a scalp concern?"
            description="For example, to skip a months-long wait"
            required
          >
            <Controller
              name="willingnessToPay"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={willingnessOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.willingnessToPay?.message}
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
            question="Would you like to stay updated on SHA?"
            description="Optional - leave your contact info to hear about launch and early access"
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
                      className="h-4 w-4 text-coral border-gray-300 rounded focus:ring-coral"
                    />
                  )}
                />
                <span className="text-sm text-gray-600">
                  Yes, send me updates about SHA launch
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
