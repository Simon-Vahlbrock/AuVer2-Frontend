import { FC, useEffect, useMemo, useState } from 'react';
import { Box, createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { getDesignTokens } from '../utils/theme.ts';
import Header from './header/Header.tsx';
import Login from './login/Login.tsx';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { selectUserLoadingState, selectUserRefreshToken } from '../redux-modules/user/selectors.ts';
import { loadUser, refreshUserToken } from '../redux-modules/user/actions.ts';
import Content from './content/Content.tsx';
import { loadBoards } from '../redux-modules/boards/actions.ts';
import { selectBoardsLoadingState } from '../redux-modules/boards/selectors.ts';
import { initWebSocket } from '../utils/webSocket.ts';
import { loadTasks } from '../redux-modules/tasks/actions.ts';
import { loadLabels } from '../redux-modules/labels/actions.ts';
import { selectLabelsLoadingState } from '../redux-modules/labels/selectors.ts';
import { selectTasksLoadingState } from '../redux-modules/tasks/selectors.ts';
import { loadHistory } from '../redux-modules/history/actions.ts';

const App: FC = () => {
    const isLoggedIn = useAppSelector(selectUserRefreshToken);
    console.log(isLoggedIn);
    const userLoadingState = useAppSelector(selectUserLoadingState);
    const boardsLoadingState = useAppSelector(selectBoardsLoadingState);
    const labelsLoadingState = useAppSelector(selectLabelsLoadingState);
    const tasksLoadingState = useAppSelector(selectTasksLoadingState);

    const [mode, setMode] = useState<PaletteMode>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(refreshUserToken());
    }, [dispatch]);

    useEffect(() => {
        initWebSocket();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            void dispatch(loadBoards());
            void dispatch(loadTasks());
            void dispatch(loadUser());
            void dispatch(loadLabels());
            void dispatch(loadHistory());
        }
    }, [dispatch, isLoggedIn]);

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    if (!isLoggedIn) {
        return (
            <ThemeProvider theme={theme}>
                <Login/>
            </ThemeProvider>
        );
    }

    if (userLoadingState === 'loading' || boardsLoadingState === 'loading' || labelsLoadingState === 'loading' || tasksLoadingState === 'loading') {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw'
            }}>
                <Header setMode={setMode}/>
                <Content/>
            </Box>
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
