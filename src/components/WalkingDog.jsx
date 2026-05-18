function DogSvg({ variant }) {
  const isDirty = variant === 'dirty'
  const body   = isDirty ? '#a89274' : '#ffffff'
  const stroke = isDirty ? '#5a4a36' : '#5a5a5a'
  const accent = isDirty ? '#8a7558' : '#e8e3dc'

  return (
    <svg
      viewBox="0 0 130 70"
      xmlns="http://www.w3.org/2000/svg"
      className={`dog-svg dog-${variant}`}
    >
      {/* Tail */}
      <g className="dog-tail">
        <path
          d="M22 28 Q10 22 6 12 Q4 8 8 6 Q12 5 14 9 Q15 14 18 18 Q20 22 24 25 Z"
          fill={body}
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </g>

      {/* Back legs */}
      <g className="dog-leg dog-leg-back-1">
        <rect x="26" y="44" width="5" height="11" rx="2" fill={body} stroke={stroke} strokeWidth="1.3" />
      </g>
      <g className="dog-leg dog-leg-back-2">
        <rect x="33" y="44" width="5" height="11" rx="2" fill={accent} stroke={stroke} strokeWidth="1.3" />
      </g>

      {/* Body */}
      <path
        d="M24 32 Q24 26 34 25 Q52 24 68 26 Q76 27 76 33 Q76 40 72 43 Q66 45 60 43 Q52 46 44 43 Q34 45 26 43 Q22 40 22 35 Q22 33 24 32 Z"
        fill={body}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Dirt smudges (dirty only) */}
      {isDirty && (
        <>
          <ellipse cx="34" cy="32" rx="3.2" ry="2" fill="#5a4a36" opacity=".5" />
          <ellipse cx="50" cy="35" rx="2.6" ry="1.7" fill="#5a4a36" opacity=".45" />
          <ellipse cx="44" cy="29" rx="2" ry="1.4" fill="#5a4a36" opacity=".5" />
          <ellipse cx="62" cy="33" rx="2.4" ry="1.6" fill="#5a4a36" opacity=".45" />
          <ellipse cx="84" cy="28" rx="1.8" ry="1.4" fill="#5a4a36" opacity=".4" />
        </>
      )}

      {/* Front legs */}
      <g className="dog-leg dog-leg-front-1">
        <rect x="60" y="44" width="5" height="11" rx="2" fill={body} stroke={stroke} strokeWidth="1.3" />
      </g>
      <g className="dog-leg dog-leg-front-2">
        <rect x="68" y="44" width="5" height="11" rx="2" fill={accent} stroke={stroke} strokeWidth="1.3" />
      </g>

      {/* Neck */}
      <path
        d="M74 24 Q80 22 86 22 L92 26 Q86 32 78 30 Z"
        fill={body}
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Head */}
      <ellipse cx="92" cy="24" rx="10" ry="9" fill={body} stroke={stroke} strokeWidth="1.6" />

      {/* Long ear */}
      <g className="dog-ear">
        <path
          d="M84 18 Q76 22 74 36 Q74 42 78 42 Q82 41 84 36 Q86 28 88 22 Z"
          fill={accent}
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </g>

      {/* Snout */}
      <path
        d="M96 24 Q104 23 109 26 Q111 28 109 30 Q104 32 96 30 Q95 27 96 24 Z"
        fill={body}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <ellipse cx="98" cy="27" rx="4" ry="4" fill={body} />

      {/* Nose */}
      <ellipse cx="110" cy="27" rx="2.4" ry="2" fill="#2a2a2a" />

      {/* Eye */}
      <circle cx="94" cy="22" r="1.9" fill="#2a2a2a" />
      <circle cx="94.5" cy="21.4" r=".6" fill="#fff" />

      {/* Mouth */}
      <path
        d="M103 30 Q104.5 31 106 30.5"
        stroke="#2a2a2a"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Tongue */}
      <path
        d="M106 30 Q104 33 105 36 Q106 38 108 37 Q110 36 110 33 Q110 31 108 30 Z"
        fill="#e9b4b8"
        stroke="#c97a82"
        strokeWidth=".9"
        strokeLinejoin="round"
      />
      <path
        d="M107.5 31.5 Q107.5 34 107.5 36"
        stroke="#c97a82"
        strokeWidth=".7"
        fill="none"
        strokeLinecap="round"
      />

      {/* Sparkles (clean only) */}
      {!isDirty && (
        <>
          <g className="sparkle sparkle-1">
            <path d="M40 20 L44 20 M42 18 L42 22" stroke="#e9b4b8" strokeWidth=".9" strokeLinecap="round" />
          </g>
          <g className="sparkle sparkle-2">
            <path d="M58 17 L62 17 M60 15 L60 19" stroke="#8aa888" strokeWidth=".9" strokeLinecap="round" />
          </g>
          <g className="sparkle sparkle-3">
            <path d="M84 14 L88 14 M86 12 L86 16" stroke="#e9b4b8" strokeWidth=".9" strokeLinecap="round" />
          </g>
        </>
      )}
    </svg>
  )
}

export default function WalkingDog() {
  return (
    <div className="walking-dog-strip" aria-hidden="true">
      {/* Bath bubbles in the middle of the strip */}
      <div className="bubble-zone">
        <span className="bubble bubble-1" />
        <span className="bubble bubble-2" />
        <span className="bubble bubble-3" />
        <span className="bubble bubble-4" />
        <span className="bubble bubble-5" />
        <span className="bubble bubble-6" />
        <span className="bubble bubble-7" />
        <span className="bubble bubble-8" />
      </div>

      {/* Walking dog — dirty → clean as it passes through */}
      <div className="walking-dog">
        <DogSvg variant="dirty" />
        <DogSvg variant="clean" />
      </div>
    </div>
  )
}
