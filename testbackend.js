// Test backend connection
async function testBackend() {
    try {
      const response = await fetch('http://localhost:5000/api/test')
      const data = await response.json()
      console.log('Backend response:', data)
    } catch (error) {
      console.error('Connection error:', error)
    }
  }
  
  // Call the function
  testBackend()