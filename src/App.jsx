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
      {/* Modal comes first, so it covers everything including the navbar */}
      {showSignup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.25)', zIndex: 2000, display: 'grid',
          placeItems: 'center',
          backdropFilter: 'blur(2.5px)',
        }}>
          <div style={{
            position: 'relative', zIndex: 2001, background: '#fff', borderRadius: 20,
            boxShadow: '0 12px 48px 0 rgba(80, 80, 120, 0.18), 0 2px 8px rgba(0,0,0,0.10)',
            border: '1.5px solid #e5e7eb',
            maxWidth: 440, width: '100%', maxHeight: '92vh',
            display: 'flex', flexDirection: 'column',
            padding: '2.5rem 2rem 2rem 2rem',
            margin: '0 1rem',
            overflow: 'hidden',
          }}>
            <button onClick={handleCloseSignup} style={{
              position: 'absolute', top: 18, right: 18, background: 'rgba(240,240,240,0.8)',
              border: 'none', fontSize: 28, cursor: 'pointer', color: '#888',
              zIndex: 10, borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
            }}>×</button>
            <div style={{
              overflowY: 'auto',
              maxHeight: '80vh',
              paddingRight: 4,
              paddingBottom: 24,
              paddingLeft: 2,
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
            }}
              className="modal-scroll-hide"
            >
              <SignupForm />
            </div>
            <style>{`
              .modal-scroll-hide::-webkit-scrollbar { display: none; }
            `}</style>
          </div>
        </div>
      )}
      <Navbar onJoinFree={handleJoinFree} />
      <main style={{ marginTop: 80 }}>
        {/* Main content */}
      </main>
    </>
  )
}

export default App;
