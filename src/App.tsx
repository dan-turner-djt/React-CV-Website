import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Links as links } from './utils';
import Home from './Pages/Home/Home';
import Skills from './Pages/EditablePages/Skills/Skills';
import WorkHistory from './Pages/EditablePages/WorkHistory/WorkHistory';
import Education from './Pages/EditablePages/Education/Education';
import Projects from './Pages/EditablePages/Projects/Projects';
import Japanese from './Pages/EditablePages/Japanese/Japanese';
import NotFound from './Pages/NotFound/NotFound';
import Appbar from './Components/AppBar/Appbar';
import DemoPage from './Pages/EditablePages/DemoPage/DemoPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import { WindowContext, WindowContextProps } from './Contexts/WindowContext';
import { UserContextProvider } from './Contexts/UserContext';
import { PaletteColorOptions, ThemeProvider, createTheme } from '@mui/material';
import { Helmet } from "react-helmet";

export interface AppProps {}

declare module '@mui/material/styles' {
  interface CustomPalette {
    darkBlue: PaletteColorOptions,
    appbarBlue: PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    darkBlue: true
  }
}
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    appbarBlue: true
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: any) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    darkBlue: createColor('#330eda'),
    appbarBlue: createColor('#8cb3ff')
  },
});

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const appbarTitle: string = "DAN TURNER";
  const appbarItems: {name: string, link: string}[] = [
    { name: "Home", link: links.Home },
    { name: "Skills", link: links.Skills },
    { name: "Career", link: links.WorkHistory },
    { name: "Education", link: links.Education },
    { name: "Projects", link: links.Projects },
    { name: "Japanese", link: links.Japanese },
    { name: "Demo Page", link: links.DemoPage }
  ];

  const { clientHeight, clientWidth } = useContext<WindowContextProps>(WindowContext);
  let widthToSet: string = clientWidth < 1500 ? "88%" : "1300px";
  let heightToSet: string = String(clientHeight - 176) + "px";

  return (
    <UserContextProvider>
      <ThemeProvider theme={ theme }>
        <BrowserRouter>
          <div className="App">
            <Appbar title={ appbarTitle } items={ appbarItems } />
            <div className="main-content" style={{width: widthToSet, minHeight: heightToSet}}>
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
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
