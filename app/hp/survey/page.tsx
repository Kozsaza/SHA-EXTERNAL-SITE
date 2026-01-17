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
import { hpSurveySchema, type HpSurveyData } from '@/types/survey'
import { submitSurvey } from '@/lib/actions'

const TOTAL_STEPS = 8

const professionalTypeOptions = [
  { value: 'hairstylist', label: 'Hairstylist / Cosmetologist' },
  { value: 'barber', label: 'Barber' },
  { value: 'braider', label: 'Braider / Loctician' },
  { value: 'salon_owner', label: 'Salon / Shop Owner' },
  { value: 'other', label: 'Other Hair Professional' },
]

const experienceOptions = [
  { value: 'less_than_2', label: 'Less than 2 years' },
  { value: '2_to_5', label: '2-5 years' },
  { value: '5_to_10', label: '5-10 years' },
  { value: 'more_than_10', label: 'More than 10 years' },
]

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'rarely', label: 'Rarely' },
]

const currentActionOptions = [
  { value: 'mention_client', label: 'Mention it to the client' },
  { value: 'recommend_doctor', label: 'Recommend they see a doctor' },
  { value: 'recommend_products', label: 'Recommend hair/scalp products' },
  { value: 'nothing', label: 'Nothing - not my place' },
  { value: 'take_photo', label: 'Take a photo to show them' },
  { value: 'other', label: 'Other' },
]

const clientReactionOptions = [
  { value: 'grateful', label: 'Grateful for the heads up' },
  { value: 'dismissive', label: 'Dismissive - they already know' },
  { value: 'concerned', label: 'Concerned but unsure what to do' },
  { value: 'uncomfortable', label: 'Uncomfortable discussing it' },
]

const interestOptions = [
  { value: 'very_interested', label: 'Very interested' },
  { value: 'somewhat_interested', label: 'Somewhat interested' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'not_interested', label: 'Not interested' },
]

export default function HPSurveyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedActions, setSelectedActions] = useState<string[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue,
  } = useForm<HpSurveyData>({
    resolver: zodResolver(hpSurveySchema),
    defaultValues: {
      segment: 'hp',
      professionalType: '',
      yearsExperience: '',
      scalpConditionFrequency: '',
      currentAction: [],
      clientReaction: '',
      referralToolInterest: '',
      trainingInterest: '',
      contact: {
        name: '',
        email: '',
        phone: '',
        wantsUpdates: false,
      },
    },
  })

  const handleNext = async () => {
    const fieldsToValidate: (keyof HpSurveyData)[] = []

    switch (step) {
      case 1:
        fieldsToValidate.push('professionalType')
        break
      case 2:
        fieldsToValidate.push('yearsExperience')
        break
      case 3:
        fieldsToValidate.push('scalpConditionFrequency')
        break
      case 4:
        fieldsToValidate.push('currentAction')
        break
      case 5:
        fieldsToValidate.push('clientReaction')
        break
      case 6:
        fieldsToValidate.push('referralToolInterest')
        break
      case 7:
        fieldsToValidate.push('trainingInterest')
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

  const toggleAction = (value: string) => {
    const newActions = selectedActions.includes(value)
      ? selectedActions.filter((a) => a !== value)
      : [...selectedActions, value]
    setSelectedActions(newActions)
    setValue('currentAction', newActions)
  }

  const onSubmit = async (data: HpSurveyData) => {
    setIsSubmitting(true)
    try {
      const result = await submitSurvey(data)
      if (result.success) {
        router.push('/thank-you?segment=hp')
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
      title="Hair Professional Discovery Survey"
      subtitle="Community Observers"
      currentStep={step}
      totalSteps={TOTAL_STEPS}
      accentColor="gold"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <QuestionBlock
            question="What type of hair professional are you?"
            required
          >
            <Controller
              name="professionalType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={professionalTypeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.professionalType?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 2 && (
          <QuestionBlock
            question="How many years have you been in the industry?"
            required
          >
            <Controller
              name="yearsExperience"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={experienceOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.yearsExperience?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 3 && (
          <QuestionBlock
            question="How often do you notice scalp conditions (flaking, redness, hair loss, lesions) on clients?"
            required
          >
            <Controller
              name="scalpConditionFrequency"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={frequencyOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.scalpConditionFrequency?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 4 && (
          <QuestionBlock
            question="When you notice a concerning scalp condition, what do you typically do?"
            description="Select all that apply"
            required
          >
            <div className="space-y-2">
              {currentActionOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:border-gold/50
                    ${selectedActions.includes(option.value)
                      ? 'border-gold bg-gold/5'
                      : 'border-gray-200 bg-white'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedActions.includes(option.value)}
                    onChange={() => toggleAction(option.value)}
                    className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"
                  />
                  <span className="font-medium text-navy">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.currentAction && (
              <p className="mt-2 text-sm text-coral">{errors.currentAction.message}</p>
            )}
          </QuestionBlock>
        )}

        {step === 5 && (
          <QuestionBlock
            question="How do clients typically react when you mention a scalp concern?"
            required
          >
            <Controller
              name="clientReaction"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={clientReactionOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.clientReaction?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 6 && (
          <QuestionBlock
            question="How interested would you be in a secure tool that helps you refer clients to dermatologists?"
            description="A tool that protects your liability and helps clients get care faster"
            required
          >
            <Controller
              name="referralToolInterest"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={interestOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.referralToolInterest?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 7 && (
          <QuestionBlock
            question="Would you be interested in training to become a certified scalp health observer?"
            description="A 90-minute course designed by dermatologists to help you spot conditions"
            required
          >
            <Controller
              name="trainingInterest"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={interestOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.trainingInterest?.message}
                />
              )}
            />
          </QuestionBlock>
        )}

        {step === 8 && (
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
                      className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"
                    />
                  )}
                />
                <span className="text-sm text-gray-600">
                  Yes, send me updates about SHA launch and early access
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
            <Button type="button" variant="primary" onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </Button>
          )}
        </div>
      </form>
    </SurveyWrapper>
  )
}
