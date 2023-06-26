import './Appbar.scss';
import React, { useContext } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Links } from "../../utils";
import { Auth, getAuth, signOut } from "firebase/auth";
import { UserContext, UserContextProps } from "../../Contexts/UserContext";
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { WindowContext, WindowContextProps } from '../../Contexts/WindowContext';

export type AppbarProps = {
  title: string;
  items: {name: string, link: string}[];
}

const Appbar = (props: AppbarProps) => {
  const { clientWidth } = useContext<WindowContextProps>(WindowContext);
  const { loggedIn } = useContext<UserContextProps>(UserContext);
  const auth: Auth = getAuth();
  const navigator: NavigateFunction = useNavigate();
  const showLoginButtonThreshold = 450;
  let xsSideItemsWidth: string = clientWidth < showLoginButtonThreshold? '10px' : '100px';

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuLinkClicked = (itemLink: string) => {
    handleCloseNavMenu();
    cleanupBeforeNav();
    navigator(itemLink);
  };

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

  return ( 
    <nav data-cy="appbar" className="appbar">
      <AppBar color="appbarBlue">
        <Container maxWidth={false} sx={{ paddingLeft: '6px', paddingRight: '6px'}}>
          <Toolbar className="toolbar" disableGutters>
            <Box sx={{ display: { xs: 'flex', lg: 'none' }, width: xsSideItemsWidth, justifyContent: 'left' }}>
              <IconButton
                data-cy="menu-button"
                size="large"
                aria-label="Menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon></MenuIcon>
              </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              disableScrollLock={true}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', lg: 'none' },
              }}>
              {props.items.map((item: {name: string, link: string}) => (
                <MenuItem data-cy="link-menu-item" key={item.name} onClick={() => menuLinkClicked(item.link)}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
              {clientWidth < showLoginButtonThreshold && 
                <MenuItem data-cy="login-menu-item" key="login" onClick={() => { handleCloseNavMenu(); (loggedIn? handleLogout() : handleLogin()) }}>
                  <Typography textAlign="center">{ loggedIn? "Logout" : "Login" }</Typography>
                </MenuItem>}
            </Menu>
            <Box sx={{ display: { xs: 'block', lg: 'flex' }, width: '220px', justifyContent: 'left' }}>
              <h1>{ props.title }</h1>
            </Box>
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <div className="appbar-links">
                {props.items.map((item: {name: string, link: string}) => (
                  <span className="item" key={ item.name }>
                    <Link data-cy="page-link" onClick={cleanupBeforeNav} to={ item.link }>{ item.name }</Link>
                  </span>
                ))}
              </div>
            </Box>
            <Box sx={{ width: { xs: xsSideItemsWidth, lg: '230px'}, display: 'flex', justifyContent: 'right' }}>
              {clientWidth >= showLoginButtonThreshold && 
                <Button data-cy="login-button" className="login-button" variant="contained" color="darkBlue" type="button" onClick={ loggedIn? handleLogout : handleLogin }>
                  { loggedIn? "Logout" : "Login" }</Button>}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </nav>   
  );
}
 
export default Appbar;