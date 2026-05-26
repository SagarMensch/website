const IconifyIcon = 'iconify-icon' as any;

export default function Capabilities() {
  const capabilities = [
    { icon: 'lucide:inbox', num: '01', title: 'Document Intake', desc: 'Bulk upload, email ingestion, scanner, WhatsApp, API, SFTP, ERP upload.' },
    { icon: 'lucide:scan-eye', num: '02', title: 'Document Understanding', desc: 'OCR, layout detection, table extraction, handwriting, stamp/signature detection, classification.' },
    { icon: 'lucide:check-circle-2', num: '03', title: 'Document Validation', desc: 'GST, PAN, IRN, PO, GRN, contract, bank, vendor master, duplicate checks.' },
    { icon: 'lucide:git-compare', num: '04', title: 'Document Comparison', desc: 'Invoice vs PO, contract vs invoice, old policy vs new policy, two versions of agreement.' },
    { icon: 'lucide:message-square', num: '05', title: 'Document Search & Chat', desc: 'Talk to PDF, ask across 10,000 documents, clause search, evidence-based answers.' },
    { icon: 'lucide:shield-alert', num: '06', title: 'Document Risk Intelligence', desc: 'Fraud detection, forgery indicators, PII detection, missing fields, compliance gaps.' },
    { icon: 'lucide:workflow', num: '07', title: 'Document Workflow', desc: 'Auto-approval, exception routing, maker-checker, escalation, SLA tracking.' },
    { icon: 'lucide:network', num: '08', title: 'Document Memory', desc: 'Every document becomes part of a company knowledge graph: vendor, amount, clause, risk, approval, transaction.' },
    { icon: 'lucide:file-search', num: '09', title: 'Document Audit Layer', desc: 'Who uploaded, what changed, what was extracted, what was approved, what evidence was used.' },
  ];

  return (
    <section id="grid" className="relative py-16 md:py-24 border-t border-white/5 dot-bg fade-up-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16 fade-up">
          <div className="w-8 h-px bg-stone-700"></div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-600">05 — Platform Capabilities</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 fade-up">
          {capabilities.map((cap) => (
            <div key={cap.num} className="capability-card rounded-sm p-6 group">
              <div className="flex items-center justify-between mb-4">
                <IconifyIcon icon={cap.icon} width="18" className="text-stone-600 group-hover:text-green-500 transition-colors duration-300"></IconifyIcon>
                <span className="font-mono text-[9px] tracking-widest text-stone-700">{cap.num}</span>
              </div>
              <h4 className="font-geist text-sm font-medium text-white mb-2">{cap.title}</h4>
              <p className="text-xs text-stone-500 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
