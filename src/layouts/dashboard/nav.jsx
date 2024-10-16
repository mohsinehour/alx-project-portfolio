import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ExpandMore, ChevronRight  } from '@mui/icons-material';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';


export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        // mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        bottom: 1,
      }}
    >
      <Avatar
        src={account.photoURL}
        alt="photoURL"
        sx={{ width: 56, height: 56 }}
      />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>


      <Box
        component="span"
        sx={{
          position: 'absolute',
          right: -40,
          ml: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '50%',
          },
        }}
      >
        <ExpandMore />
      </Box>

    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={2} sx={{ px: 2, mt: 5 }}>
      {navConfig.map((item) => (
        <NavItem
          key={item.title}
          item={item}
          active={pathname === item.path}
        />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          mt: 1
        }}
      >
        <Logo sx={{ mt: 3, ml: 4 }} />
      </Box>


      {renderMenu}

      {renderAccount}

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};


function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'white',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: '#FABE24',
          '&:hover': {
            bgcolor: (theme) => alpha('#FABE24', 0.95),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title}</Box>

      {
        !active &&
        <Box
          component="span"
          sx={{
            width: 24,
            height: 24,
            mr: 2,
            position: 'absolute',
            right: 2,
          }}
        >
          <ChevronRight />
        </Box>
      }
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
