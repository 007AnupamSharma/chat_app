import React from 'react'
import { auth, provider } from '../firebase-config.js'
import { signInWithPopup} from 'firebase/auth';
import Cookies  from 'universal-cookie'
import '../styles/Auth.css'
const cookies = new Cookies();

const Auth = (props) => {

    const { setIsAuth } = props;
    const signInWithGoogle = async()=>{
        try{
        const result = await signInWithPopup(auth, provider);
        setIsAuth(true);
        cookies.set("auth-token", result.user.refreshToken);
        }
        catch(err){
            console.log(err);
        }
    }


    return (
        <>
        {/* <div className='auth'>
            <div className="auth-box">
            <p>Sign in with Google to Continue </p>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            </div>
        </div> */}
        <div className="wrapper fadeInDown">
        <div id="formContent">
         
            <h2 className="active"> Sign In </h2>
            {/* <h2 className="inactive underlineHover">Sign Up </h2> */}


            <div className="fadeIn first">
            {/* <img src="../images/user2.png" alt="user " srcset="" /> */}
            </div>

   
            <div>
            {/* <input type="text" id="login" className="fadeIn second" name="login" placeholder="login"/>
            <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"/> */}
            <p>Sign in with Google to Continue </p>
            <button className=' btn' onClick={signInWithGoogle}>Sign In With Google</button>
  
            </div>

       
            <div id="formFooter">
            <a className="underlineHover" href="#">end-to-end encrypted</a>
            </div>

                
            </div>
            </div>
        </> 
    )
};

export default Auth