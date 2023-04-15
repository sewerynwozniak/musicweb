import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import AddMusic from './AddMusic';
import Music from './Music';



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





  let songsArray = songs.map(song=>(

    <ul>
      <Music          
          href=""
          song={song}
      />      
    </ul>

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