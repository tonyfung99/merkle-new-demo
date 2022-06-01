import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ROUTES from '../routes/path';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

import ThemeModeToggle from '../components/header/ThemeModeToggle';
import { getCookie } from '../utils/helper';
import { useChangeTheme } from '../theme/ThemeContext';
import { AppBar, Link, Toolbar } from '@mui/material';
import Image from '../components/Image';

import LogoPath from '../assets/icon.png';
import logo from "./ass/ethereumLogo.png";
import WalletButton from '../components/WalletButton';

const Header = styled('header')(({ theme }) => ({
    position: 'sticky',
    top: 0,
    transition: theme.transitions.create('top'),
    zIndex: theme.zIndex.appBar
}));

export default function AppHeader() {
    const changeTheme = useChangeTheme();
    const [mode, setMode] = React.useState<string | null>(null);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


    React.useEffect(() => {
        const initialMode = getCookie('paletteMode') || 'system';
        setMode(initialMode);
    }, []);

    const handleChangeThemeMode = (checked: boolean) => {
        const paletteMode = checked ? 'dark' : 'light';
        setMode(paletteMode);

        document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
        changeTheme({ paletteMode });
    };

    return (

        < Toolbar sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.50')
        }}>
            <Box
                component={Link}
                href={ROUTES.FEED}
                aria-label="Go to homepage"
                sx={{ lineHeight: 0, mr: 2 }}
            >
                <Image sx={{ height: 50 }} src={LogoPath} />
                {/* <SvgMuiLogo width={30} /> */}
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'initial' } }}>


            </Box>
            <Box sx={{ ml: 'auto' }} />
            <Stack direction="row" spacing={1}>
                <Button>

                </Button>

                <IconButton
                    component="a"
                    color="primary"
                    href="/profile"
                    data-ga-event-category="header"
                    data-ga-event-action="github"
                >
                    <AccountCircle fontSize="small" />
                </IconButton>

                {mode !== null ? (
                    <ThemeModeToggle
                        checked={mode === 'system' ? prefersDarkMode : mode === 'dark'}
                        onChange={handleChangeThemeMode}
                    />
                ) : null}

                <WalletButton />


            </Stack>
            <Box sx={{ display: { md: 'none' }, ml: 1 }}>

            </Box>

        </ Toolbar>
    );
}