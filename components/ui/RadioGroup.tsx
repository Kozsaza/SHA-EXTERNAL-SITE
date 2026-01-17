'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  options: RadioOption[]
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ className = '', label, error, options, name, value, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onValueChange) {
        onValueChange(e.target.value)
      }
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <p className="block text-sm font-semibold text-navy mb-3">
            {label}
          </p>
        )}
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:border-gold/50
                ${value === option.value
                  ? 'border-gold bg-gold/5'
                  : 'border-gray-200 bg-white'
                }`}
            >
              <input
                ref={ref}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 text-gold border-gray-300 focus:ring-gold"
                {...props}
              />
              <div className="flex-1">
                <span className="block font-medium text-navy">{option.label}</span>
                {option.description && (
                  <span className="block text-sm text-gray-500 mt-0.5">{option.description}</span>
                )}
              </div>
            </label>
          ))}
        </div>
        {error && (
          <p className="mt-2 text-sm text-coral">{error}</p>
        )}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

export { RadioGroup }
