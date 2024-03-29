import { addDoc, collection, getDocs, deleteDoc } from 'firebase/firestore/lite';
import {db} from '../firebase'
import React,{useEffect, useState} from 'react'
import Autocomplete from './Autocomplete';
import starGrey from '../../src/assets/star-grey.png'
import starGold from '../../src/assets/star-gold.png'
import { usePopupContext } from '../contexts/PopupContext';


const AddMusic = ({newSong, songs}) => {



    const songCollecionRef = collection(db, 'Song');
    const artistCollecionRef = collection(db, 'Artist');
    const [musicInputs, setMusicInputs] = useState({name:'', artist:'', rating:0})
    const [artists, setArtists] = useState()
    const [showAutoSuggestion, setAutoSuggestion] = useState(false)
    const starsArray = Array.from({length: 10}, (_, i) => null);
    const [rating, setRating]= useState(0)
    const [highlighted, setHighlighted]= useState(null)
    const { showPopup, setShowPopup, showPopupWithTimeout } = usePopupContext()


    const inputArtist = musicInputs.artist?.toLowerCase()
    const filteredArists = artists?.filter(artist=>artist.name.toLowerCase().includes(inputArtist))


    
    const updateInput = (e)=>{   
        const {name, value} = e.target;
        setMusicInputs({...musicInputs, [name]: value})

    }

    const submitMusic = async (e)=>{
        e.preventDefault();
      
        if(musicInputs.artist=='' || musicInputs.name=='') return     
        const isDuplicate = await checkIfDuplicate(musicInputs.name)
        if(isDuplicate){ 
            showPopupWithTimeout('This song has been already added')
            return
        }

        await addDoc(songCollecionRef, musicInputs)
        await newSong();
    }

    const checkIfDuplicate= async (newSong)=>{
   
       const alreadyAdded = songs.find(song=>song.name.toUpperCase()==newSong.toUpperCase())
       return Boolean(alreadyAdded)
    }




 


    useEffect( ()=>{

       const getArtists = async ()=>{
        const artistData = await getDocs(artistCollecionRef)
        setArtists(artistData.docs.map(doc => ({id:doc.id, ...doc.data()})))
        
       }
       
       getArtists()

    },[])

    useEffect( ()=>{
        setMusicInputs(prev=>({...prev, rating:rating}))
    },[rating])




    const highlightingStars = (e)=>{
        const starIndex = e.target.dataset.index
        setHighlighted(starIndex)
    }

    const unhighlightingStars = (e)=>{
        setHighlighted(null)
    }

    const selectingStar = async (e)=>{
      const starIndex = Number(e.target.dataset.index);
      setRating(starIndex)   
    }


    const handleShowingAutoSuggestion = ()=>{
        if(filteredArists?.length){
            setAutoSuggestion(true)
        }else{
            setAutoSuggestion(false)
        }

    }


  

  return (
    <div>
        <form className='addMusic__form' onSubmit={submitMusic}>


            <div className="addMusic__inputsWrapper">

                <div className="addMusic__inputWrapper">
                    <input type="text" required                
                        onChange={(e)=>{
                            updateInput(e); 
                        }} 
                            name="name" 
                            placeholder='name' 
                    />
                </div>
                <div  
                    onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            setAutoSuggestion(false);
                        }
                    }}
                                                                                 
                    onChange={handleShowingAutoSuggestion}                                
                    className="addMusic__inputWrapper">

                    <input type="text" required autoComplete="off"
                        onFocus={handleShowingAutoSuggestion} 
                        onChange={(e)=> updateInput(e)}                    
                        name="artist" placeholder='artist' value={musicInputs.artist}                       
                    />

                    {showAutoSuggestion && 

                    <Autocomplete 
                        musicInputs={musicInputs} 
                        artists={artists} 
                        setMusicInputs={setMusicInputs} 
                        setAutoSuggestion={setAutoSuggestion}
                        submitMusic={submitMusic}
                        filteredArists={filteredArists}
                    />}
                
                </div>
                
            </div>
          

            <div className="musics__starsWrapper">
                {starsArray.map((_, i)=>(
                  <img 
                    key={i+1}
                    onMouseOver={e=>highlightingStars(e)}
                    onMouseLeave={e=>unhighlightingStars(e)}
                    onClick={e=>selectingStar(e)}
                    className='musics__star' 
                    data-index={i+1} 
                    data-selected={i==rating?true:false}
                    src={i<(highlighted||rating)?starGold:starGrey} alt="" 
                  />
                ))}
            </div> 


            <input className='button' type="submit" value="Add" />
            
        </form>



    </div>
  )
}

export default AddMusic

