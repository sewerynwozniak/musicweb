import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import AddMusic from './AddMusic';
import Music from './Music';
import Sort from './Sort';




const Musics = () => {


  const [songs, setSongs] = useState([])
  const [newSong, setNewSong] = useState(false)
  const [sortType, setSortType] = useState('title')
  const songCollecionRef = collection(db, 'Song');


  useEffect(()=>{

    const getSongs = async ()=>{
      const data = await getDocs(songCollecionRef)
      setSongs(data.docs.map(doc => ({id:doc.id, ...doc.data()})
      ))

    } 


    getSongs()

  },[newSong])


  //display sorted songs after setting sortType
  useEffect(()=>{

    sortFunc(sortType)

  },[sortType])



  const sortFunc = ()=>{

    const sortedSongs = songs.sort((a, b) => {
      if (sortType === 'title') {
        return a.name.localeCompare(b.name);
      } else if (sortType === 'artist') {
        return a.artist.localeCompare(b.artist);
      } else if (sortType === 'rating') {
        return b.rating - a.rating;
      }
    });


    setSongs([...sortedSongs])
  } 



  let songsArray = songs.map(song=>(

      <Music        
          key={song.id}  
          href=""
          song={song}
      />      
   
  ))



  
  
  return (
    
    <div className='musics'>

        <AddMusic newSong={()=>setNewSong(true)}/>
        <Sort sortFuncProp={(sortProp)=>setSortType(sortProp)}/>

        <p className='musics__headline'>List</p>
    
        <ul className='musics__ul'> 
          {songsArray}
        </ul> 

     </div>
  )
}

export default Musics