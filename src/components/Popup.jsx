import React from 'react'
import { usePopupContext } from '../contexts/PopupContext'

const Popup = ({}) => {

    const { showPopup, message } = usePopupContext()
   

  return (
    <div className={`popup ${showPopup && 'popup--show'}`}>
        <p>{message}</p>
    </div>
  )
}

export default Popup