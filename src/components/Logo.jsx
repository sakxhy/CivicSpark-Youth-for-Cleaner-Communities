import React from 'react';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', sub: 'text-[11px]' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl', sub: 'text-xs' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Crisp Vector Emblem */}
      <div className={`relative ${currentSize.icon} flex-shrink-0 group-hover:scale-105 transition duration-300`}>
        <svg viewBox="0 0 512 512" fill="none" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="compBgGrad" x1="48" y1="48" x2="464" y2="464" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="45%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="compLeafGrad" x1="160" y1="360" x2="340" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#DCFCE7" />
            </linearGradient>
            <linearGradient id="compSproutGrad" x1="180" y1="340" x2="280" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#86EFAC" />
            </linearGradient>
            <linearGradient id="compSparkGrad" x1="330" y1="110" x2="390" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
          </defs>

          {/* Squircle Badge */}
          <rect x="32" y="32" width="448" height="448" rx="112" fill="url(#compBgGrad)" />
          <rect x="32" y="32" width="448" height="448" rx="112" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="6" />

          {/* Sprout Blade */}
          <path d="M190 350 C180 290 205 230 250 195 C258 225 248 275 220 310 C208 325 198 338 190 350 Z" 
                fill="url(#compSproutGrad)" fillOpacity="0.9" />

          {/* Main Leaf */}
          <path d="M165 365 C165 260 230 180 325 145 C345 225 295 320 205 365 C190 372 175 372 165 365 Z" 
                fill="url(#compLeafGrad)" />

          {/* Leaf Vein */}
          <path d="M185 350 Q 235 270 310 165" 
                stroke="#15803D" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.45" />

          {/* The Radiant Civic Spark */}
          <g transform="translate(355, 140)">
            <path d="M 0,-42 Q 0,-4 38,0 Q 0,4 0,42 Q 0,4 -38,0 Q 0,-4 0,-42 Z" 
                  fill="url(#compSparkGrad)" />
            <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div>
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`${currentSize.text} font-black tracking-tight text-slate-900`}>
              Civic<span className="text-nature-600">Spark</span>
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-nature-100 text-nature-800 border border-nature-200">
              Mumbai
            </span>
          </div>
          <p className={`${currentSize.sub} text-slate-500 font-semibold tracking-wide mt-1 hidden sm:block uppercase`}>
            Youth for Cleaner Communities
          </p>
        </div>
      )}
    </div>
  );
}
