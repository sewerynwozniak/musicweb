import { addDoc, collection } from 'firebase/firestore/lite';
import {db} from '../firebase'
import React,{useState} from 'react'




const AddMusic = ({newSong}) => {


    const songCollecionRef = collection(db, 'Song');
    const [musicInputs, setMusicInputs] = useState({})


    
    const updateInput = (e)=>{
        const {name, value} = e.target;
      
        setMusicInputs({...musicInputs, [name]: value})

    }
    const submitMusic = async (e)=>{
        e.preventDefault();
        await addDoc(songCollecionRef, musicInputs)
        await newSong();
    }


  return (
    <div>
        <form onSubmit={submitMusic}>
            <input type="text" onChange={updateInput} name="name" placeholder='name' />
            <input type="text" onChange={updateInput} name="artist" placeholder='artist' />
            <input type="submit" value="Add" />
        </form>
    </div>
  )
}

export default AddMusic

