import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ textAlign: 'center' }}>
        <Typography
          variant="h6"
          flex-direction="column"
          align-content="center"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Contacts Manager
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
