import React, {useContext, useEffect, useRef, useState} from 'react'
import notecontext from "../context/Notes/NoteContext"
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

const Notes = (props)=>{
  const {showAlert} = props;
  return (
    <>
      <Addnote showAlert={showAlert}/>
    </>
  )
}

export default Notes;