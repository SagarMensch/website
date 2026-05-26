import OntologyGraph from '../components/OntologyGraph'

export default function Ontology() {
  return (
    <section id="graph" className="relative py-16 md:py-24 border-t border-white/5 overflow-hidden fade-up-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4 fade-up">
          <div className="w-8 h-px bg-stone-700"></div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-600">03 — Document Ontology</span>
        </div>
        <p className="text-stone-500 font-light max-w-xl mb-12 fade-up">
          Every document, every entity, every relationship — mapped into a living knowledge graph. This is how infrastructure thinks.
        </p>
        <div className="relative fade-up" style={{ height: '600px', maxHeight: '70vh' }}>
          <OntologyGraph />
          <div className="absolute bottom-4 left-4 flex items-center gap-6 pointer-events-none">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="font-mono text-[9px] tracking-wider text-stone-600 uppercase">Core</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/70"></div>
              <span className="font-mono text-[9px] tracking-wider text-stone-600 uppercase">Property</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-500"></div>
              <span className="font-mono text-[9px] tracking-wider text-stone-600 uppercase">Entity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-px bg-green-500/40"></div>
              <span className="font-mono text-[9px] tracking-wider text-stone-600 uppercase">Relation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
