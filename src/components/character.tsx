import React from 'react';

export function Character() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
      <svg
        viewBox="0 0 400 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-md h-auto drop-shadow-xl"
        data-ai-hint="anime girl"
      >
        <defs>
          <radialGradient id="soft-light" cx="50%" cy="30%" r="70%" fx="50%" fy="30%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--background))', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <rect width="400" height="600" fill="url(#soft-light)" />

        {/* Body and clothes */}
        <g className="character-sway">
          {/* Torso */}
          <path d="M 150 250 C 140 350, 260 350, 250 250 L 260 400 C 260 420, 140 420, 140 400 Z" fill="hsl(var(--secondary))" />
          <path d="M 150 250 C 145 320, 255 320, 250 250 L 240 260 L 160 260 Z" fill="#FFD1DC" />

          <g className="character-head-nod">
            {/* Head */}
            <path d="M 150 150 C 140 220, 260 220, 250 150 Q 200 120, 150 150 Z" fill="#FEEAE4" />
            <path d="M 200 225 C 190 235, 210 235, 200 225 Z" fill="#FDD" />

            {/* Hair */}
            <path d="M 120 120 C 50 250, 150 300, 150 150 Q 200 80, 250 150 C 250 300, 350 250, 280 120 C 250 50, 150 50, 120 120 Z" fill="hsl(var(--primary))" />
            <path d="M 125 125 C 60 255, 155 305, 155 155 Q 200 85, 245 155 C 245 305, 340 255, 275 125 C 245 55, 155 55, 125 125 Z" fill="hsl(348, 100%, 91%)" opacity="0.5" />
            <path d="M 110 300 C 100 450, 160 450, 150 300 Z" fill="hsl(var(--primary))" />
            <path d="M 250 300 C 240 450, 300 450, 290 300 Z" fill="hsl(var(--primary))" />


            {/* Eyes */}
            <g className="character-blink">
              <ellipse cx="175" cy="180" rx="10" ry="12" fill="#5C4B51" />
              <ellipse cx="225" cy="180" rx="10" ry="12" fill="#5C4B51" />
              <ellipse cx="172" cy="175" rx="3" ry="4" fill="white" />
              <ellipse cx="222" cy="175" rx="3" ry="4" fill="white" />
            </g>

            {/* Smile */}
            <path d="M 190 200 Q 200 210, 210 200" stroke="#C39" strokeWidth="2" fill="none" />
          </g>

          {/* Arms and Phone */}
          <path d="M 140 280 C 120 350, 160 380, 170 350 Z" fill="#FEEAE4" />
          <path d="M 260 280 C 280 350, 240 380, 230 350 Z" fill="#FEEAE4" />
          <rect x="175" y="320" width="50" height="70" rx="8" fill="#333" />
          <rect x="180" y="325" width="40" height="60" fill="hsl(var(--accent))" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
