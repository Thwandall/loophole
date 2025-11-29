import './SubmitButton.css'

function SubmitButton({ onClick }) {
  return (
    <button className="submit-btn" onClick={onClick}>
      <svg viewBox="0 0 120 50" preserveAspectRatio="none">
        <path d="M5,8 L115,5 L118,42 L8,47 Z"/>
        <path d="M8,10 L112,8 L115,40 L10,44 Z" opacity="0.4"/>
      </svg>
      SUBMIT
    </button>
  )
}

export default SubmitButton
