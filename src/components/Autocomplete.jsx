import React, { useEffect, useState } from 'react'

const Autocomplete = ({musicInputs, artists, setMusicInputs, setAutoSuggestion, submitMusic, filteredArists}) => {


    

    const [currentFocused, setCurrentFocused] = useState(-1)

    const handleKeyboard =(e)=>{
    
       

        if(e.key=='Escape'){
            setAutoSuggestion(false)
        }else if(e.key=='Enter'){ 
            e.preventDefault()
            //if any suggestion from autocomplete is selected, add it to musicInputs state, else add new artist
            if(currentFocused>-1){
                setMusicInputs(prev=>({...prev, artist:filteredArists[currentFocused].name}))
            }
            setAutoSuggestion(false)
        }else if(e.key=='ArrowUp'){
            if(currentFocused<=-1){
                setCurrentFocused(filteredArists?.length-1)
            }else{
                setCurrentFocused(prev=>prev-1)
            }
        }else if(e.key=='ArrowDown'){
            if(currentFocused>=filteredArists?.length-1){
                setCurrentFocused(-1)
            }else{
                setCurrentFocused(prev=>prev+1)
            }
        }

    }


    useEffect(()=>{
        document.addEventListener('keydown', handleKeyboard)
      
        return ()=>{
            document.removeEventListener('keydown', handleKeyboard)
        } 

    },[currentFocused, musicInputs])




    return(
        <ul>
            {filteredArists && filteredArists.map((artist, index)=>(
                  <li className={`${index==currentFocused && 'addMusic__currectFocus'}`} key={artist.id} onMouseDown={()=>setMusicInputs(prev=>({...prev, artist:artist.name}))}>{artist.name}</li>
           
            ))}
  
        </ul>
    )



}

export default Autocomplete