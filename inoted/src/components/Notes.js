import React, {useContext, useEffect, useRef, useState} from 'react'
import notecontext from "../context/Notes/NoteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote'

const Notes = ()=>{

  const cntx = useContext(notecontext);
  const {notes, fetchallnotes} = cntx;
  useEffect(() => {
    fetchallnotes()
    //eslint-disable-next-line
  }, [])
  
  const [note, setNote] = useState({utitle: "", udescription: "", utag: "default"});
  // This is a Hook use to select a single element
  const ref = useRef(null)
  // UPDATING NOTE FROM HERE
  const updateNote=(currentnote)=>{
      ref.current.click()
      setNote({utitle: currentnote.title, udescription: currentnote.description, utag: currentnote.tag})
  }
  //updating FORM
  const handleclick=(e)=>{
      e.preventDefault()
  }
  const onChange=(e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
 

  return (
    <>
      <Addnote/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
              <div className="mb-3">
                  <label htmlFor="utitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="utitle" name="utitle" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter Note Title" value={note.utitle}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="udescription" className="form-label">Description</label>
                  <textarea className="form-control" placeholder="Enter Note" id="udescription" name="udescription" onChange={onChange} style={{height: '80px'}} value={note.udescription}></textarea>
              </div>
              <div className="mb-3">
                  <label htmlFor="utag" className="form-label">Choose A Tag</label>
                  <select className="form-select" aria-label="Default select example" id='utag' name='utag' onChange={onChange} style={{width: '32vw'}} value={note.utag}>
                    <option value="General">GENERAL</option>
                    <option value="Personal">PERSONAL</option>
                    <option value="Work">WORK</option>
                    <option value="School">SCHOOL</option>
                    <option value="Finance">FINANCE</option>
                  </select>
              </div>
              
              <button type="submit" className="btn btn-primary" onClick={handleclick}>Create Note</button>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
          <h2>Your Notes</h2>
          {notes.map((note)=>{
              return <Noteitem key={note._id} updateNote={updateNote} note={note}/>;
          })}
      </div>
    </>
  )
}

export default Notes;