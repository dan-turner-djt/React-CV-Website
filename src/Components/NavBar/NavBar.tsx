import './NavBar.scss';
import React, { useContext } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Links } from "../../utils";
import { Auth, getAuth, signOut } from "firebase/auth";
import { WindowContext, WindowContextProps } from "../../Contexts/WindowContext";
import { UserContext, UserContextProps } from "../../Contexts/UserContext";
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuItemClicked = (itemLink: string) => {
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
    <nav data-cy="navbar" className="navbar">
      <AppBar color="appbarBlue">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
              <IconButton
                size="large"
                aria-label="Menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon></MenuIcon>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}>
                {props.items.map((item: {name: string, link: string}) => (
                  <MenuItem key={item.name} onClick={() => menuItemClicked(item.link)}>
                    <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <h1>{ props.title }</h1>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
              {props.items.map((item: {name: string, link: string}) => (
                <span className="item" key={ item.name }>
                  <Link onClick={cleanupBeforeNav} to={ item.link }>{ item.name }</Link>
                </span>
              ))}
            </Box>
            <Box className="login-button" sx={{ flexGrow: 0 }}>
              <Button data-cy="login-button" variant="contained" color="darkBlue" type="button" onClick={ loggedIn? handleLogout : handleLogin }>
                { loggedIn? "Logout" : "Login" }</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </nav>   
  );
}
 
export default Navbar;