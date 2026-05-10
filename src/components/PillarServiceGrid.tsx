interface ServiceCard {
  title: string
  body: string
}

interface PillarServiceGridProps {
  cards: ServiceCard[]
}

export function PillarServiceGrid({ cards }: PillarServiceGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {cards.map((card) => (
        <article
          key={card.title}
          data-testid="pillar-service-card"
          className="p-7 bg-white border border-charcoal/10 rounded-xl"
        >
          <h3 className="text-xl font-bold text-charcoal tracking-tight mb-3">{card.title}</h3>
          <p className="text-charcoal/80 leading-relaxed">{card.body}</p>
        </article>
      ))}
    </div>
  )
}
