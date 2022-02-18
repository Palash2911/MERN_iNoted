import React from 'react'

const Noteitem = (props) => {
    const {note} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title">{note.title}</h5>
                <i className="fas fa-solid fa-trash mx-4"></i>
                <i className="fas fa-solid fa-pen"></i>
            </div>
            <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
