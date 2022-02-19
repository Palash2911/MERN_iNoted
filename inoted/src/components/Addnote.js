import React, {useContext, useState} from 'react'
import notecontext from "../context/Notes/NoteContext"

const Addnote = () => {
    const cntx = useContext(notecontext);
    const {addnote} = cntx;
    const [note, setNote] = useState({title: "", description: "", tag: "default"});
    const handleclick=(e)=>{
        e.preventDefault()
        addnote(note.title, note.description, note.tag)
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
       <div className="container my-4" style={{width: '60%', textAlign: 'start'}}>
            <h2>Add A Note :)</h2>
            <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter Note Title"/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" placeholder="Enter Note" id="description" name="description" onChange={onChange} style={{height: '80px'}}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleclick}>Create Note</button>
            </form>
      </div>
    </div>
  )
}

export default Addnote
