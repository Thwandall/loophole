import Logo from './Logo'
import DownArrow from './DownArrow'
import './LandingPage.css'

function LandingPage({ onStart }) {
  return (
    <div className="page page--active">
      <div className="landing-content">
        <div className="logo-container">
          <Logo size="large" />
        </div>
        
        <p className="tagline scribble-text">
          <span>Loophole's mission is to make creative networking feel like play, not pressure — by giving every creator a fair shot at finding their people. This is a platform for creators who are done with closed doors. Welcome to the side door, the loophole!</span>
        </p>
        
        <p className="cta-text">
          Get in the loop<br />
        </p>
        
        <button className="survey-start-btn" onClick={onStart}>
          Click to take Survey
        </button>
      </div>
    </div>
  )
}

export default LandingPage
