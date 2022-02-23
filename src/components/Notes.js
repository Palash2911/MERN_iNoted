import React from 'react'
import Addnote from './Addnote'


const Notes = (props)=>{
  const {showAlert} = props;
  return (
    <>
      <Addnote showAlert={showAlert}/>
    </>
  )
}

export default Notes;