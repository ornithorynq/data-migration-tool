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
  ],
}: {
  current?: number
  steps?: Step[]
}) {
  return (
    <ol className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {steps.map((s) => {
        const active = s.id === current
        const complete = s.id < current
        return (
          <li key={s.id} className="flex items-center gap-2">
            <div
              className={[
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                complete ? "bg-emerald-500 text-white" : active ? "bg-blue-600 text-white" : "bg-muted text-foreground",
              ].join(" ")}
              aria-hidden="true"
            >
              {s.id}
            </div>
            <span className="text-sm">{s.label}</span>
          </li>
        )
      })}
    </ol>
  )
}
