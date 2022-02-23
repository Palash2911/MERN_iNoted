import React, { useEffect } from 'react'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

const Notes = (props)=>{
  
  let histo = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
        histo("/")
    }
    else
    {
        histo("/login")
    }
    //eslint-disable-next-line
  }, [])

  const {showAlert} = props;
  return (
    <>
      <Addnote showAlert={showAlert}/>
    </>
  )
}

export default Notes;