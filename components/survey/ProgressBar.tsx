interface ProgressBarProps {
  current: number
  total: number
  accentColor: 'gold' | 'teal' | 'coral'
}

export function ProgressBar({ current, total, accentColor }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  const colorClasses = {
    gold: 'bg-gold',
    teal: 'bg-teal',
    coral: 'bg-coral',
  }

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Question {current} of {total}</span>
        <span>{percentage}% complete</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[accentColor]} transition-all duration-300 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
