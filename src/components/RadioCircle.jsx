import './RadioCircle.css'

function RadioCircle({ selected }) {
  return (
    <div className="radio-circle">
      <svg viewBox="0 0 30 30">
        <ellipse cx="15" cy="15" rx="12" ry="11" transform="rotate(-2 15 15)"/>
        <ellipse cx="15" cy="15" rx="11" ry="12" transform="rotate(3 15 15)" opacity="0.4"/>
        <ellipse 
          className={`fill-circle ${selected ? 'fill-circle--selected' : ''}`} 
          cx="15" 
          cy="15" 
          rx="6" 
          ry="5" 
          transform="rotate(-5 15 15)"
        />
      </svg>
    </div>
  )
}

export default RadioCircle
