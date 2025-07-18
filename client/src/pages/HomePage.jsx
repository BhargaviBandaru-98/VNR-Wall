import React from 'react';
import ActionCard from '../components/ActionCard';
import '../styles/HomePage.css';
import Footer from '../components/Footer';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  let fname="Student"
  if (user!==null){
    fname = user.family_name}

  return (
    <div className="homepage-container">
      <header className="hero">
        <div className="hero-content">
          <h1 id="welcomeMessage">
            <svg className="welcome-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Welcome, {fname}
          </h1>
          <p>
            VNR WALL helps you to find Genuine opportunities. Check every opportunity you receive here – whether it's a Genuine or Fake call to you. Stop trapping into Fake Internship, Placement Training & Job Scams!
          </p>
        </div>
      </header>

      <section className="card-section">
        <ActionCard 
          logo="📩"
          title="Submit a Message"
          description="Got a suspicious internship or placement opportunity? Let us verify it for you!"
          buttonText="Go to Submit Page"
          linkTo="/submit"
        />
        <ActionCard 
          logo="📄"
          title="View Submissions"
          description="Want to check the messages submitted and verified? Browse the responses."
          buttonText="View Responses"
          linkTo="/responses"
        />
      </section>

      <Footer/>
    </div>
  );
};

export default HomePage;