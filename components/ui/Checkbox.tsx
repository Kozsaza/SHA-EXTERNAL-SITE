'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  description?: string
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, description, error, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={`w-full ${className}`}>
        <label
          htmlFor={checkboxId}
          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:border-gold/50
            ${props.checked
              ? 'border-gold bg-gold/5'
              : 'border-gray-200 bg-white'
            }`}
        >
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="mt-0.5 h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"
            {...props}
          />
          <div className="flex-1">
            <span className="block font-medium text-navy">{label}</span>
            {description && (
              <span className="block text-sm text-gray-500 mt-0.5">{description}</span>
            )}
          </div>
        </label>
        {error && (
          <p className="mt-1 text-sm text-coral">{error}</p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
