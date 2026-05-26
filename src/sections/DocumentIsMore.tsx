const IconifyIcon = 'iconify-icon' as any;

export default function DocumentIsMore() {
  return (
    <section className="relative py-16 md:py-24 border-t border-white/5 fade-up-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16 fade-up">
          <div className="w-8 h-px bg-stone-700"></div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-600">02 — A Document Is Not Just a File</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 fade-up">
          <div className="bg-[#0a0a0a] p-8 group hover:bg-white/[0.02] transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <IconifyIcon icon="lucide:database" width="20" className="text-stone-600 group-hover:text-green-500 transition-colors duration-300"></IconifyIcon>
              <span className="font-mono text-[9px] tracking-widest text-stone-700 uppercase">01</span>
            </div>
            <h4 className="font-geist text-base font-medium text-white mb-3">Data</h4>
            <p className="text-sm text-stone-500 leading-relaxed">Names, dates, amounts, clauses, tax numbers, addresses, PO numbers, invoice numbers.</p>
          </div>
          <div className="bg-[#0a0a0a] p-8 group hover:bg-white/[0.02] transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <IconifyIcon icon="lucide:shield-check" width="20" className="text-stone-600 group-hover:text-green-500 transition-colors duration-300"></IconifyIcon>
              <span className="font-mono text-[9px] tracking-widest text-stone-700 uppercase">02</span>
            </div>
            <h4 className="font-geist text-base font-medium text-white mb-3">Evidence</h4>
            <p className="text-sm text-stone-500 leading-relaxed">Proof of delivery, contract terms, tax compliance, vendor identity, approval trail.</p>
          </div>
          <div className="bg-[#0a0a0a] p-8 group hover:bg-white/[0.02] transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <IconifyIcon icon="lucide:alert-triangle" width="20" className="text-stone-600 group-hover:text-green-500 transition-colors duration-300"></IconifyIcon>
              <span className="font-mono text-[9px] tracking-widest text-stone-700 uppercase">03</span>
            </div>
            <h4 className="font-geist text-base font-medium text-white mb-3">Risk</h4>
            <p className="text-sm text-stone-500 leading-relaxed">Fraud, mismatch, duplicate, expired certificate, wrong GST, missing clause, PII exposure.</p>
          </div>
          <div className="bg-[#0a0a0a] p-8 group hover:bg-white/[0.02] transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <IconifyIcon icon="lucide:zap" width="20" className="text-stone-600 group-hover:text-green-500 transition-colors duration-300"></IconifyIcon>
              <span className="font-mono text-[9px] tracking-widest text-stone-700 uppercase">04</span>
            </div>
            <h4 className="font-geist text-base font-medium text-white mb-3">Workflow Trigger</h4>
            <p className="text-sm text-stone-500 leading-relaxed">Approve, reject, escalate, pay, onboard, notify, compare, archive.</p>
          </div>
        </div>
        <div className="border-t border-white/5 fade-up">
          <div className="bg-[#0a0a0a] p-8 group hover:bg-white/[0.02] transition-colors duration-300 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <IconifyIcon icon="lucide:brain" width="20" className="text-stone-600 group-hover:text-green-500 transition-colors duration-300"></IconifyIcon>
              <span className="font-mono text-[9px] tracking-widest text-stone-700 uppercase">05</span>
              <h4 className="font-geist text-base font-medium text-white">Knowledge</h4>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">Policies, contracts, SOPs, reports, legal references, historical decisions — every document becomes part of the enterprise knowledge graph.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
