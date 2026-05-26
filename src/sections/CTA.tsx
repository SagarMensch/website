const IconifyIcon = 'iconify-icon' as any;

export default function CTA() {
  return (
    <section id="contact" className="relative py-16 md:py-24 border-t border-white/5 fade-up-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center fade-up">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 node-glow"></div>
          </div>
          <h2 className="font-geist text-2xl md:text-4xl font-light text-white tracking-tight leading-snug mb-4">
            When a big company thinks<br/>
            <span className="text-stone-500">"We have a document-heavy process."</span>
          </h2>
          <h2 className="font-geist text-2xl md:text-4xl font-light text-green-500 tracking-tight leading-snug mb-10">
            What if the documents could decide for themselves?
          </h2>
          <p className="text-stone-500 font-light max-w-lg mx-auto mb-12">
            SequelString is Document Infrastructure for enterprises. Not another OCR tool. Not another invoice bot. A foundational layer — already live, already operational.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors duration-150">
              See the Layer
              <IconifyIcon icon="lucide:arrow-right" width="14"></IconifyIcon>
            </a>
            <a href="#" className="inline-flex items-center gap-2 border border-white/10 text-stone-400 px-8 py-3 rounded-full text-sm font-medium hover:border-white/20 hover:text-white transition-all duration-150">Request Demo</a>
          </div>
        </div>
      </div>
    </section>
  )
}
