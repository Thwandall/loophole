import InstagramIcon from './InstagramIcon'
import './ThankYouPage.css'

function ThankYouPage() {
  return (
    <div className="page page--active">
      <div className="thank-you-content">
        <p className="thank-you-text scribble-text">
          Thank you for filling out this survey!
        </p>

        <p className="follow-text">
          Follow us on Instagram<br />
          to stay in the Loop
        </p>

        <a
          href="https://www.instagram.com/theloophole.co?igsh=MXdrbTBsOWRteW9yMg%3D%3D&utm_source=qr"
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
