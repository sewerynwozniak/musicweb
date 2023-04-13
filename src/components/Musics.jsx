import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import AddMusic from './AddMusic';
import starGrey from '../../src/assets/star-grey.png'
import starGold from '../../src/assets/star-gold.png'


const Musics = () => {



  const [songs, setSongs] = useState([])
  const [newSong, setNewSong] = useState(false)
  const songCollecionRef = collection(db, 'Song');

  useEffect(()=>{


    const getSongs = async ()=>{
      const data = await getDocs(songCollecionRef)
      setSongs(data.docs.map(doc => ({id:doc.id, ...doc.data()})
      ))

    } 

    getSongs()

  },[newSong])


  let starsArray = Array.from({length: 10}, (_, i) => i + 1);


  const highlightingStars = (e)=>{

    const starIndex = e.target.dataset.index
    const parent = e.target.parentElement
    const selectedStars = parent.querySelectorAll(`:nth-child(n+1):nth-child(-n+${starIndex})`);
    const selectedStarsArray = Array.from(selectedStars);  
    selectedStarsArray.forEach(el=>el.src=starGold)

  }
  const unhighlightingStars = (e)=>{

    const parent = e.target.parentElement
    const selectedStarsArray = Array.from(parent.children);
    selectedStarsArray.forEach(el=>el.src=starGrey)

  }
  const selectingStar = async (e)=>{

    const songId = e.target.parentElement.parentElement.dataset.id;
    const starIndex = Number(e.target.dataset.index);
    await updateDoc(doc(db, 'Song', songId), {rating: starIndex});

  }



  let songsArray = songs.map(song=>(
    <li 
        data-id={song.id}
        href=""
      >
        

      {song.name}      
      <div className="musics__starsWrapper">
        {starsArray.map(star=>(
          <img 
            onMouseOver={e=>highlightingStars(e)}
            onMouseLeave={e=>unhighlightingStars(e)}
            onClick={e=>selectingStar(e)}
            className='musics__star' 
            data-index={star} 
            src={starGrey} alt="" 
          />
        ))}
      </div>
    
    </li>
  ))
  
  return (
    
    <div className='musics'>

        <AddMusic newSong={()=>setNewSong(true)}/>

        <p className='musics__headline'>List</p>
    
        <ul className='musics__ul'> 
          {songsArray}
        </ul> 





     </div>
  )
}

export default Musics