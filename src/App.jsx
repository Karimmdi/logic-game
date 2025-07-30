import React from 'react'
import WolfGoatCabbage from './components/WolfGoatCabbage'


function App() {

  return (
    <div className="App">
      <div
  className="banks-container"
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '2vw',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    border: '2px solid #1976d2',
    borderRadius: '12px',
    background: '#e3f2fd',
    padding: '2vw',
    boxShadow: '0 2px 8px #b3e5fc',
    minHeight: '220px', // Add this line
  }}
>
  <WolfGoatCabbage />
      </div>
    </div>
  )
}

export default App
