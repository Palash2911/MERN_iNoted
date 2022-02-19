import react from 'react';
import Notecontext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{

    const inotes = [
        {
          "_id": "620cefd0de12518b96fe440a7a",
          "user": "6208e77b518960681c418a5f",
          "title": "Alarm",
          "description": "Wake Up Early My Buddy",
          "tag": "Personel",
          "date": "2022-02-16T12:36:32.936Z",
          "__v": 0
        },
        {
          "_id": "620cf35ffcc13f4b0542565de3",
          "user": "6208e77b518960681c418a5f",
          "title": "My WakeUp Call",
          "description": "UTH JAA BSDK",
          "tag": "Personel",
          "date": "2022-02-16T12:51:43.156Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(inotes)

    //Add a Note
    const addnote=(title, description, tag)=>{
      const note=[
        {
          "_id": "620cf35ffcc1f4b0542565ee3",
          "user": "6208e77b518960681c418a5f",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-02-16T12:51:43.156Z",
          "__v": 0
        }
      ];
      console.log(note)
        setNotes(notes.concat(note))
    }
    // Delete a Note
    const deletenote=(id)=>{
      const newNote = notes.filter((note)=>{return note._id!==id})
      setNotes(newNote)
    }
    // Update a Note
    const updatenote=(id, title, description, tag)=>{
      
    }

    // Boilerplate whenever using context
    return (
        <Notecontext.Provider value={{notes, addnote, deletenote, updatenote}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;