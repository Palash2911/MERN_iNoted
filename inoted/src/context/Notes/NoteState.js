import react from 'react';
import Notecontext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const inotes = []

    const [notes, setNotes] = useState(inotes)

    //FETCH all Notes
    const fetchallnotes= async()=>{
      // API CALL 
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwOGU3N2I1MTg5NjA2ODFjNDE4YTVmIn0sImlhdCI6MTY0NDc1MzUwM30.V22Z4TwCQU_-q4rctJwSk4R8-KGAxBL6iP-TCi8m4eQ' 
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
          "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwOGU3N2I1MTg5NjA2ODFjNDE4YTVmIn0sImlhdCI6MTY0NDc1MzUwM30.V22Z4TwCQU_-q4rctJwSk4R8-KGAxBL6iP-TCi8m4eQ' 
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
          "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwOGU3N2I1MTg5NjA2ODFjNDE4YTVmIn0sImlhdCI6MTY0NDc1MzUwM30.V22Z4TwCQU_-q4rctJwSk4R8-KGAxBL6iP-TCi8m4eQ',
          'Content-Type': 'application/json'
        },
      });
      const newNote = notes.filter((note)=>{return note._id!==id})
      setNotes(newNote)
    }

    // Update a Note
    const updatenote= async(id, title, description, tag)=>{
      // API CALL 
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwOGU3N2I1MTg5NjA2ODFjNDE4YTVmIn0sImlhdCI6MTY0NDc1MzUwM30.V22Z4TwCQU_-q4rctJwSk4R8-KGAxBL6iP-TCi8m4eQ',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, description, tag})
      });
      
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