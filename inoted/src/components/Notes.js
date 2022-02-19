import React, {useContext, useEffect} from 'react'
import notecontext from "../context/Notes/NoteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote'

const Notes = ()=>{

  const cntx = useContext(notecontext);
  const {notes, fetchallnotes} = cntx;
  useEffect(() => {
    fetchallnotes()
  }, [])
  

  return (
    <>
      <Addnote/>
      <div className="row my-3">
          <h2>Your Notes</h2>
          {notes.map((note)=>{
              return <Noteitem key={note._id} note={note}/>;
          })}
      </div>
    </>
  )
}

export default Notes;