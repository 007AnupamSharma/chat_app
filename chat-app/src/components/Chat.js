import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot,orderBy,query,  serverTimestamp, where} from 'firebase/firestore'
import { auth , db } from '../firebase-config'
import '../styles/Chat.css'

const Chat = (props) => {

    const { room } = props;
    const [newMessage, setMessage] = useState("") 

    const messageRef = collection(db,"messages")
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessages = query(messageRef, where("room","==", room), orderBy("createdAt"))
        const unsubscribe = onSnapshot(queryMessages, (snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages);
        })

        return () => unsubscribe();
      
    }, [])
    

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(newMessage === "") return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,  
        })

        setMessage("");
    }
  return (
    <div className='chat-app'>
        <div className="chat-inner">
            <div className='header'> <h1> Welcome To {room.toUpperCase()} </h1></div>
        <div  className='messages'>
            {messages.map((msg)=> 
            <div className='message' key={msg.id}>
                <span className='user'><strong>{msg.user}</strong></span> {msg.text}</div>
            )}
        </div> 
        <form className='new-messages-form' onSubmit={handleSubmit}>
            <input className='new-message-input' 
            placeholder='Type your message here..' 
            onChange={(e) => setMessage(e.target.value)}
            value={newMessage}/>
            <button className='sendBtn' type='submit' >Send</button>
        </form>
        </div>
    </div>
  )
}

export default Chat