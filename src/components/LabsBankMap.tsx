interface LabsBankMapProps {
  boxes: string[]
  caption: string
}

export function LabsBankMap({ boxes, caption }: LabsBankMapProps) {
  return (
    <div data-testid="labs-bank-map">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {boxes.map((label) => (
          <div
            key={label}
            data-testid="bank-map-box"
            className="p-6 bg-white border border-neutral-500/10 rounded-2xl shadow-soft text-center"
          >
            <span className="font-semibold text-neutral-900 tracking-tight">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-base italic text-neutral-600 max-w-3xl">{caption}</p>
    </div>
  )
}
