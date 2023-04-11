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

  const renderLoginPart = (item) => {
    if (loggedIn) {
      return <button className="button-primary" onClick={ handleLogout }>Logout</button>;
    } else {
      return <button className="button-primary" onClick={ handleLogin }>Login</button>;
    }
  }

  const renderFullMode = () => {
    return <nav className="navbar-full">
      <h1>{ title }</h1>
      <div className="links">
        {items.map((item) => (
          <span className="item" key={ item.name }>
            {item.name==="Login" && renderLoginPart(item) }
            {item.name!=="Login" && <Link to={ item.link }>{ item.name }</Link> }
          </span>
        ))}
      </div>
    </nav>
  }

  const renderMobileModeLinks = () => {
    const subItems = items.splice(0, 4);
    const loginItem = items.splice(items.length-1, 1);
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
        <div style={{marginTop: "5px"}}>
          {renderLoginPart(loginItem)}
        </div>
      </div>
    )
  }

  const renderMobileMode = () => {
    return <nav className="navbar-mobile">
      <h1 style={{marginBottom: "10px"}}>{ title }</h1>
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