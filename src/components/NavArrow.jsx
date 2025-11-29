function NavArrow({ direction }) {
  if (direction === 'left') {
    return (
      <svg viewBox="0 0 50 50">
        <path d="M32,8 L14,25 L32,42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30,10 L14,25 L30,40" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
      </svg>
    )
  }
  
  return (
    <svg viewBox="0 0 50 50">
      <path d="M18,8 L36,25 L18,42" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20,10 L36,25 L20,40" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
    </svg>
  )
}

export default NavArrow
