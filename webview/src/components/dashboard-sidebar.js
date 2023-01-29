import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Flight Overview'
  },
  {
    href: '/baggage',
    icon: (<LockIcon fontSize="small" />),
    title: 'Baggage'
  },
  {
    href: '/boarding',
    icon: (<UserIcon fontSize="small" />),
    title: 'Boarding'
  },
  // {
  //   href: '/account',
  //   icon: (<UserIcon fontSize="small" />),
  //   title: 'Account'
  // },
  // {
  //   href: '/settings',
  //   icon: (<CogIcon fontSize="small" />),
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: (<LockIcon fontSize="small" />),
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });
  const [age, setAge] = useState('AA 1511');

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
          component="img"
          sx={{
            height: 660/8,
            width: 592/8,
            
            mx: 'auto',
            my: '1rem',
            justifyContent: 'flex-end',
            maxHeight: { xs: 660, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="American Airlines"
          src="https://cdn.discordapp.com/attachments/1061870317678637076/1069237084054888539/aa_aa__vrt_rgb_grd_pos-2.png"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 0 }}>
            {/* <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink> */}
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                  mr={2}
                  
                >
                  <b>Flight: </b>
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  {/* {age} */}
                </Typography>
              </div>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  // label="Age"
                  onChange={(event) => setAge(event.target.value)}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={"AA 1511"}>AA 1511</MenuItem>
                  <MenuItem value={"AA 1512"}>AA 1512</MenuItem>
                  <MenuItem value={"AA 1513"}>AA 1513</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
