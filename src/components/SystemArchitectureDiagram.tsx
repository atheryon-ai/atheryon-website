// src/components/SystemArchitectureDiagram.tsx
// /system §01 architecture diagram — public-safe orchestrator-worker depiction.
// Two agent classes (ETL → ODS → Operations) framed by an orchestrator + expert
// sign-off gate + directorial archive.
//
// "Layered bands" redraw (2026-06-01): rebuilt from a hand-coordinated SVG into a
// responsive CSS-grid/flexbox DOM diagram. The browser owns alignment and reflow,
// so the old SVG failure modes (shrink-to-unreadable on tablet, asymmetric viewBox
// margins) can't recur. Colors come from Tailwind bone/charcoal tokens, which
// globals.css remaps to the dark-navy interior theme — no hardcoded hex.
//
// DISCLOSURE: this is the PUBLIC version of the §01 diagram. The proprietary
// agent-design details belong only in the internal MNDA reference briefing and
// must not be added here or to site.ts — keep this depiction at public altitude.

export type SystemArchitectureData = {
  label: string
  title: string
  dataSources: { name: string; detail: string }
  etlAgents: { label: string; caption: string; output: string }
  ods: { name: string; detail: string; scale: string }
  operationsAgents: {
    label: string
    caption: string
    units: readonly { name: string; detail: string }[]
  }
  control: {
    orchestrator: { name: string; detail: string; runtime: string }
    signOff: { name: string; detail: string }
    archive: { name: string; detail: string }
    deployment: string
  }
  outputs: { name: string; detail: string }
  mndaCaption: string
  legend: { data: string; control: string; orchestrator: string; signoff: string }
}

// Number of abstracted ETL agent nodes shown (public altitude — count is illustrative).
const ETL_NODE_COUNT = 5

const seclabel = 'font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/50'
const arrow = 'flex items-center justify-center gap-2 text-charcoal/40 font-mono text-lg leading-none py-1.5'

function AgentNode() {
  return (
    <div className="border border-charcoal/30 bg-bone-deep px-2 py-3 text-center">
      <span className="mx-auto mb-2 block h-2 w-2 border border-charcoal/40" aria-hidden="true" />
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal/55">agent</span>
    </div>
  )
}

export function SystemArchitectureDiagram({ data }: { data: SystemArchitectureData }) {
  const c = data.control
  const summary = `${data.dataSources.name} feed two classes of specialist agent: ETL agents build the ${data.ods.name}, and Operations agents run workflows on it, coordinated by the ${c.orchestrator.name} (${c.orchestrator.runtime}), gated by ${c.signOff.name}, and logged to the ${c.archive.name}, producing ${data.outputs.name}.`

  return (
    <figure className="m-0">
      <p className="sr-only">{summary}</p>

      <div className="lg:grid lg:grid-cols-[148px_1fr] lg:gap-5">
        {/* Orchestrator rail — spans the full height of the stack on lg+ */}
        <div className="mb-3 flex items-center justify-between gap-4 border border-charcoal/30 bg-bone-deep px-4 py-3 lg:mb-0 lg:flex-col lg:py-5">
          <span className={`${seclabel} lg:order-first`}>§03</span>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-charcoal lg:[writing-mode:vertical-rl] lg:rotate-180">
            {c.orchestrator.name}
          </span>
          <span className="font-mono text-[10px] leading-relaxed text-charcoal/55 text-right lg:text-center">
            {c.orchestrator.detail}
            <span className="block text-charcoal/70">· {c.orchestrator.runtime} ·</span>
          </span>
        </div>

        {/* Stacked layers */}
        <div className="flex flex-col">
          {/* §01 Data sources */}
          <div className="flex flex-col gap-2 border border-charcoal/30 bg-paper px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <div className={seclabel}>§01</div>
              <div className="mt-1 font-display text-lg font-semibold tracking-tight text-charcoal">
                {data.dataSources.name}
              </div>
            </div>
            <div className="font-mono text-[11px] text-charcoal/65 sm:text-right">{data.dataSources.detail}</div>
          </div>

          <div className={arrow} aria-hidden="true">↓</div>

          {/* ETL agents */}
          <div className={`${seclabel} mb-2.5`}>
            {data.etlAgents.label.toUpperCase()} · {data.etlAgents.caption}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: ETL_NODE_COUNT }).map((_, i) => (
              <AgentNode key={i} />
            ))}
          </div>

          <div className={arrow} aria-hidden="true">
            ↓<span className="font-mono text-[11px] tracking-normal">{data.etlAgents.output}</span>
          </div>

          {/* §02 ODS — emphasized slab */}
          <div className="flex flex-col gap-2 border border-charcoal bg-paper px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div>
              <div className={seclabel}>§02</div>
              <div className="mt-1 font-display text-lg font-semibold tracking-tight text-charcoal">
                {data.ods.name}
              </div>
              <div className="mt-1.5 font-mono text-[11px] text-charcoal/65">{data.ods.detail}</div>
            </div>
            <div className="font-mono text-[11px] text-charcoal/70 sm:text-right sm:whitespace-nowrap">
              {data.ods.scale}
            </div>
          </div>

          {/* Operations agents */}
          <div className={`${seclabel} mb-2.5 mt-5`}>
            {data.operationsAgents.label.toUpperCase()} · {data.operationsAgents.caption}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {data.operationsAgents.units.map((u) => (
              <div key={u.name} className="border border-charcoal/30 bg-paper">
                <div className="border-b border-charcoal/15 bg-bone-deep px-3 py-2.5 font-display text-sm font-semibold text-charcoal">
                  {u.name}
                </div>
                <div className="px-3 py-2.5 font-mono text-[10.5px] tracking-[0.02em] text-charcoal/65">
                  {u.detail}
                </div>
              </div>
            ))}
          </div>

          <div className={arrow} aria-hidden="true">↓</div>

          {/* Expert sign-off gate — double rule via nested border */}
          <div className="border border-charcoal p-[3px]">
            <div className="flex flex-col gap-2 border border-charcoal px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-charcoal sm:whitespace-nowrap">
                ⌂ {c.signOff.name}
              </span>
              <span className="font-mono text-[11px] text-charcoal/65">{c.signOff.detail}</span>
            </div>
          </div>

          <div className={arrow} aria-hidden="true">↓</div>

          {/* §04 → §05 Outputs */}
          <div className="flex flex-col gap-2 border border-charcoal/30 bg-paper px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <div className={seclabel}>§04 → §05</div>
              <div className="mt-1 font-display text-lg font-semibold tracking-tight text-charcoal">
                {data.outputs.name}
              </div>
            </div>
            <div className="font-mono text-[11px] text-charcoal/65 sm:text-right">{data.outputs.detail}</div>
          </div>

          {/* Directorial archive — audit log footer */}
          <div className="mt-3.5 flex flex-col gap-1.5 border border-charcoal/15 bg-bone-deep px-4 py-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal">
              {c.archive.name}
            </span>
            <span className="font-mono text-[11px] text-charcoal/60">
              {c.archive.detail} · {c.deployment}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em] text-charcoal/60">
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-5 bg-charcoal/60" aria-hidden="true" />
          {data.legend.data}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-5 border-t border-dashed border-charcoal/60" aria-hidden="true" />
          {data.legend.control}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 border border-charcoal" aria-hidden="true" />
          {data.legend.orchestrator}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 border border-charcoal p-px" aria-hidden="true">
            <span className="block h-full w-full border border-charcoal" />
          </span>
          {data.legend.signoff}
        </span>
      </div>

      <figcaption className="mt-4 max-w-3xl font-mono text-xs leading-relaxed text-charcoal/60">
        {data.mndaCaption}
      </figcaption>
    </figure>
  )
}
