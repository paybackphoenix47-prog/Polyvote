import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'navy';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'navy',
  showSubtitle = true 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-2.5 select-none" id="polyvote-logo">
      {/* Modern voting ballot checkmark inside election shield */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1F3A] via-[#1E3A8A] to-[#2563EB] text-white shadow-md border border-sky-400/30 ${iconSizes[size]}`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-3/5 h-3/5 text-sky-300"
        >
          {/* Shield frame */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          {/* Checkmark inside shield */}
          <path d="m9 12 2 2 4-4" stroke="#38BDF8" strokeWidth="2.5" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
        </span>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight ${textSizes[size]} ${isLight ? 'text-white' : 'text-[#0B1F3A]'}`}>
            POLY<span className="text-[#2563EB]">VOTE</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-[#0B1F3A] border border-sky-200">
            SUG
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[10.5px] font-medium tracking-tight mt-0.5 ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
            Dr. Ogbonnaya Onu Polytechnic, Aba
          </span>
        )}
      </div>
    </div>
  );
};
