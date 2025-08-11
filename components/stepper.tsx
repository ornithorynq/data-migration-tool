type Step = {
  id: number
  label: string
}

export default function Stepper({
  current = 1,
  steps = [
    { id: 1, label: "Source" },
    { id: 2, label: "Destination" },
    { id: 3, label: "Mapping" },
    { id: 4, label: "Pre-checks" },
    { id: 5, label: "Finalize" },
  ],
}: {
  current?: number
  steps?: Step[]
}) {
  const currentStep = steps.find(s => s.id === current)
  const progress = (current / steps.length) * 100

  return (
    <div className="mb-6">
      {/* Current Step Label */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Step {current}: {currentStep?.label}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {current === 1 && "Connect to your source database and validate connection"}
          {current === 2 && "Configure destination database settings"}
          {current === 3 && "Map source tables and columns to destination"}
          {current === 4 && "Validate configuration and run pre-flight checks"}
          {current === 5 && "Review configuration and start migration"}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <ol className="grid grid-cols-5 gap-2">
        {steps.map((s) => {
          const active = s.id === current
          const complete = s.id < current
          return (
            <li key={s.id} className="flex items-center gap-2">
              <div
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200",
                  complete ? "bg-emerald-500 text-white" : active ? "bg-blue-600 text-white" : "bg-muted text-foreground",
                ].join(" ")}
                aria-hidden="true"
              >
                {complete ? "✓" : s.id}
              </div>
              <span className={`text-sm ${active ? "font-medium text-blue-600" : ""}`}>
                {s.label}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
