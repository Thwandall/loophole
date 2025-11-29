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
          <span>loophole is a platform where</span>
          <span>artists come to connect and create.</span>
        </p>
        
        <p className="cta-text">
          help us help you...<br />
          get in the loop
        </p>
        
        <div className="down-arrow" onClick={onStart}>
          <DownArrow />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
