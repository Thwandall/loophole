import './Logo.css'

function Logo({ size = 'large' }) {
  const width = size === 'large' ? 220 : 60

  return (
    <img
      src="/loophole_logo.svg"
      alt="Loophole Logo"
      className={`logo logo--${size}`}
      width={width}
      style={{ height: 'auto' }}
    />
  )
}

export default Logo
