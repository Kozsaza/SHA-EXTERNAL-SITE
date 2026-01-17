'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-navy mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all duration-200
            ${error
              ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20'
              : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20'
            } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-coral">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
