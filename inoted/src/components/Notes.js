import React, {useContext, useEffect, useRef, useState} from 'react'
import notecontext from "../context/Notes/NoteContext"
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

const Notes = (props)=>{

  let histo = useNavigate();
  const {showAlert} = props;
  const cntx = useContext(notecontext);
  const {notes, fetchallnotes, updatenote} = cntx;
  useEffect(() => {
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token'))
    {
      fetchallnotes()
    }
    else
    {
        histo("/login")
    }
    //eslint-disable-next-line
  }, [])
  
  const [note, setNote] = useState({utitle: "", udescription: "", utag: "default"});
  // This is a Hook use to select a single element
  const ref = useRef(null)
  const refclose = useRef(null)
  
  //updating FORM
  const handleclick=(e)=>{
      e.preventDefault()
      updatenote(note.id, note.utitle, note.udescription, note.utag)
      refclose.current.click()
      props.showAlert("Note Updated Successfully !!", "success")
  }
  const onChange=(e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
 

  return (
    <>
      <Addnote showAlert={showAlert}/>
    </>
  )
}

export default Notes;