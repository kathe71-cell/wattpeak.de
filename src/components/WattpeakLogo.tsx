import React from 'react';

interface WattpeakLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showClaim?: boolean;
}

export default function WattpeakLogo({
  className = '',
  size = 'md',
  showClaim = true
}: WattpeakLogoProps) {
  const iconDimensions = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl'
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Distinctive WattPeak Architectural Signet */}
      <div 
        className={`${iconDimensions} bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden transition-transform group-hover:scale-105`}
        aria-hidden="true"
      >
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          className="w-6 h-6 text-amber-500"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle grid pattern for solar wafer */}
          <line x1="8" y1="14" x2="32" y2="14" stroke="#334155" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          <line x1="8" y1="26" x2="32" y2="26" stroke="#334155" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          <line x1="16" y1="8" x2="16" y2="32" stroke="#1e293b" strokeWidth="1" opacity="0.5" />
          <line x1="24" y1="8" x2="24" y2="32" stroke="#1e293b" strokeWidth="1" opacity="0.5" />
          {/* Precise WattPeak Energy Vector */}
          <path 
            d="M22 6L11 21h8l-3 13 13-17h-8l5-11z" 
            fill="#f59e0b" 
            stroke="#d97706" 
            strokeWidth="0.8" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* Typographic Brand Wordmark */}
      <div className="flex flex-col">
        <span className={`${textSize} font-black tracking-tight text-slate-950 font-sans leading-none`}>
          wattpeak<span className="text-amber-500">.de</span>
        </span>
        {showClaim && (
          <span className="text-[11px] font-semibold text-slate-500 tracking-normal mt-0.5 font-sans">
            Photovoltaik unabhängig entscheiden
          </span>
        )}
      </div>
    </div>
  );
}
