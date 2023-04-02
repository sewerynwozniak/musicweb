import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import { collection, getDocs  } from 'firebase/firestore/lite';


const Musics = () => {


  const [songs, setSongs] = useState([])
  const songCollecionRef = collection(db, 'Song');

  useEffect(()=>{


    const getSongs = async ()=>{
      const data = await getDocs(songCollecionRef)
      setSongs(data.docs.map(doc => ({id:doc.id, ...doc.data()})
      ))

    } 

    getSongs()

  },[])

  
  return (
    
    <div>
        <p>List</p>
        {songs.map(song=>{
         return(
          <a href="">{song.name}</a>
         )
        })}

     </div>
  )
}

export default Musics