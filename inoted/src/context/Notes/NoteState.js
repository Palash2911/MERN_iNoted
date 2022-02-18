import react from 'react';
import Notecontext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{

    const inotes = [
        {
          "_id": "620cefd0de12518b9fe440a7",
          "user": "6208e77b518960681c418a5f",
          "title": "My WakeUp Alarm",
          "description": "Wake Up Early My Buddy",
          "tag": "Personel",
          "date": "2022-02-16T12:36:32.936Z",
          "__v": 0
        },
        {
          "_id": "620cf35ffcc1f4b0542565e3",
          "user": "6208e77b518960681c418a5f",
          "title": "My WakeUp Call",
          "description": "UTH JAA BSDK",
          "tag": "Personel",
          "date": "2022-02-16T12:51:43.156Z",
          "__v": 0
        }
      ]

    const [notes, setnotes] = useState(inotes)
    // Boilerplate whenever using context

    return (
        <Notecontext.Provider value={{notes, setnotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;