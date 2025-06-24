import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import SignupForm from './components/SignupForm.jsx'
import SignInForm from './components/SignInForm.jsx'
import Home from './components/Home.jsx'
import ELearning from './components/ELearning.jsx'
import Footer from './components/Footer.jsx'
import Mentorship from './components/Mentorship.jsx'
import Skills from './components/Skills.jsx'
import Community from './components/Community.jsx'
import Marketplace from './components/Marketplace.jsx'
import Business from './components/Business.jsx'
import './App.css'

function App() {
  const [showSignup, setShowSignup] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [page, setPage] = useState('home');

  // Handler to open the signup modal
  const handleJoinFree = () => setShowSignup(true)
  // Handler to close the signup modal
  const handleCloseSignup = () => setShowSignup(false)

  // Handler to open the sign-in modal
  const handleSignIn = () => setShowSignIn(true)
  // Handler to close the sign-in modal
  const handleCloseSignIn = () => setShowSignIn(false)

  // Switch from sign in to sign up
  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignup(true);
  };
  // Switch from sign up to sign in
  const handleSwitchToSignIn = () => {
    setShowSignup(false);
    setShowSignIn(true);
  };

  // Navigation handlers
  const handleHome = () => setPage('home');
  const handleELearning = () => setPage('elearning');
  const handleMentorship = () => setPage('mentorship');
  const handleSkills = () => setPage('skills');
  const handleCommunity = () => setPage('community');
  const handleMarketplace = () => setPage('marketplace');
  const handleBusiness = () => setPage('business');

  // Placeholder components for other pages
  // const Mentorship = () => <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:600}}>Mentorship Page</div>;
  // const Community = () => <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:600}}>Community Page</div>;
  // const Marketplace = () => <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:600}}>Marketplace Page</div>;

  return (
    <>
      <Navbar
        onJoinFree={handleJoinFree}
        onSignIn={handleSignIn}
        onHome={handleHome}
        onELearning={handleELearning}
        onMentorship={handleMentorship}
        onSkills={handleSkills}
        onCommunity={handleCommunity}
        onMarketplace={handleMarketplace}
        onBusiness={handleBusiness}
        activePage={page}
      />
      {showSignup && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'relative', zIndex: 1001}}>
            <button onClick={handleCloseSignup} style={{position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', fontSize: 24, cursor: 'pointer'}}>×</button>
            <SignupForm onSignIn={handleSwitchToSignIn} />
          </div>
        </div>
      )}
      {showSignIn && (
        <SignInForm onSignIn={handleCloseSignIn} onSignUp={handleSwitchToSignUp} />
      )}
      <main style={{marginTop: 80}}>
        {page === 'home' && <Home />}
        {page === 'elearning' && <ELearning />}
        {page === 'mentorship' && <Mentorship />}
        {page === 'skills' && <Skills />}
        {page === 'community' && <Community />}
        {page === 'marketplace' && <Marketplace />}
        {page === 'business' && <Business />}
      </main>
      <Footer />
      <style>{`
        .navbar-menu-item a {
          transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
          border-radius: 24px;
        }
        .navbar-menu-item a:hover {
          background: linear-gradient(90deg, #a259ff 0%, #f24e1e 100%);
          color: #fff !important;
          box-shadow: 0 2px 12px rgba(162,89,255,0.13);
          transform: scale(1.06);
        }
      `}</style>
    </>
  )
}

export default App;
