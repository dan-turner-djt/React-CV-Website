import './NavBar.scss';
import React, { useContext } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Links } from "../../utils";
import { Auth, getAuth, signOut } from "firebase/auth";
import { WindowContext, WindowContextProps } from "../../Contexts/WindowContext";
import { UserContext, UserContextProps } from "../../Contexts/UserContext";

export type NavbarProps = {
  title: string;
  items: {name: string, link: string}[];
}

const Navbar = (props: NavbarProps) => {
  const { clientHeight, clientWidth } = useContext<WindowContextProps>(WindowContext);
  const { loggedIn } = useContext<UserContextProps>(UserContext);
  const auth: Auth = getAuth();
  const isMobile: boolean = clientHeight > clientWidth;
  const navigator: NavigateFunction = useNavigate();

  const cleanupBeforeNav = () => {
    resetScroll();
  }

  const resetScroll = () => {
    window.scrollTo(0,0);
  }

  const handleLogin = () => {
    cleanupBeforeNav();
    navigator(Links.Login);
  }

  const handleLogout = () => {
    signOut(auth)
    .catch((err) => {
      console.log(err);
    })
  }

  const renderLoginPart = () => {
    return <button type="button" className="button-primary" onClick={ loggedIn? handleLogout : handleLogin }>
      { loggedIn? "Logout" : "Login" }</button>;
  }

  const renderFullMode = () => {
    return <nav className="navbar-full">
      <h1>{ props.title }</h1>
      <span className="links">
        <span>
          {props.items.map((item: {name: string, link: string}) => (
            <span className="item" key={ item.name }>
              <Link onClick={cleanupBeforeNav} to={ item.link }>{ item.name }</Link>
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
    const subItems2 = props.items.slice(0);
    const subItems1 = subItems2.splice(0, 4);
    return (
      <div className="split-links">
        <div>
          {subItems1.map((item: {name: string, link: string}) => (
            <span className="item" key={ item.name }>
              <Link onClick={cleanupBeforeNav} to={ item.link }>{ item.name }</Link>
            </span>
          ))}
        </div>
        <div>
          {subItems2.map((item: {name: string, link: string}) => (
            <span className="item" key={ item.name }>
              <Link onClick={cleanupBeforeNav} to={ item.link }>{ item.name }</Link>
            </span>
          ))}
        </div>
      </div>
    )
  }

  const renderMobileMode = () => {
    return <nav className="navbar-mobile">
      <div style={{display: "flex", justifyContent: "flex-start", marginBottom: "10px", alignItems: "center"}}>
        <h1 style={{flex: "0 1 auto", left: "50%", transform: "translateX(-50%)", position: "absolute"}}>{ props.title }</h1>
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
    <nav data-cy="navbar" className="navbar">
      {!isMobile && renderFullMode()}
      {isMobile && renderMobileMode()}
    </nav>   
  );
}
 
export default Navbar;