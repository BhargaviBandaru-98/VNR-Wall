import React from "react";

const footerStyles = {
  container: {
    backgroundColor: "#f0f4f8", // soft light blue-gray
    padding: "50px 20px",
    borderTop: "4px solid #cbd5e1", // soft border
    borderRadius: "12px",
    textAlign: "center",
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    marginTop: "60px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
    maxWidth: "1000px",
    margin: "60px auto",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#0f172a",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  icon: {
    fontSize: "28px",
    color: "#2563eb"
  },
  list: {
    listStyle: "none",
    padding: 0,
    maxWidth: "750px",
    margin: "0 auto 25px",
    textAlign: "left"
  },
  listItem: {
    marginBottom: "14px",
    fontSize: "16px",
    lineHeight: "1.6",
    backgroundColor: "#e2e8f0",
    padding: "12px 18px",
    borderRadius: "10px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease-in-out"
  },
  tagline: {
    fontSize: "14px",
    marginTop: "35px",
    color: "#64748b"
  }
};

function Footer() {
  return (
    <div style={footerStyles.container}>
      <h2 style={footerStyles.heading}>
        <span style={footerStyles.icon}>✉</span> How to Use This Site
      </h2>
      <ul style={footerStyles.list}>
        <li style={footerStyles.listItem}>
          <strong>1. Submit doubtful messages:</strong> If something looks fake, report it here in above submit page.
        </li>
        <li style={footerStyles.listItem}>
          <strong>2. Fill proper details:</strong> More details = faster and accurate verification.
        </li>
        <li style={footerStyles.listItem}>
          <strong>3. Wait for review:</strong> Our team checks and verifies each report.
        </li>
        <li style={footerStyles.listItem}>
          <strong>4. View verified info:</strong> See if your or others' reports are marked as Fake or Genuine.
        </li>
        <li style={footerStyles.listItem}>
          <strong>5. Protect yourself & others:</strong> Stay informed and help your friends avoid scams.
        </li>
      </ul>
      <p style={footerStyles.tagline}>
        © 2025 VNR Wall — Built with 💙 to protect students from fraud
      </p>
    </div>
  );
}

export default Footer;
