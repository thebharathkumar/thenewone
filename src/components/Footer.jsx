import './Footer.css'

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <p className="footer-copy">
        <span className="footer-name">© {new Date().getFullYear()} Bharath Kumar Rajesh</span>
        <span className="footer-sep">·</span>
        Built with React, Three.js &amp; Framer Motion
      </p>
      <p className="footer-location">New York City, NY</p>
    </div>
  </footer>
)

export default Footer
