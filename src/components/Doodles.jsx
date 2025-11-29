import './Doodles.css'

function Doodles() {
  return (
    <>
      <svg className="doodle doodle-1" viewBox="0 0 100 100">
        <path d="M20,50 C25,20 40,15 50,50 C60,85 75,80 80,50" strokeLinecap="round"/>
        <path d="M15,70 Q30,60 45,75 T80,65" strokeLinecap="round"/>
        <circle cx="70" cy="25" r="10"/>
      </svg>
      
      <svg className="doodle doodle-2" viewBox="0 0 100 100">
        <path d="M10,30 L40,15 L65,45 L90,25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15,80 C30,50 50,90 70,60 S90,70 95,55" strokeLinecap="round"/>
      </svg>
      
      <svg className="doodle doodle-3" viewBox="0 0 100 100">
        <path d="M20,20 Q50,10 80,30 T60,70 Q30,90 20,60 Z" strokeLinecap="round"/>
      </svg>
    </>
  )
}

export default Doodles
