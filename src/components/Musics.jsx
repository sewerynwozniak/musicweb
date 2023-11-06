import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, orderBy, deleteDoc } from 'firebase/firestore/lite';
import AddMusic from './AddMusic';
import Music from './Music';
import Sort from './Sort';



const Musics = () => {



  const SortTypeObj = {
    ARTIST: 'artist',
    RATING: 'rating',
    TITLE: 'title',
  };


  const [songs, setSongs] = useState([])
  const [newSong, setNewSong] = useState(false)
  const [sortType, setSortType] = useState(SortTypeObj.ARTIST)
  const [listOfArtists, setListOfArtists] = useState([])
  const songCollecionRef = collection(db, 'Song');
  const artistCollecionRef = collection(db, 'Artist');


  const initialSongQuery = query(songCollecionRef, orderBy('artist'));
  const initialArtistQuery = query(artistCollecionRef);


  


  useEffect(()=>{

    getDocs(initialArtistQuery).then((querySnapshot) => {
      const arrayOfArtists=[]
      querySnapshot.forEach((songDoc) => {
        if (songDoc.exists) {
          // Extract the artist reference
          const artistRef = songDoc.data().name;
          arrayOfArtists.push(artistRef)

        }
      });
     
      

      setListOfArtists(arrayOfArtists)
    });

  },[songs])


  useEffect(()=>{

    const getSongs = async ()=>{

      const data = await getDocs(initialSongQuery)
      setSongs(data.docs.map(doc => ({id:doc.id, ...doc.data()})))

    } 

    getSongs()

  },[newSong])



  //display sorted songs after setting sortType
  useEffect(()=>{

    sortFunc(sortType)

  },[sortType])



  const sortFunc = ()=>{

   
    const sortedSongs = songs.sort((a, b) => {
      if (sortType === SortTypeObj.TITLE) {
        return a.name.localeCompare(b.name);
      } else if (sortType === SortTypeObj.ARTIST) {
        console.log('aaaa', a)
        console.log('bbbb', b)
        //return a.artist.localeCompare(b.artist);
      } else if (sortType === SortTypeObj.RATING) {
        return b.rating - a.rating;
      }
    });


    setSongs([...sortedSongs])
  } 


  const deleteSong = async (documentId) => {

    try {
      const docRef = doc(db, 'Song', documentId);
      await deleteDoc(docRef);
      setSongs(prev=>prev.filter(song=>song.id!=documentId))
      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };



  let songsArray = songs.map(song=>(

      <Music        
          key={song.id}  
          href=""
          song={song}
          deleteSong={deleteSong}
      />      
   
  ))



   
  
  return (
    
    <div className='musics'>

        <AddMusic newSong={()=>setNewSong(true)} songs={songs}/>
        <Sort sortFuncProp={(sortProp)=>setSortType(sortProp)}/>

        <p className='musics__headline'>List</p>
    
        <ul className='musics__ul'> 
          {songsArray}
        </ul> 




     </div>
  )
}

export default Musics