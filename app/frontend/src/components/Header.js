import React from 'react'

function Header() {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            flexDirection: 'column',
            alignContent: 'center',
            flexGrow: 1,
          }}
        >
          Contacts Manager
        </h1>
      </div>
    </div>
  )
}

export default Header
