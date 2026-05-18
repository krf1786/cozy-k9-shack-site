import { Link } from 'react-router-dom'
import { navLinks } from './Header.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <img src="/logo.jpg" alt="Cozy K9 Shack logo" className="footer-logo-badge" />
              <div className="footer-logo-text">
                <div className="footer-brand-name">COZY K9 SHACK</div>
                <div className="footer-brand-sub">In-Home Pet Grooming</div>
              </div>
            </div>
            <p className="footer-desc">
              Home-based dog grooming dedicated to providing a safe, stress-free
              grooming experience in a quiet, one-on-one environment.
            </p>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {navLinks.map((l) => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>104 Bell St., Mount Holly, NC 28120</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <a href="tel:2019626176">201.962.6176</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <a href="mailto:jaclyn@cozyk9shack.com">jaclyn@cozyk9shack.com</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">🌐</span>
                <span>www.cozyk9shack.com</span>
              </div>
            </div>
          </div>

          {/* Follow */}
          <div className="footer-col">
            <h4>Follow Me On</h4>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/CozyK9Shack"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Cozy K9 Shack on Facebook"
              >
                f
              </a>
            </div>
            <p style={{ marginTop: 14, fontSize: '.8rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.6 }}>
              Stay up to date with new pups and grooming tips on Facebook!
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cozy K9 Shack. All rights reserved.</span>
          <span>Mount Holly, NC · In-Home Pet Grooming</span>
        </div>
      </div>
    </footer>
  )
}
