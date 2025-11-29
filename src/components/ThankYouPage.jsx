import Logo from './Logo'
import InstagramIcon from './InstagramIcon'
import './ThankYouPage.css'

function ThankYouPage() {
  return (
    <div className="page page--active">
      <div className="thank-you-content">
        <p className="thank-you-text scribble-text">
          Thank you<br />
          for filling out<br />
          this survey!
        </p>
        
        <p className="follow-text">
          Follow us on Instagram<br />
          to stay in the
        </p>
        
        <div className="loop-text">
          <span>L</span>
          <Logo size="small" />
          <span>P</span>
        </div>
        
        <a 
          href="https://instagram.com/loophole" 
          target="_blank" 
          rel="noopener noreferrer"
          className="instagram-link"
        >
          <InstagramIcon />
        </a>
      </div>
    </div>
  )
}

export default ThankYouPage
