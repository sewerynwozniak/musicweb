import { addDoc, collection } from 'firebase/firestore/lite';
import {db} from '../firebase'
import React,{useState} from 'react'




const AddMusic = ({newSong}) => {


    const songCollecionRef = collection(db, 'Song');
    const [musicInput, setMusicInput] = useState('')
    const [newMusic, setNewMusic] = useState('')

   

    const updateInput = (e)=>{
        setMusicInput(e.target.value)
    }
    const submitMusic = async (e)=>{
        e.preventDefault();
        await addDoc(songCollecionRef, {name: musicInput})
        await newSong();
    }


  return (
    <div>
        <form onSubmit={submitMusic}>
            <input type="text" onChange={updateInput} value={musicInput} />
            <input type="submit" value="Add" />
        </form>
    </div>
  )
}

export default AddMusic

