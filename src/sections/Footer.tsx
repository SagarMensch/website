import { Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0a0a0a] text-stone-400 pt-24 pb-8 overflow-hidden border-t border-white/10">
      
      {/* Background huge text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <h1 className="text-[12vw] font-black tracking-tighter text-white/5 whitespace-nowrap leading-none">
          SEQUELSTRING
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Addresses Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20 w-full">
          {/* Mumbai */}
          <div className="flex flex-col items-center space-y-2 text-sm font-medium">
            <h3 className="font-bold text-white mb-4 text-lg">Mumbai</h3>
            <p>Unit No. 325, 3rd floor</p>
            <p>Nirmal Corporate Center</p>
            <p>Nirmal Lifestyle Mall, LBS Marg</p>
            <p>Sonapur Signal, Mulund West, 400080</p>
          </div>

          {/* Delhi */}
          <div className="flex flex-col items-center space-y-2 text-sm font-medium">
            <h3 className="font-bold text-white mb-4 text-lg">Delhi</h3>
            <p>382, Ground Floor</p>
            <p>Near Avalon Courtyard Sultanpur</p>
            <p>New Delhi 110030</p>
          </div>

          {/* USA */}
          <div className="flex flex-col items-center space-y-2 text-sm font-medium">
            <h3 className="font-bold text-white mb-4 text-lg">USA</h3>
            <p>12 N route 17 suite 201</p>
            <p>Paramus NJ USA, 07652</p>
          </div>
        </div>

        {/* Bottom Bar: Socials, Copyright, and Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-white/10 pb-12 mb-12 gap-8">
          
          <div className="flex items-center justify-start space-x-8 w-full md:w-1/3">
            <a href="#" className="text-stone-400 hover:text-white transition-colors">
              <Linkedin className="w-7 h-7" />
            </a>
            <a href="#" className="text-stone-400 hover:text-white transition-colors">
              <Instagram className="w-7 h-7" />
            </a>
            <a href="#" className="text-stone-400 hover:text-white transition-colors">
              <Mail className="w-7 h-7" />
            </a>
          </div>

          <div className="text-xs text-stone-600 text-center w-full md:w-1/3">
            © 2026 SequelString AI. All Rights Reserved.
          </div>

          <div className="flex items-center justify-end space-x-8 w-full md:w-1/3">
            <a href="#" className="text-base font-medium text-stone-300 hover:text-white transition-colors underline decoration-stone-600 underline-offset-4">
              Contact Us
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
