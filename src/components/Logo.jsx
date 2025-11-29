import './Logo.css'

function Logo({ size = 'large' }) {
  const width = size === 'large' ? 220 : 60
  const height = size === 'large' ? 80 : 30
  const strokeWidth = size === 'large' ? 2.5 : 3

  return (
    <svg 
      className={`logo logo--${size}`}
      viewBox="0 0 200 80" 
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Main wobbly infinity strokes */}
        <path 
          d="M45,42 C43,28 58,18 78,32 C92,42 98,41 100,40 C102,39 108,38 122,28 C142,14 158,26 156,42 C154,58 138,66 118,52 C104,42 98,41 100,40 C102,39 108,42 82,56 C58,70 43,58 45,42" 
          strokeWidth={strokeWidth} 
          filter="url(#rougher)"
        />
        <path 
          d="M48,40 C48,30 60,22 77,33 C90,42 97,40 100,40 C103,40 110,42 123,33 C140,22 152,30 152,40 C152,50 140,58 123,47 C110,38 103,40 100,40 C97,40 90,38 77,47 C60,58 48,50 48,40" 
          strokeWidth={strokeWidth * 0.72} 
          opacity="0.7"
        />
        <path 
          d="M50,38 C52,26 65,20 80,32 C93,42 99,40 100,40 C101,40 107,42 120,32 C135,20 148,26 150,38 C152,50 135,60 120,48 C107,38 101,40 100,40 C99,40 93,38 80,48 C65,60 52,50 50,38" 
          strokeWidth={strokeWidth * 0.48} 
          opacity="0.5"
        />
        {/* Extra sketch marks */}
        {size === 'large' && (
          <>
            <path d="M55,35 C60,32 68,30 75,35" strokeWidth="1" opacity="0.4"/>
            <path d="M125,35 C130,32 138,30 145,35" strokeWidth="1" opacity="0.4"/>
            <path d="M55,48 C60,52 70,54 78,50" strokeWidth="1" opacity="0.3"/>
            <path d="M122,50 C130,54 140,52 145,48" strokeWidth="1" opacity="0.3"/>
          </>
        )}
      </g>
    </svg>
  )
}

export default Logo
