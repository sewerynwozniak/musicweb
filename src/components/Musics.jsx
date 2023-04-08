import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import { collection, getDocs  } from 'firebase/firestore/lite';
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


  
  return (
    
    <div className='musics'>

        <AddMusic newSong={()=>setNewSong(true)}/>

        <p className='musics__headline'>List</p>
    
        <ul className='musics__ul'> 
          {songs.map(song=>{
           return(

            <li 
             
              href="">

              {song.name}      
              <div className="musics__starsWrapper">
                {starsArray.map(star=>(
                  <img 
                    onMouseOver={e => e.target.src=starGold}
                    onMouseLeave={e => e.target.src=starGrey}
           
                    className='musics__star' 
                    data-index={star} 
                    src={starGrey} alt="" 
                  />
                ))}
              </div>
              
            </li>

           )
          })}
        </ul> 
     </div>
  )
}

export default Musics