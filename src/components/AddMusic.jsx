import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import {db} from '../firebase'
import React,{useEffect, useState} from 'react'




const AddMusic = ({newSong}) => {



    const songCollecionRef = collection(db, 'Song');
    const artistCollecionRef = collection(db, 'Artist');
    const [musicInputs, setMusicInputs] = useState({name:'', artist:''})
    const [artists, setArtists] = useState()
    const [showAutoSuggestion, setAutoSuggestion] = useState(false)

    
    const updateInput = (e)=>{
      
        const {name, value} = e.target;
        setMusicInputs({...musicInputs, [name]: value})

    }

    const submitMusic = async (e)=>{
        e.preventDefault();
       
        if(musicInputs.artist=='' || musicInputs.name=='') return
        console.log('wykonujemy')
        await addDoc(songCollecionRef, musicInputs)
        await newSong();
    }



 


    useEffect( ()=>{

       const getArtists = async ()=>{
        const artistData = await getDocs(artistCollecionRef)
        setArtists(artistData.docs.map(doc => ({id:doc.id, ...doc.data()})))
        
       }
       
       getArtists()

      
    },[])


    useEffect( ()=>{

      
       
     },[artists])


    const demoFunc = (e)=>{
        e.presist()
        console.log('dd')
    }





    const showAutoSuggestionFunction=()=>{

        const inputArtist = musicInputs.artist?.toLowerCase()
        const filteredArists = artists?.filter(artist=>artist.name.toLowerCase().includes(inputArtist))


        return(
            <ul>
                {filteredArists && filteredArists.map(artist=>(
                     <li onClick={()=>setMusicInputs(prev=>({...prev, artist:artist.name}))} key={artist.id}>{artist.name}</li>
                ))}

               
                
            </ul>
        )
    }



  return (
    <div>
        <form className='addMusic__form' onSubmit={submitMusic}>


            <div className="addMusic__inputsWrapper">

                <div className="addMusic__inputWrapper">
                    <input type="text"                  
                        onChange={(e)=>{
                            updateInput(e); 
                        }} 
                            name="name" 
                            placeholder='name' 
                    />
                    </div>
                <div tabIndex={0} 
                        onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                              setAutoSuggestion(false);
                            }
                          }}
                        onFocus={()=>setAutoSuggestion(true)}                                
                        className="addMusic__inputWrapper">

                    <input type="text"    autoComplete="off"
                        onChange={(e)=> updateInput(e)}                    
                        name="artist" placeholder='artist' value={musicInputs.artist}                       
                    />

                    {showAutoSuggestion && showAutoSuggestionFunction()}
                
                </div>

                 

            </div>
          

            <input type="submit" value="Add" />
            
        </form>



    </div>
  )
}

export default AddMusic

