export default function Shift() {
  return (
    <section id="shift" className="relative py-16 md:py-24 fade-up-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16 fade-up">
          <div className="w-8 h-px bg-stone-700"></div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-600">01 — The Shift</span>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="fade-up">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-stone-600">Before</span>
            </div>
            <h3 className="font-geist text-xl font-medium text-stone-400 mb-8">Documents as storage objects</h3>
            <div className="space-y-0">
              {['PDF uploaded', 'Stored in folder', 'Manually read', 'Data copied', 'Approval', 'Audit later'].map((step, i) => (
                <div key={i} className={`flex items-center gap-4 py-4 ${i !== 5 ? 'border-b border-white/5' : ''}`}>
                  <span className="font-mono text-[10px] text-stone-700 w-16">0{i + 1}</span>
                  <span className="text-sm text-stone-500">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-up">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-green-500/80">After</span>
            </div>
            <h3 className="font-geist text-xl font-medium text-white mb-8">Documents as active business objects</h3>
            <div className="space-y-0">
              {[
                'Document uploaded',
                'Understood',
                'Classified',
                'Verified & linked to systems',
                'Risk checked & action triggered',
                'Every step auditable',
              ].map((step, i) => (
                <div key={i} className={`flex items-center gap-4 py-4 group hover:border-green-500/20 transition-colors ${i !== 5 ? 'border-b border-white/5' : ''}`}>
                  <span className="font-mono text-[10px] text-green-500/40 w-16">0{i + 1}</span>
                  <span className="text-sm text-stone-300 group-hover:text-white transition-colors">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
