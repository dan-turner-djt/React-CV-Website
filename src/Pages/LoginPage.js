import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { Links, checkLoggedIn } from "../utils";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth();

  let widthToSet = window.visualViewport.width < 600 ? "100%" : "600px"; 

  useEffect(() => {
    setLoggedIn(checkLoggedIn());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, username, password)
    .then((cred) => {
      setError('');
      setUsername('');
      setPassword('');
      history.push(Links.Home);
    })
    .catch((err) => {
      setPassword('');
      setError('Login failed, please try again');
      console.log(err);
    })
  }

  const handleLogout = (e) => {
    signOut(auth)
    .then(() => {
      setLoggedIn(false); 
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="login-page">
      {!loggedIn && <form className="form" style={{maxWidth: widthToSet}} onSubmit={ handleSubmit }>
        <fieldset>
          <legend>Login</legend>
          <label>Username</label>
          <input
            name='username'
            type='text'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
          </input>
          <label>Password</label>
          <input
            name='password'
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}>
          </input>
          <p className="error-message">{ error }</p>
          <div className="form-button">
            <button className="button-primary">Login</button>
          </div>
        </fieldset>
      </form>}
      {loggedIn && <button className="button-primary" onClick={ handleLogout }>Logout</button>}
      
    </div>
  );
}
 
export default LoginPage;