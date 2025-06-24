import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import SignupForm from './components/SignupForm.jsx'
import SignInForm from './components/SignInForm.jsx'
import './App.css'

function App() {
  const [showSignup, setShowSignup] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

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

  return (
    <>
      <Navbar onJoinFree={handleJoinFree} onSignIn={handleSignIn} />
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
      {/* Main content placeholder */}
      <main style={{marginTop: 80}}>
        {/* Add your main website content here */}
      </main>
    </>
  )
}

export default App;
