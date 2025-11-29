import './Checkbox.css'

function Checkbox({ selected }) {
  return (
    <div className="checkbox-box">
      <svg viewBox="0 0 28 28">
        <path d="M4,5 L24,4 L25,24 L5,25 Z" transform="rotate(-1 14 14)"/>
        <path d="M5,6 L23,5 L24,23 L6,24 Z" transform="rotate(1 14 14)" opacity="0.4"/>
        <path 
          className={`checkmark ${selected ? 'checkmark--selected' : ''}`} 
          d="M6,14 L12,20 L23,7" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default Checkbox
