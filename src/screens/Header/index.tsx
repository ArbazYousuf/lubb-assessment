import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, useMediaQuery, Container, Tooltip } from '@mui/material';

//css
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { getAuth } from '@firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/authContext';

const Header: React.FC = () => {
  const navigation = useNavigate()
  const { logout } = useAuth()

  const auth = getAuth();
  const firestore = getFirestore();

  const [fullName, setFullName] = useState<string>('');


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null)
    setAnchorEl(null)
    logout()
    navigation("/signin")
  }


  useEffect(() => {
    if (!auth.currentUser) return;

    const userDocRef = doc(firestore, 'users', auth.currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data) {
        setFullName(data.fullName)
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth.currentUser, firestore]);

  return (
    <>
      {isMobile &&
        <AppBar position="relative" sx={{ boxShadow: 'none', backgroundColor: '#FFFFFF' }}>
          <Toolbar>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <a href="/" className="-m-1.5 p-1.5 flex items-center">
                <span className="sr-only">Lubb</span>
                <img
                  className="h-8 w-auto"
                  src="/logo.png"
                  alt=""
                  style={{ height: isMobile ? "5px" : "40px" }}
                />
              </a>
            </div>

            {/* User Profile Menu */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={"/avatar.png"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >

                  {auth.currentUser ? <MenuItem key={"logout"} onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem> :
                    <MenuItem key={"login"} onClick={() => navigation("/signin")}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  }

                </Menu>
              </div>
            </div>

            {/* {!isMobile && (
              <div style={{ marginLeft: isMobile ? 0 : 16 }}>
                <Typography className="profile-title">{user?.fullName}</Typography>
                <Typography className="profile-username">{user?.username}</Typography>
              </div>
            )} */}

            {/* Main App Menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {auth.currentUser ? <MenuItem onClick={handleLogout}>Logout</MenuItem> :
                <MenuItem onClick={() => navigation("/signin")}>Login</MenuItem>}
            </Menu>
          </Toolbar>
        </AppBar>
      }
      {!isMobile &&
        <AppBar position="relative" sx={{ boxShadow: 'none', backgroundColor: '#FFFFFF' }}>
          <Container sx={{ backgroundColor: '#FFFFFF' }}>
            <Toolbar>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <a href="/" className="-m-1.5 p-1.5 flex items-center">
                  <span className="sr-only">Lubb</span>
                  <img
                    className="h-8 w-auto"
                    src="/logo.png"
                    alt=""
                    style={{ height: isMobile ? "5px" : "40px" }}
                  />
                </a>
              </div>

              {/* User Profile */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                {/* {!user?.subscriptionStatus && !isButton && (
                  <div style={{ marginRight: 20 }}>
                    <GradientButton onClick={() => navigation("/pricing")}>
                      Upgrade to Flexible
                    </GradientButton>
                  </div>
                )} */}
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src={"/avatar.png"} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {/* <MenuItem key={"pricing"} onClick={() => navigation("/pricing")}>
                      <Typography textAlign="center">{"Pricing"}</Typography>
                    </MenuItem> */}
                    {auth.currentUser ? <MenuItem onClick={handleLogout}>Logout</MenuItem> :
                      <MenuItem onClick={() => navigation("/signin")}>Login</MenuItem>}
                  </Menu>
                </div>
              </div>

              {!isMobile && (
                <div style={{ marginLeft: isMobile ? 0 : 16 }}>
                  <Typography className="profile-title">{fullName}</Typography>
                </div>
              )}
            </Toolbar>
          </Container>
        </AppBar >
      }
    </>
  );
};

export default Header;
