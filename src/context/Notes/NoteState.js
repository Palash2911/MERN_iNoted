import Notecontext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const host = "https://mern-inoted.herokuapp.com"
    const inotes = []

    const [notes, setNotes] = useState(inotes)

    //FETCH all Notes
    const fetchallnotes= async()=>{
      // API CALL 
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token') 
        },
      });
      const json = await response.json();
      setNotes(json);
    }

    //Add a Note
    const addnote= async(title, description, tag)=>{
      // API CALL 
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token') 
        },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note))
    }

    // Delete a Note
    const deletenote= async(id)=>{// API CALL 
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          "auth-token": localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      console.log(json)
      
      const newNote = notes.filter((note)=>{return note._id!==id})
      setNotes(newNote)
    }

    // Update a Note
    const updatenote= async(id, title, description, tag)=>{
      // API CALL 
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          "auth-token": localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      console.log(json)
      
      let updatednote = JSON.parse(JSON.stringify(notes))
      //Find and update Note
      for (let index = 0; index < updatednote.length; index++) {
        const element = updatednote[index];
        if(element._id===id)
        {
          updatednote[index].title=title;
          updatednote[index].description=description;
          updatednote[index].tag=tag;
          break;
        }    
      }
      setNotes(updatednote)
    }

    // Boilerplate whenever using context
    return (
        <Notecontext.Provider value={{notes, addnote, deletenote, updatenote, fetchallnotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;