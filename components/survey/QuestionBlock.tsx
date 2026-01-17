import { ReactNode } from 'react'

interface QuestionBlockProps {
  question: string
  description?: string
  required?: boolean
  children: ReactNode
}

export function QuestionBlock({ question, description, required = false, children }: QuestionBlockProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-navy">
          {question}
          {required && <span className="text-coral ml-1">*</span>}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}
