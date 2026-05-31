// src/components/SystemArchitectureDiagram.tsx
// /system §01 architecture diagram — public-safe orchestrator-worker depiction.
// Two agent classes (ETL → ODS → Operations) framed by an orchestrator + expert
// sign-off gate + directorial archive. Monochrome bone-on-navy to match the
// dark interior-page theme (globals.css remaps bone/charcoal utilities to dark);
// this inline SVG uses literal bone (#EFEAE0) since the remap can't reach it.
// Stroke encodes meaning: solid = data plane, dashed = control/audit plane.
//
// DISCLOSURE: this is the PUBLIC version of the §01 diagram. The proprietary
// agent-design details belong only in the internal MNDA reference briefing and
// must not be added here or to site.ts — keep this depiction at public altitude.
import { Fragment } from 'react'

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

// Fixed x-origin + width per Operations unit card (up to 5). Geometry is
// presentational and intentionally hard-coded; text comes from `data`.
const OPS_X = [140, 294, 448, 602, 756] as const
// Last card is 144 (vs 140) to close the gap to the diagram's right edge.
const OPS_W = [140, 140, 140, 140, 144] as const

export function SystemArchitectureDiagram({ data }: { data: SystemArchitectureData }) {
  const c = data.control
  return (
    <>
      {/* Desktop (lg+): inline SVG. Below lg the SVG renders too small to read
          (viewBox units scale with width; at the md range the densest labels
          collapse to ~5px), so the legible vertical card layout covers tablet too. */}
      <div className="hidden lg:block">
        <svg
          role="img"
          aria-labelledby="system-arch-title"
          viewBox="0 0 980 540"
          className="w-full h-auto block"
          style={{ fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace" }}
        >
          <title id="system-arch-title">
            {`${data.dataSources.name} feed two classes of specialist agent: ETL agents build the ${data.ods.name}, and Operations agents run workflows on it, coordinated by the ${c.orchestrator.name} (${c.orchestrator.runtime}), gated by ${c.signOff.name}, and logged to the ${c.archive.name}, producing ${data.outputs.name}.`}
          </title>
          <defs>
            <marker id="sa-arch-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#EFEAE0" />
            </marker>
          </defs>

          {/* Orchestrator left rail (navy = single emphasis) */}
          <rect x="20" y="98" width="100" height="344" rx="4" fill="#0A1A2F" />
          <text x="70" y="120" textAnchor="middle" fontSize="8" fill="#EFEAE0" fillOpacity="0.7">§03</text>
          <text x="70" y="250" textAnchor="middle" fontSize="11" fill="#EFEAE0" fontWeight="700" transform="rotate(-90 70 250)" letterSpacing="1">
            {c.orchestrator.name.toUpperCase()}
          </text>
          <text x="70" y="408" textAnchor="middle" fontSize="6.5" fill="#EFEAE0" fillOpacity="0.8">routes · types</text>
          <text x="70" y="418" textAnchor="middle" fontSize="6.5" fill="#EFEAE0" fillOpacity="0.8">retries · audits</text>
          <text x="70" y="432" textAnchor="middle" fontSize="6.5" fill="#EFEAE0" fillOpacity="0.95">· {c.orchestrator.runtime} ·</text>

          {/* Data sources */}
          <rect x="140" y="24" width="760" height="38" fill="none" stroke="#EFEAE0" strokeOpacity="0.55" />
          <text x="152" y="40" fontSize="9" fill="#EFEAE0" fillOpacity="0.55">§01</text>
          <text x="152" y="52" fontSize="10.5" fill="#EFEAE0" fontWeight="600">{data.dataSources.name}</text>
          <text x="520" y="47" fontSize="9" fill="#EFEAE0" fillOpacity="0.7">{data.dataSources.detail}</text>
          <g stroke="#EFEAE0" strokeOpacity="0.5" fill="none">
            <line x1="231" y1="62" x2="231" y2="98" markerEnd="url(#sa-arch-arrow)" />
            <line x1="421" y1="62" x2="421" y2="98" markerEnd="url(#sa-arch-arrow)" />
            <line x1="611" y1="62" x2="611" y2="98" markerEnd="url(#sa-arch-arrow)" />
            <line x1="801" y1="62" x2="801" y2="98" markerEnd="url(#sa-arch-arrow)" />
          </g>

          {/* ETL agents tier — unlabelled CDM-native cluster (abstracted) */}
          <text x="140" y="84" fontSize="8.5" letterSpacing="1.5" fill="#EFEAE0" fontWeight="700">
            {data.etlAgents.label.toUpperCase()}
            <tspan fontWeight="400" fillOpacity="0.65" letterSpacing="0"> · {data.etlAgents.caption}</tspan>
          </text>
          {[170, 300, 430, 560, 690].map((gx) => (
            <g key={gx}>
              <rect x={gx} y="102" width="64" height="36" rx="3" fill="none" stroke="#EFEAE0" strokeOpacity="0.6" />
              <circle cx={gx + 32} cy="116" r="4" fill="none" stroke="#EFEAE0" strokeOpacity="0.6" />
              <text x={gx + 32} y="132" textAnchor="middle" fontSize="6.5" fill="#EFEAE0" fillOpacity="0.45">agent</text>
            </g>
          ))}
          <text x="800" y="124" fontSize="14" fill="#EFEAE0" fillOpacity="0.4">· · ·</text>

          {/* ETL -> ODS */}
          <g stroke="#EFEAE0" strokeOpacity="0.5" fill="none">
            <line x1="332" y1="138" x2="332" y2="194" markerEnd="url(#sa-arch-arrow)" />
            <line x1="592" y1="138" x2="592" y2="194" markerEnd="url(#sa-arch-arrow)" />
          </g>
          <text x="470" y="166" fontSize="7.5" fill="#EFEAE0" fillOpacity="0.7">{data.etlAgents.output} →</text>

          {/* ODS slab */}
          <rect x="140" y="194" width="760" height="56" rx="3" fill="#EFEAE0" fillOpacity="0.04" stroke="#EFEAE0" strokeWidth="1.6" />
          <text x="152" y="214" fontSize="9" fill="#EFEAE0" fillOpacity="0.55">§02</text>
          <text x="152" y="228" fontSize="11" fill="#EFEAE0" fontWeight="700">{data.ods.name.toUpperCase()}</text>
          <text x="152" y="242" fontSize="8" fill="#EFEAE0" fillOpacity="0.75">{data.ods.detail}</text>
          <text x="888" y="224" textAnchor="end" fontSize="8" fill="#EFEAE0" fillOpacity="0.7">{data.ods.scale}</text>

          {/* ODS -> Operations */}
          <g stroke="#EFEAE0" strokeOpacity="0.5" fill="none">
            {[210, 350, 490, 630, 770].map((rx, i) => (
              <line key={i} x1={rx} y1="250" x2={rx} y2="292" markerEnd="url(#sa-arch-arrow)" />
            ))}
          </g>
          <text x="220" y="286" fontSize="7" fill="#EFEAE0" fillOpacity="0.6">read →</text>

          {/* Operations agents tier (per business unit) */}
          <text x="140" y="284" fontSize="8.5" letterSpacing="1.5" fill="#EFEAE0" fontWeight="700">
            {data.operationsAgents.label.toUpperCase()}
            <tspan fontWeight="400" fillOpacity="0.65" letterSpacing="0"> · {data.operationsAgents.caption}</tspan>
          </text>
          {data.operationsAgents.units.slice(0, 5).map((u, i) => (
            <g key={u.name}>
              <rect x={OPS_X[i]} y="292" width={OPS_W[i]} height="58" rx="3" fill="none" stroke="#EFEAE0" strokeOpacity="0.6" />
              <rect x={OPS_X[i]} y="292" width={OPS_W[i]} height="16" fill="#EFEAE0" fillOpacity="0.06" />
              <text x={OPS_X[i] + 8} y="304" fontSize="8.5" fill="#EFEAE0" fontWeight="600">{u.name}</text>
              <text x={OPS_X[i] + 8} y="324" fontSize="7.5" fill="#EFEAE0" fillOpacity="0.7">{u.detail}</text>
            </g>
          ))}

          {/* Expert sign-off gate strip (ink double-rule) */}
          <g stroke="#EFEAE0" strokeOpacity="0.5" fill="none">
            <line x1="344" y1="350" x2="344" y2="378" markerEnd="url(#sa-arch-arrow)" />
            <line x1="520" y1="350" x2="520" y2="378" markerEnd="url(#sa-arch-arrow)" />
            <line x1="696" y1="350" x2="696" y2="378" markerEnd="url(#sa-arch-arrow)" />
          </g>
          <rect x="140" y="378" width="760" height="30" fill="none" stroke="#EFEAE0" strokeWidth="1" />
          <rect x="143" y="381" width="754" height="24" fill="none" stroke="#EFEAE0" strokeWidth="1" />
          <text x="152" y="396" fontSize="9" fill="#EFEAE0" fontWeight="700">⌂ {c.signOff.name.toUpperCase()}</text>
          <text x="520" y="396" textAnchor="middle" fontSize="8" fill="#EFEAE0" fillOpacity="0.8">{c.signOff.detail}</text>

          {/* Outputs */}
          <line x1="520" y1="408" x2="520" y2="430" stroke="#EFEAE0" strokeOpacity="0.5" markerEnd="url(#sa-arch-arrow)" />
          <rect x="140" y="430" width="760" height="38" fill="none" stroke="#EFEAE0" strokeOpacity="0.55" />
          <text x="152" y="446" fontSize="9" fill="#EFEAE0" fillOpacity="0.55">§04 → §05</text>
          <text x="152" y="458" fontSize="10.5" fill="#EFEAE0" fontWeight="600">{data.outputs.name}</text>
          <text x="540" y="453" fontSize="9" fill="#EFEAE0" fillOpacity="0.7">{data.outputs.detail}</text>

          {/* Orchestrator dashed control to both tiers */}
          <g stroke="#EFEAE0" strokeOpacity="0.4" strokeDasharray="4 3" fill="none">
            <line x1="120" y1="120" x2="138" y2="120" markerEnd="url(#sa-arch-arrow)" />
            <line x1="120" y1="320" x2="138" y2="320" markerEnd="url(#sa-arch-arrow)" />
          </g>

          {/* Directorial archive band (named only) */}
          <rect x="20" y="484" width="880" height="40" fill="#EFEAE0" fillOpacity="0.05" stroke="#EFEAE0" strokeOpacity="0.35" />
          <text x="34" y="504" fontSize="9.5" fill="#EFEAE0" fontWeight="700" letterSpacing="0.5">{c.archive.name.toUpperCase()}</text>
          <text x="34" y="517" fontSize="8" fill="#EFEAE0" fillOpacity="0.7">{c.archive.detail} · {c.deployment}</text>
          <path d="M820 408 C860 446 870 466 870 482" stroke="#EFEAE0" strokeOpacity="0.45" strokeDasharray="4 3" fill="none" markerEnd="url(#sa-arch-arrow)" />
          <text x="828" y="436" fontSize="7" fill="#EFEAE0" fillOpacity="0.6">log ↓</text>

          {/* Legend */}
          <g fontSize="8" fill="#EFEAE0" fillOpacity="0.75">
            <line x1="20" y1="534" x2="44" y2="534" stroke="#EFEAE0" strokeOpacity="0.7" />
            <text x="50" y="537">{data.legend.data}</text>
            <line x1="150" y1="534" x2="174" y2="534" stroke="#EFEAE0" strokeOpacity="0.6" strokeDasharray="4 3" />
            <text x="180" y="537">{data.legend.control}</text>
            <rect x="300" y="528" width="12" height="12" fill="#0A1A2F" />
            <text x="318" y="537">{data.legend.orchestrator}</text>
            <rect x="448" y="528" width="12" height="12" fill="none" stroke="#EFEAE0" />
            <rect x="450.5" y="530.5" width="7" height="7" fill="none" stroke="#EFEAE0" />
            <text x="466" y="537">{data.legend.signoff}</text>
          </g>
        </svg>
        <p className="mt-4 font-mono text-xs text-charcoal/60 max-w-3xl">{data.mndaCaption}</p>
      </div>

      {/* Mobile + tablet fallback (< lg): vertical OL mirroring the same architecture */}
      <div className="lg:hidden">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-3">
          {c.orchestrator.name} ({c.orchestrator.runtime}) · {c.archive.name}
        </p>
        <ol className="grid grid-cols-1 gap-3">
          {[
            { k: '§01', name: data.dataSources.name, detail: data.dataSources.detail },
            { k: 'ETL', name: data.etlAgents.label, detail: `${data.etlAgents.caption} → ${data.etlAgents.output}` },
            { k: '§02', name: data.ods.name, detail: `${data.ods.detail} · ${data.ods.scale}` },
            {
              k: 'OPS',
              name: data.operationsAgents.label,
              detail: data.operationsAgents.units.map((u) => u.name).join(' · '),
            },
            { k: 'GATE', name: c.signOff.name, detail: c.signOff.detail },
            { k: '§04→§05', name: data.outputs.name, detail: data.outputs.detail },
          ].map((row, i, arr) => (
            <Fragment key={row.k}>
              <li className="border border-charcoal/30 bg-bone-deep p-5 flex flex-col">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-2">{row.k}</div>
                <div className="font-display text-lg font-medium text-charcoal leading-snug">{row.name}</div>
                <div className="mt-2 font-mono text-xs text-charcoal/70 leading-relaxed">{row.detail}</div>
              </li>
              {i < arr.length - 1 && (
                <li aria-hidden="true" className="flex items-center justify-center text-charcoal/40 font-mono text-2xl py-1">↓</li>
              )}
            </Fragment>
          ))}
        </ol>
        <p className="mt-4 font-mono text-xs text-charcoal/60">{data.mndaCaption}</p>
      </div>
    </>
  )
}
