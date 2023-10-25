import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import {db} from '../firebase'
import React,{useEffect, useState} from 'react'




const AddMusic = ({newSong}) => {



    const songCollecionRef = collection(db, 'Song');
    const artistCollecionRef = collection(db, 'Artist');
    const [musicInputs, setMusicInputs] = useState({})
    const [artists, setArtists] = useState()


    
    const updateInput = (e)=>{
      
        const {name, value} = e.target;
        setMusicInputs({...musicInputs, [name]: value})

    }

    const submitMusic = async (e)=>{
        e.preventDefault();
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



    // useEffect(() => {
    //     console.log(artists); // Print the artists when it changes
    //   }, [artists]);

    

    const autoSuggestion=(e)=>{



    //   console.log(e.target.value)
      
    //   console.log(artists.name)
    }

    const showAutoSuggestion=()=>{

   
        const inputArtist = musicInputs.artist?.toLowerCase()
        //const arrayOfArtists = artists?.map(artist=>artist.name.toLowerCase())
        
        const filteredArists = artists?.filter(artist=>artist.name.toLowerCase().includes(inputArtist))

        
        console.log(inputArtist)
        // console.log(arrayOfArtists)
        console.log(filteredArists)

        return(
            <ul>
                {filteredArists && filteredArists.map(artist=>(
                    <li key={artist.id}>{artist.name}</li>
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
                <div className="addMusic__inputWrapper">

                <input type="text"    
                onChange={(e)=>{autoSuggestion(e); updateInput(e)}}  
                name="artist" placeholder='artist' 
                />

                {showAutoSuggestion()}
                
                </div>

            </div>
          

            <input type="submit" value="Add" />

        </form>
    </div>
  )
}

export default AddMusic

