import React, { useEffect, useState } from 'react'

const Autocomplete = ({musicInputs, artists, setMusicInputs, setAutoSuggestion}) => {


    const [currentFocused, setCurrentFocused] = useState(2)

    const handleKeyboard =(e)=>{
    
        if(e.key=='Escape'){
            setAutoSuggestion(false)
        }else if(e.key=='Enter'){ 
            e.preventDefault()
            setMusicInputs(prev=>({...prev, artist:filteredArists[currentFocused].name}))
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

    },[currentFocused])


    const inputArtist = musicInputs.artist?.toLowerCase()
    const filteredArists = artists?.filter(artist=>artist.name.toLowerCase().includes(inputArtist))


  


    return(
        <ul>
            {filteredArists && filteredArists.map((artist, index)=>(
                  <li className={`${index==currentFocused && 'addMusic__currectFocus'}`} key={artist.id} onMouseDown={()=>setMusicInputs(prev=>({...prev, artist:artist.name}))}>{artist.name}</li>
           
            ))}
  
        </ul>
    )



}

export default Autocomplete