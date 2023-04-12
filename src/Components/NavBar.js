import { Link, useHistory } from "react-router-dom";
import { Links, checkLoggedIn } from "../utils";
import { useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = ({ title, items }) => {
  const [loggedIn, setLoggedIn] = useState(checkLoggedIn());
  const auth = getAuth();
  const history = useHistory();
  const isMobile = window.visualViewport.width <= 1200;

  const handleLogin = (e) => {
    history.push(Links.Login);
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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  })

  const renderLoginPart = () => {
    if (loggedIn) {
      return <button className="button-primary" onClick={ handleLogout }>Logout</button>;
    } else {
      return <button className="button-primary" onClick={ handleLogin }>Login</button>;
    }
  }

  const renderFullMode = () => {
    return <nav className="navbar-full">
      <h1>{ title }</h1>
      <span className="links">
        <span>
          {items.map((item) => (
            <span className="item" key={ item.name }>
              <Link to={ item.link }>{ item.name }</Link>
            </span>
          ))}
        </span>
        <span>
            {renderLoginPart()}
        </span>
      </span>
    </nav>
  }

  const renderMobileModeLinks = () => {
    const subItems = items.splice(0, 4);
    return (
      <div className="split-links">
        <div>
          {subItems.map((item) => (
            <span className="item" key={ item.name }>
              <Link to={ item.link }>{ item.name }</Link>
            </span>
          ))}
        </div>
        <div>
          {items.map((item) => (
            <span className="item" key={ item.name }>
              <Link to={ item.link }>{ item.name }</Link>
            </span>
          ))}
        </div>
      </div>
    )
  }

  const renderMobileMode = () => {
    return <nav className="navbar-mobile">
      <div style={{display: "flex", justifyContent: "flex-start", marginBottom: "10px", alignItems: "center"}}>
        <h1 style={{flex: "0 1 auto", left: "50%", transform: "translateX(-50%)", position: "absolute"}}>{ title }</h1>
        <span style={{flex: "0 1 auto", marginLeft: "auto"}}>
          {renderLoginPart()}
        </span>
      </div>
      <div className="links">
        { renderMobileModeLinks() }
      </div>
    </nav>
  }
  

  return ( 
    <nav className="navbar">
      {!isMobile && renderFullMode()}
      {isMobile && renderMobileMode()}
    </nav>    
  );
}
 
export default Navbar;