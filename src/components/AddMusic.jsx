import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import {db} from '../firebase'
import React,{useEffect, useState} from 'react'
import Autocomplete from './Autocomplete';
import starGrey from '../../src/assets/star-grey.png'
import starGold from '../../src/assets/star-gold.png'



const AddMusic = ({newSong}) => {



    const songCollecionRef = collection(db, 'Song');
    const artistCollecionRef = collection(db, 'Artist');
    const [musicInputs, setMusicInputs] = useState({name:'', artist:'', rating:5})
    const [artists, setArtists] = useState()
    const [showAutoSuggestion, setAutoSuggestion] = useState(false)
    const starsArray = Array.from({length: 10}, (_, i) => null);
    const [rating, setRating]= useState(0)
    const [highlighted, setHighlighted]= useState(null)
    
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
                <div  
                    onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setAutoSuggestion(false);
                        }
                      }}
                                                   
                    onChange={()=>setAutoSuggestion(true)}                                
                    className="addMusic__inputWrapper">

                    <input type="text" autoComplete="off"
                        onFocus={()=>setAutoSuggestion(true)} 
                        onChange={(e)=> updateInput(e)}                    
                        name="artist" placeholder='artist' value={musicInputs.artist}                       
                    />

                    {showAutoSuggestion && <Autocomplete musicInputs={musicInputs} artists={artists} setMusicInputs={setMusicInputs} setAutoSuggestion={setAutoSuggestion}/>}
                
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

