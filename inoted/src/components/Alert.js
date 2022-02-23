import React from 'react'

function Alert(props) {

    const capitalize = (word)=>{
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style={{height: '50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show my-1 mx-2`} role="alert" style={{width: 400}}>
          <strong>{capitalize(props.alert.type)}</strong>:  {props.alert.mssg}
      </div>}
    </div>
  )
}
export default Alert