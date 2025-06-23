import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import SignupForm from './components/SignupForm.jsx'
import './App.css'

function App() {
  const [showSignup, setShowSignup] = useState(false)

  // Handler to open the signup modal
  const handleJoinFree = () => setShowSignup(true)
  // Handler to close the signup modal
  const handleCloseSignup = () => setShowSignup(false)

  return (
    <>
      <Navbar onJoinFree={handleJoinFree} />
      {showSignup && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'relative', zIndex: 1001}}>
            <button onClick={handleCloseSignup} style={{position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', fontSize: 24, cursor: 'pointer'}}>×</button>
            <SignupForm />
          </div>
        </div>
      )}
      {/* Main content placeholder */}
      <main style={{marginTop: 80}}>
        {/* Add your main website content here */}
      </main>
    </>
  )
}

export default App;
