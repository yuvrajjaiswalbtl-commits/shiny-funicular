import React from 'react';

interface AnnapurnaLogoProps {
  className?: string;
  size?: number;
}

/**
 * Official Annapurna Heritage "AH" Monogram Logo
 * Faithfully vectorized from the official signboard and brand crest.
 * Features the signature golden peak / temple arch, twin diagonal pillars,
 * central vertical columns, and graceful heritage archway.
 */
export const AnnapurnaLogo: React.FC<AnnapurnaLogoProps> = ({
  className = "w-8 h-8",
  size
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Annapurna Heritage Official Logo"
    >
      <defs>
        <linearGradient id="ahGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#facc15" />
          <stop offset="70%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <filter id="ahGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#ca8a04" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#ahGlow)">
        {/* Outer Left Peak Diagonal */}
        <path
          d="M 60 12 L 14 84"
          stroke="url(#ahGoldGrad)"
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Inner Left Diagonal Accent */}
        <path
          d="M 54 28 L 30 84"
          stroke="url(#ahGoldGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* Right Diagonal */}
        <path
          d="M 60 12 L 86 52"
          stroke="url(#ahGoldGrad)"
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Central Left Pillar */}
        <path
          d="M 48 40 L 48 84"
          stroke="url(#ahGoldGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* Central Right Pillar */}
        <path
          d="M 64 40 L 64 84"
          stroke="url(#ahGoldGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* Sweeping Heritage Archway */}
        <path
          d="M 18 78 Q 56 48 92 78"
          stroke="url(#ahGoldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
