import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Box, IconButton, PaletteMode, TextField, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { LogoutOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { logout } from '../../redux-modules/user/slice.ts';
import { selectSearchString } from '../../redux-modules/tasks/selectors.ts';
import { setSearchString } from '../../redux-modules/tasks/slice.ts';

interface HeaderProps {
    setMode: Dispatch<SetStateAction<PaletteMode>>;
}

const Header: FC<HeaderProps> = ({ setMode }) => {
    const searchString = useAppSelector(selectSearchString);

    const dispatch = useAppDispatch();

    const theme = useTheme();

    const handleModeChange = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const handleLogoutClick = () => {
        dispatch(logout());
    };

    const handleSearchStringChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(setSearchString(value));
    };

    return (
        <Box
            sx={{
                width: '100vw',
                bgcolor: theme.custom.secondaryBackgroundColor,
                borderBottom: `${theme.custom.menuBorderColor} solid 3px`,
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '12px',
                    flex: 1,
                    color: theme.palette.primary.main
                }}
            >
                <h1>AuVer2</h1>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: '0 0 auto',
                    width: '55vw',
                    padding: '0.8rem 1.6rem'
                }}
            >
                <TextField
                    label="Suche"
                    variant="outlined"
                    sx={{
                        width: '100%',
                    }}
                    value={searchString}
                    onChange={handleSearchStringChange}
                />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItem: 'center',
                    justifyContent: 'flex-end',
                    pr: 6
                }}
            >
                <IconButton sx={{ mt: 'auto', mb: 'auto' }} color="inherit" onClick={handleModeChange}>
                    {theme.palette.mode === 'dark' ? (
                        <Brightness7Icon sx={{ color: theme.custom.iconColor }}/>
                    ) : (
                        <Brightness4Icon sx={{ color: theme.custom.iconColor }}/>
                    )}
                </IconButton>
                <IconButton sx={{ mt: 'auto', mb: 'auto' }} color="inherit" onClick={handleLogoutClick}>
                    <LogoutOutlined sx={{ color: theme.custom.iconColor }}/>
                </IconButton>
            </Box>
        </Box>
    );
};

Header.displayName = 'Header';

export default Header;
