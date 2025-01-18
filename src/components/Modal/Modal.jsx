import React from 'react'
import './Modal.css'

const Modal = ({children, funct}) => {
  return (
    <div className='modal'>
        <div className="modal-body">
          <button onClick={funct}>X</button>
          {children}
        </div>
    </div>
  )
}

export default Modal