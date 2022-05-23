import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';



import ROUTES from '../routes/path';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppHeader from './AppHeader';
import { getCookie } from '../utils/helper';
import { ThemeProvider, useChangeTheme } from '../theme/ThemeContext';



export default function AppFrame({ children }: { children: React.Component }) {
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
        <ThemeProvider>
            <AppHeader />

            <Container sx={{ flex: 1, bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.50'), overflow: 'auto' }}>
                {children}
            </Container>

        </ThemeProvider >
    );
}