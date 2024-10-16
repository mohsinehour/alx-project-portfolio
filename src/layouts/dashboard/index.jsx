import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Nav from './nav';
import Header from './header';
import Main from './main';


export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav
          openNav={openNav}
          onCloseNav={() => setOpenNav(false)}
        />

        <Main
          style={{
            backgroundColor: "#f6f9fe",
            transform: 'scale(0.95)',
            transformOrigin: 'top',
            width: '100%',
          }}
        >
          {children}
        </Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
