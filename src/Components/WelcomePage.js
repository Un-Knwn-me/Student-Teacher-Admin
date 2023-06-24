import React from 'react'
import Base from './Base'
import { Fab } from '@mui/material'
import NavigationIcon from '@mui/icons-material/Navigation';
import { useHistory } from 'react-router-dom';

const WelcomePage = () => {
    const history = useHistory();
  return (
    <Base title={"Welcome to the Dashboard"}>
        <Fab variant="extended" onClick={()=>history.push("/students")}>
        <NavigationIcon sx={{ mr: 1 }} />
        Student List
      </Fab>
    </Base>
  )
}

export default WelcomePage