import './LoginPage.scss'
import React, { FormEvent, useContext } from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { Links } from "../../utils";
import { useNavigate } from "react-router-dom";
import { WindowContext } from "../../Contexts/WindowContext";
import { UserContext } from "../../Contexts/UserContext";
import { Button } from '@mui/material';

const LoginPage = () => {
  const { clientWidth } = useContext(WindowContext);
  const { loggedIn } = useContext(UserContext);
  const navigator = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth();

  let widthToSet = clientWidth <= 850 ? "95%" : "700px"; 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, username, password)
    .then((cred) => {
      setError('');
      setUsername('');
      setPassword('');
      window.scrollTo(0,0);
      navigator(Links.Home);
    })
    .catch((err) => {
      setPassword('');
      setError('Login failed, please try again');
      console.log(err);
    })
  }

  const handleLogout = () => {
    signOut(auth)
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="login-page">
      {!loggedIn && <form className="form" style={{width: widthToSet}} onSubmit={ handleSubmit }>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="username">Username</label>
          <input
            data-cy='username-input'
            name='username'
            id='username'
            type='text'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
          </input>
          <label htmlFor="password">Password</label>
          <input
            data-cy='password-input'
            name='password'
            id='password'
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}>
          </input>
          <p data-cy="login-error-message" className="error-message">{ error }</p>
          <div className="form-button">
            <Button data-cy="login-submit" variant="contained" color="darkBlue" type="submit">Login</Button>
          </div>
        </fieldset>
      </form>}
      {loggedIn && <Button variant="contained" color="darkBlue" onClick={ handleLogout }>Logout</Button>}
      
    </div>
  );
}
 
export default LoginPage;