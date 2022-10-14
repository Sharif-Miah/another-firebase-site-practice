
import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './component/firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)


function App() {
  const [user, setUser] = useState({})

  const googleProvider = new GoogleAuthProvider()
  const handleGoogleProvider = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUser(user)
      })
      .catch(error => {
        console.error('Error', error);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(() => {
        setUser({})
      })
  }

  return (
    <div className="App">

      <h1>Hello world</h1>

      {
        user.uid ?
          <button onClick={handleSignOut}> Sign Out</button>
          :
          <button onClick={handleGoogleProvider}>Sign In</button>
      }
      {
        user.uid && <div>
          <h3>Name: {user.displayName}</h3>
          <p>Email: {user.email}</p>
        </div>
      }

    </div>
  );
}

export default App;
