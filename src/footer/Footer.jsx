import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css"; // Importing the Footer.css file

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.facebook.com/Atleos.NCR/" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://x.com/ncratleos" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/ncratleos/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/company/ncratleos/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
      <p>© NCR Atleos powered by Marko Nedin</p>
    </footer>
  );
}

export default Footer;