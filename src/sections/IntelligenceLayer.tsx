const IconifyIcon = 'iconify-icon' as any;

export default function IntelligenceLayer() {
  return (
    <section id="layer" className="relative py-16 md:py-24 border-t border-white/5 fade-up-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16 fade-up">
          <div className="w-8 h-px bg-stone-700"></div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-600">04 — The Intelligence Layer</span>
        </div>
        <div className="max-w-4xl mx-auto fade-up">
          <div className="text-center mb-6">
            <span className="font-mono text-[10px] tracking-widest uppercase text-stone-600">Business Systems</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {['ERP', 'CRM', 'AP/AR', 'HRMS', 'Procurement', 'Compliance'].map(sys => (
              <span key={sys} className="font-mono text-[10px] px-3 py-1.5 rounded border border-white/10 text-stone-500">{sys}</span>
            ))}
          </div>
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-gradient-to-b from-stone-700 to-green-500/50"></div>
              <IconifyIcon icon="lucide:chevron-down" width="12" className="text-green-500/50"></IconifyIcon>
            </div>
          </div>
          <div className="relative border border-green-500/20 rounded-sm p-8 md:p-12 bg-green-500/[0.02]">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-green-500/40"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green-500/40"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-green-500/40"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-green-500/40"></div>
            <div className="text-center mb-8">
              <span className="font-geist text-sm font-medium tracking-wide text-green-500">Document Infrastructure</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div><div className="w-1 h-1 rounded-full bg-green-500/60 mx-auto mb-3"></div><span className="font-mono text-[10px] tracking-wider text-stone-400 uppercase">Structured<br/>Data</span></div>
              <div><div className="w-1 h-1 rounded-full bg-green-500/60 mx-auto mb-3"></div><span className="font-mono text-[10px] tracking-wider text-stone-400 uppercase">Verified<br/>Evidence</span></div>
              <div><div className="w-1 h-1 rounded-full bg-green-500/60 mx-auto mb-3"></div><span className="font-mono text-[10px] tracking-wider text-stone-400 uppercase">Searchable<br/>Knowledge</span></div>
              <div><div className="w-1 h-1 rounded-full bg-green-500/60 mx-auto mb-3"></div><span className="font-mono text-[10px] tracking-wider text-stone-400 uppercase">Automated<br/>Workflows</span></div>
            </div>
          </div>
          <div className="flex justify-center mt-8 mb-8">
            <div className="flex flex-col items-center">
              <IconifyIcon icon="lucide:chevron-down" width="12" className="text-stone-600"></IconifyIcon>
              <div className="w-px h-6 bg-gradient-to-b from-stone-700 to-stone-800"></div>
            </div>
          </div>
          <div className="text-center mb-6">
            <span className="font-mono text-[10px] tracking-widest uppercase text-stone-600">Enterprise Documents</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Invoices', 'Contracts', 'KYC', 'POs', 'Claims', 'Tenders', 'Reports'].map(doc => (
              <span key={doc} className="font-mono text-[10px] px-3 py-1.5 rounded border border-white/5 text-stone-600">{doc}</span>
            ))}
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-24 fade-up">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center md:text-right">
              <p className="font-mono text-[10px] tracking-widest uppercase text-stone-700 mb-3">OCR says</p>
              <p className="text-stone-500 text-lg font-light italic">"We can read text from documents."</p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-mono text-[10px] tracking-widest uppercase text-green-500/60 mb-3">Document Infrastructure says</p>
              <p className="text-white text-lg font-light">"We can make documents usable by the entire enterprise."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
