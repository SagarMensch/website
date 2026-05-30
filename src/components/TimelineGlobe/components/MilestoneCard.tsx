import { timelineConfig } from '../config/timelineConfig';

interface MilestoneData {
  title: string;
  date: string;
  description: string;
  category: string;
  image?: string;
}

interface MilestoneCardProps {
  data: MilestoneData;
  active: boolean;
}

export default function MilestoneCard({ data, active }: MilestoneCardProps) {
  const { cards } = timelineConfig;
  
  return (
    <div 
      className={`transition-all duration-700 ease-out overflow-hidden ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        width: cards.width,
        background: cards.background,
        border: `1px solid ${cards.border}`,
        borderRadius: '12px',
        boxShadow: cards.style === 'glass' ? '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)' : '0 10px 30px rgba(0,0,0,0.8)',
        backdropFilter: cards.style === 'glass' ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: cards.style === 'glass' ? 'blur(12px)' : 'none',
        transform: active 
          ? `translateX(0px) scale(${cards.scale || 1})` 
          : `translateX(32px) scale(${cards.scale || 1})`,
        transformOrigin: 'left center'
      }}
    >
      {/* Content Area */}
      <div style={{ padding: cards.padding }}>
        {/* Header / Pill */}
        <div className="flex items-center mb-3">
          <span 
            className="rounded-full uppercase tracking-wider font-bold"
            style={{ 
              backgroundColor: cards.tagBg, 
              color: cards.tagColor,
              fontSize: '11px',
              padding: '6px 14px' // Hardcoded inline padding to bypass any Tailwind JIT cache
            }}
          >
            {data.category}
          </span>
          <span className="text-[#555] text-xs" style={{ margin: '0 16px' }}>•</span>
          <span className="text-[#888] text-xs font-medium">
            {data.date}
          </span>
        </div>
        
        {/* Title */}
        <h3 
          className="font-bold text-white mb-2 line-clamp-1" 
          title={data.title}
          style={{ fontSize: cards.titleSize }}
        >
          {data.title}
        </h3>
        
        {/* Description */}
        <p 
          className="text-[#999] leading-relaxed line-clamp-3 mb-1" 
          title={data.description}
          style={{ fontSize: cards.descriptionSize, marginBottom: data.image ? cards.gap : 0 }}
        >
          {data.description}
        </p>
      </div>

      {/* Image at bottom */}
      {data.image && (
        <div className="w-full aspect-video bg-[#0d0d0f] border-t border-[#262626]">
          <img 
            src={data.id === '1' ? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80' : 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80'} 
            alt={data.title}
            className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      )}
    </div>
  );
}
