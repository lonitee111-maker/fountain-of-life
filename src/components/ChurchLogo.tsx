import React from 'react';

interface ChurchLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark-only' | 'horizontal' | 'light';
  animated?: boolean;
}

export const ChurchLogo: React.FC<ChurchLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  animated = false
}) => {
  // Dimensions for mark
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textScaleMap = {
    sm: { title: 'text-sm', sub: 'text-[9px]' },
    md: { title: 'text-base', sub: 'text-[11px]' },
    lg: { title: 'text-xl', sub: 'text-xs' },
    xl: { title: 'text-3xl', sub: 'text-sm' }
  };

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Emblem Mark */}
      <div className={`relative shrink-0 ${sizeMap[size]}`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full drop-shadow-md transition-transform duration-300 ${
            animated ? 'hover:scale-105' : ''
          }`}
          aria-label="Fountain of Life Church Logo"
        >
          <defs>
            {/* Gradients */}
            <radialGradient id="sealBg" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="70%" stopColor="#0B1D4B" />
              <stop offset="100%" stopColor="#06102D" />
            </radialGradient>

            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E79F" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#AA7C11" />
              <stop offset="100%" stopColor="#F5D061" />
            </linearGradient>

            <linearGradient id="waterFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
            </linearGradient>

            <radialGradient id="divineGlow" cx="50%" cy="30%" r="40%">
              <stop offset="0%" stopColor="#FDF6B2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FDF6B2" stopOpacity="0" />
            </radialGradient>

            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Outer Royal Gold Rim with delicate decorative notches */}
          <circle cx="100" cy="100" r="96" stroke="url(#goldGradient)" strokeWidth="3.5" />
          <circle cx="100" cy="100" r="91" stroke="#0B1D4B" strokeWidth="1" />
          <circle cx="100" cy="100" r="88" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="2 3" />

          {/* Core Deep Royal Blue Field */}
          <circle cx="100" cy="100" r="86" fill="url(#sealBg)" />

          {/* Divine Light Aura */}
          <circle cx="100" cy="70" r="45" fill="url(#divineGlow)" />

          {/* Radial Light Rays */}
          <g opacity="0.35" stroke="url(#goldGradient)" strokeWidth="1">
            <line x1="100" y1="16" x2="100" y2="40" />
            <line x1="72" y1="24" x2="82" y2="46" />
            <line x1="128" y1="24" x2="118" y2="46" />
            <line x1="48" y1="46" x2="68" y2="60" />
            <line x1="152" y1="46" x2="132" y2="60" />
          </g>

          {/* The Fountain of Life - Ascending and Cascading Living Waters */}
          {/* Outer Flow Arcs */}
          <path
            d="M 64 140 C 50 110, 48 85, 78 72 C 86 68, 92 84, 82 108 C 76 122, 70 134, 64 140 Z"
            fill="url(#waterFlow)"
            opacity="0.85"
          />
          <path
            d="M 136 140 C 150 110, 152 85, 122 72 C 114 68, 108 84, 118 108 C 124 122, 130 134, 136 140 Z"
            fill="url(#waterFlow)"
            opacity="0.85"
          />

          {/* Inner Flow Arcs */}
          <path
            d="M 76 142 C 68 118, 70 94, 90 85 C 95 83, 97 92, 90 108 C 84 122, 80 134, 76 142 Z"
            fill="url(#waterFlow)"
            opacity="0.95"
          />
          <path
            d="M 124 142 C 132 118, 130 94, 110 85 C 105 83, 103 92, 110 108 C 116 122, 120 134, 124 142 Z"
            fill="url(#waterFlow)"
            opacity="0.95"
          />

          {/* Central Fountain Basin / Altar Foundation */}
          <path
            d="M 68 142 Q 100 156 132 142 L 126 154 Q 100 162 74 154 Z"
            fill="url(#goldGradient)"
          />
          <ellipse cx="100" cy="142" rx="32" ry="5" fill="#AA7C11" opacity="0.6" />

          {/* The Open Bible at the Center-Base */}
          <path
            d="M 76 134 C 86 131, 95 133, 99 137 L 99 146 C 95 142, 86 140, 76 143 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 124 134 C 114 131, 105 133, 101 137 L 101 146 C 105 142, 114 140, 124 143 Z"
            fill="#F8FAFC"
          />
          <line x1="100" y1="136" x2="100" y2="147" stroke="#AA7C11" strokeWidth="1.5" />

          {/* Central Golden Cross rising from the water and Word */}
          {/* Vertical Beam */}
          <rect
            x="96"
            y="48"
            width="8"
            height="80"
            rx="2"
            fill="url(#goldGradient)"
            filter="url(#softShadow)"
          />
          {/* Horizontal Beam */}
          <rect
            x="82"
            y="66"
            width="36"
            height="7.5"
            rx="2"
            fill="url(#goldGradient)"
            filter="url(#softShadow)"
          />
          {/* Subtle Cross Highlights */}
          <line x1="100" y1="50" x2="100" y2="124" stroke="#FFF7D6" strokeWidth="1.2" opacity="0.8" />
          <line x1="84" y1="69.75" x2="116" y2="69.75" stroke="#FFF7D6" strokeWidth="1.2" opacity="0.8" />

          {/* Ascending Holy Spirit Dove hovering at the top */}
          <g filter="url(#softShadow)">
            {/* Left Wing */}
            <path
              d="M 100 46 C 92 40, 78 40, 74 46 C 82 48, 92 48, 98 48 Z"
              fill="#FFFFFF"
            />
            {/* Right Wing */}
            <path
              d="M 100 46 C 108 40, 122 40, 126 46 C 118 48, 108 48, 102 48 Z"
              fill="#FFFFFF"
            />
            {/* Dove Body & Tail */}
            <ellipse cx="100" cy="46" rx="2.5" ry="5.5" fill="#FFFFFF" />
            <path d="M 99 50 L 100 54 L 101 50 Z" fill="#FFFFFF" />
            {/* Olive Leaf / Anointing Touch */}
            <circle cx="100" cy="40" r="1.5" fill="url(#goldGradient)" />
          </g>

          {/* Three Stars of Faith, Hope, Love */}
          <circle cx="58" cy="80" r="2" fill="url(#goldGradient)" />
          <circle cx="100" cy="24" r="2.5" fill="url(#goldGradient)" />
          <circle cx="142" cy="80" r="2" fill="url(#goldGradient)" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      {variant !== 'mark-only' && (
        <div className="flex flex-col tracking-tight">
          <span
            className={`font-display font-bold leading-none ${textScaleMap[size].title} ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            FOUNTAIN OF LIFE
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`font-sans tracking-widest font-semibold uppercase ${textScaleMap[size].sub} ${
                isLight ? 'text-amber-400' : 'text-amber-600'
              }`}
            >
              CHURCH
            </span>
            <span
              className={`text-[9px] ${
                isLight ? 'text-slate-300' : 'text-slate-400'
              }`}
            >
              ·
            </span>
            <span
              className={`italic font-serif text-[10px] sm:text-[11px] ${
                isLight ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Living Waters, Transforming Lives
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
