import './App.css';
import {useState, useRef} from 'react'
import Auth from './components/Auth';
import Cookies  from 'universal-cookie'
import Chat from './components/Chat';

import { signOut } from 'firebase/auth' 
import { auth } from './firebase-config'

const cookies = new Cookies();


function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null)


  const onSignOut = async ()=>{
    await signOut(auth);
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  const roomInput = useRef(null);
  if(!isAuth){
  return (
    <>
      <Auth setIsAuth={setIsAuth} />
    </>
  );
  }

  return (
    <>  
      {room ? 
      <Chat room={room}/>
       : 
      <div className="room">
        <div className="container">
          <label> Enter Room No: </label>
          <input ref={roomInput}/>
          <button onClick={(e) => setRoom(roomInput.current.value)}>Enter Chat</button>
        </div>
      </div> 
      }

      <div className='sign-out'>
        <button onClick={onSignOut}>Sign Out</button>
      </div>
    </>
  )
}

export default App;
