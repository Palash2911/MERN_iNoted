import React, {useContext, useState} from 'react'
import notecontext from "../context/Notes/NoteContext"

const Addnote = () => {
    const cntx = useContext(notecontext);
    const {addnote} = cntx;

    const [note, setNote] = useState({title: "", description: "", tag: "General"});
    const handleclick=(e)=>{
        e.preventDefault()
        addnote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: "General"})
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
              <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter Note Title" value={note.title}/>
          </div>
          <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" placeholder="Enter Note" id="description" name="description" onChange={onChange} style={{height: '80px'}} value={note.description}></textarea>
          </div>
          <div className="mb-3">
              <label htmlFor="tag" className="form-label">Choose A Tag</label>
              <select className="form-select" aria-label="Default select example" name='tag' onChange={onChange} style={{width: '32vw'}}>
                <option value="General">GENERAL</option>
                <option value="Personal">PERSONAL</option>
                <option value="Work">WORK</option>
                <option value="School">SCHOOL</option>
                <option value="Finance">FINANCE</option>
              </select>
          </div> 
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Create Note</button>
          </form>
      </div>
    </div>
  )
}

export default Addnote
