import { FC, useEffect, useMemo, useState } from 'react';
import { Box, createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { getDesignTokens } from '../utils/theme.ts';
import Header from './header/Header.tsx';
import Login from './login/Login.tsx';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { selectUserLoadingState, selectUserRefreshToken } from '../redux-modules/user/selectors.ts';
import { refreshUserToken } from '../redux-modules/user/actions.ts';
import Content from './content/Content.tsx';

const App: FC = () => {
    const isLoggedIn = useAppSelector(selectUserRefreshToken);
    const userLoadingState = useAppSelector(selectUserLoadingState);

    const [mode, setMode] = useState<PaletteMode>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(refreshUserToken());
    }, [dispatch]);

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    if (userLoadingState === 'loading') {
        return null;
    }

    if (!isLoggedIn) {
        return (
            <ThemeProvider theme={theme}>
                <Login/>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                backgroundColor: theme.palette.background.default,
                height: '100%',
                width: '100%',
            }}>
                <Header setMode={setMode}/>
                <Content/>
            </Box>
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
