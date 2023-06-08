import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Links as links } from './utils';
import Home from './Pages/Home';
import Skills from './Pages/Skills';
import WorkHistory from './Pages/WorkHistory';
import Education from './Pages/Education';
import Projects from './Pages/Projects';
import Japanese from './Pages/Japanese';
import NotFound from './Pages/NotFound';
import Navbar from './Components/NavBar';
import DemoPage from './Pages/DemoPage';
import LoginPage from './Pages/LoginPage';
import { WindowContext, WindowContextProps, WindowContextProvider } from './Contexts/WindowContext';
import { UserContextProvider } from './Contexts/UserContext';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const navbarTitle: string = "DAN TURNER";
  const navbarItems: {name: string, link: string}[] = [
    { name: "Home", link: links.Home },
    { name: "Skills", link: links.Skills },
    { name: "Career", link: links.WorkHistory },
    { name: "Education", link: links.Education },
    { name: "Projects", link: links.Projects },
    { name: "Japanese", link: links.Japanese },
    { name: "Demo Page", link: links.DemoPage }
  ];

  const { clientHeight, clientWidth } = useContext<WindowContextProps>(WindowContext);
  let widthToSet: string = clientWidth < 1100 ? "90%" : "1100px";

  return (
    <WindowContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar title={ navbarTitle } items={ navbarItems } />
            <div className="main-content" style={{width: widthToSet}}>
              <Routes>
                <Route path={ links.Home } element={ <Home/> }/>
                <Route path={ links.Skills } element={ <Skills/> }/>
                <Route path={ links.WorkHistory } element={ <WorkHistory/> }/>
                <Route path={ links.Education } element={ <Education/> }/>
                <Route path={ links.Projects } element={ <Projects/> }/>
                <Route path={ links.Japanese } element={ <Japanese/> }/>
                <Route path={ links.DemoPage } element={ <DemoPage/> }/>
                <Route path={ links.Login } element={ <LoginPage/> }/>
                <Route path='*' element={ <NotFound/> }/>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </UserContextProvider>
    </WindowContextProvider>
  );
}

export default App;
