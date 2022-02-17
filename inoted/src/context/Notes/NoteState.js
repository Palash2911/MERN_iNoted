import react from 'react';
import Notecontext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{

    // const s1 = {
    //     "name": "Palash",
    //     "class": "2nd Year"
    // }

    // const [state, setstate] = useState(s1)
    // const update = ()=>{
    //     setTimeout(() => {
    //         setstate({
    //         "name": "Kalu",
    //         "class": "10th"
    //         })
    //     }, 1000);
    // }

    // Boilerplate whenever using context
    return (
        <Notecontext.Provider>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;