import React, {useContext, useState} from 'react'
import notecontext from "../context/Notes/NoteContext"

const Noteitem = (props) => {
    const {note, updateNote} = props;
    const cntx = useContext(notecontext);
    const {deletenote} = cntx;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title my-2">{note.title}</h5>
                <div className="icons d-flex justify-content-end">
                  <i className="fas fa-solid fa-trash mx-4" onClick={()=>{deletenote(note._id), props.showAlert("Note Deleted !", "warning")}}></i>
                  <i className="fas fa-solid fa-pen mx-1" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
            <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
