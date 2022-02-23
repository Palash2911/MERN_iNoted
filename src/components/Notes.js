import React, { useContext, useEffect } from 'react'
import Addnote from './Addnote'
import React from 'react'
import notecontext from '../context/Notes/NoteContext'
import { useNavigate } from 'react-router-dom'
import Noteitem from './Noteitem';

const Notes = (props)=>{

  const {showAlert} = props
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