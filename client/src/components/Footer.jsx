import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <h2 className="footer-heading">
        <span className="footer-icon">✉</span> How to Use This Site
      </h2>
      <ul className="footer-list">
        <li className="footer-list-item">
          <strong>1. Submit doubtful messages:</strong> If something looks fake, report it here in above submit page.
        </li>
        <li className="footer-list-item">
          <strong>2. Fill proper details:</strong> More details = faster and accurate verification.
        </li>
        <li className="footer-list-item">
          <strong>3. Wait for review:</strong> Our team checks and verifies each report.
        </li>
        <li className="footer-list-item">
          <strong>4. View verified info:</strong> See if your or others' reports are marked as Fake or Genuine.
        </li>
        <li className="footer-list-item">
          <strong>5. Protect yourself & others:</strong> Stay informed and help your friends avoid scams.
        </li>
      </ul>
      <p className="footer-tagline">
        © 2025 VNR Wall — Built with 💙 to protect students from fraud
      </p>
    </div>
  );
}

export default Footer;