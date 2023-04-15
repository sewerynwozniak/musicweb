import React, {useState} from 'react'
import {db} from '../firebase'
import { updateDoc, doc } from 'firebase/firestore/lite';
import starGrey from '../../src/assets/star-grey.png'
import starGold from '../../src/assets/star-gold.png'

const Music = ({song}) => {


    const [rating, setRating]= useState(song.rating)
    const [highlighted, setHighlighted]= useState(null)
    let starsArray = Array.from({length: 10}, (_, i) => null);



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

    </li>
  )
}

export default Music