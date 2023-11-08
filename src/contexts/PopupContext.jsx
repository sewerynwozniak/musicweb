import React, { createContext, useContext, useEffect, useRef, useState } from 'react';


const PopupContext = createContext();

export function usePopupContext(){
    return useContext(PopupContext)
}


const PopupProvider = ({children}) => {


    const [showPopup, setShowPopup] = useState(false)
    const [message, setMessage] = useState('')

    
    const timeoutRef = useRef(null)


    const showPopupWithTimeout = (message) => {
      setShowPopup(true);
      setMessage(message);
    
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    
      timeoutRef.current = setTimeout(() => {
        setShowPopup(false);
        setMessage('');
      }, 2000);
    };
  



  return (
    <PopupContext.Provider value={{showPopup, showPopupWithTimeout, message}}>
        {children}
    </PopupContext.Provider>
  )
}

export default PopupProvider