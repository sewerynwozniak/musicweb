import React, {useState} from 'react'
import {db} from '../firebase'
import { updateDoc, doc } from 'firebase/firestore/lite';
import starGrey from '../../src/assets/star-grey.png'
import starGold from '../../src/assets/star-gold.png'
import trashBin from '../../src/assets/trash.png'

const Music = ({song, deleteSong}) => {


    const [rating, setRating]= useState(song.rating)
    const [highlighted, setHighlighted]= useState(null)
    const starsArray = Array.from({length: 10}, (_, i) => null);



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
      await updateDoc(doc(db, 'Song', song.id), {rating: starIndex});
  
    }





  return (
    <li
        data-id={song.id}
    >
        
     {song.name}      
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

          <button className="musics__deleteBtn" onClick={()=>deleteSong(song.id)}>
            <img src={trashBin} alt="" />
          </button>

    </li>
  )
}

export default Music