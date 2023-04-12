import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

function App() {
  const navbarTitle = "DAN TURNER";
  const navbarItems = [
    { name: "Home", link: links.Home },
    { name: "Skills", link: links.Skills },
    { name: "Career", link: links.WorkHistory },
    { name: "Education", link: links.Education },
    { name: "Projects", link: links.Projects },
    { name: "Japanese", link: links.Japanese },
    { name: "Demo Page", link: links.DemoPage }
  ];

  let widthToSet = window.visualViewport.width < 1100 ? "90%" : "1100px";

  return (
    <Router>
      <div className="App">
        <Navbar title={ navbarTitle } items={ navbarItems } />
        <div className="main-content" style={{width: widthToSet}}>
          <Switch>
            <Route exact path={ links.Home }>
              <Home/>
            </Route>
            <Route exact path={ links.Skills }>
              <Skills/>
            </Route>
            <Route exact path={ links.WorkHistory }>
              <WorkHistory/>
            </Route>
            <Route exact path={ links.Education }>
              <Education/>
            </Route>
            <Route exact path={ links.Projects }>
              <Projects/>
            </Route>
            <Route exact path={ links.Japanese }>
              <Japanese/>
            </Route>
            <Route exact path={ links.DemoPage }>
              <DemoPage/>
            </Route>
            <Route exact path={ links.Login }>
              <LoginPage/>
            </Route>
            <Route>
              <NotFound path='*'/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
