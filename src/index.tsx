import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { WindowContextProvider } from './Contexts/WindowContext';

const firebaseConfig = {
  apiKey: "AIzaSyDGQewygLjxidHX8N-sWkD8fcqgqvjK4H8",
  authDomain: "cv-website-e25d6.firebaseapp.com",
  projectId: "cv-website-e25d6",
  storageBucket: "cv-website-e25d6.appspot.com",
  messagingSenderId: "482668651667",
  appId: "1:482668651667:web:973685e0d17d662b401966",
  measurementId: "G-02B0Y9RRTP"
};

document.title = 'Dan Turner CV Website';
const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContextProvider>
      <App />
    </WindowContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

initializeApp(firebaseConfig);
