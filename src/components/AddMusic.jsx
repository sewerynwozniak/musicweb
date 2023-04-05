import { addDoc, collection } from 'firebase/firestore/lite';
import {db} from '../firebase'
import React,{useState} from 'react'


const AddMusic = () => {

    const songCollecionRef = collection(db, 'Song');
    const [musicInput, setMusicInput] = useState('')
    const [newMusic, setNewMusic] = useState('')

    

    const updateInput = (e)=>{
        setMusicInput(e.target.value)
    }
    const submitMusic = async (e)=>{
        e.preventDefault();
        console.log(musicInput)
        await addDoc(songCollecionRef, {name: musicInput})
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