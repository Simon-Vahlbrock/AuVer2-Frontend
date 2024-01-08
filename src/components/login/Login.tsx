import { FC, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch } from '../../hooks/redux.ts';
import { handleUserLogin } from '../../redux-modules/user/actions.ts';

const Login: FC = () => {
    const [localUserName, setLocalUserName] = useState('');
    const [localPassword, setLocalPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    const isLoginDisabled = localPassword.trim().length === 0 || localUserName.trim().length === 0 || isLoading;

    const handleSubmit = async () => {
        setIsLoading(true);

        const { message } = await dispatch(handleUserLogin({
            userName: localUserName,
            password: localPassword
        }));

        setIsLoading(false);

        if (message) {
            setMessage(message);
            setLocalPassword('');

            return;
        }

        setLocalPassword('');
        setLocalUserName('');
        setMessage(null);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    AuVer2
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Benutzername"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={localUserName}
                        onChange={(event) => setLocalUserName(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Kennwort"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={localPassword}
                        onChange={(event) => setLocalPassword(event.target.value)}
                        onKeyDownCapture={(event) => {
                            if (event.key === 'Enter' && !isLoginDisabled) {
                                void handleSubmit();
                            }
                        }}
                    />
                    {message && (
                        <Box id="login-unseccessful">
                            <Typography component="footer" sx={{ color: 'red' }}>
                                {message}
                            </Typography>
                        </Box>
                    )}
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoginDisabled}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, color: 'white' }}
                    >
                        Sign In
                    </Button>

                </Box>
            </Box>
        </Container>
    );
};

export default Login;
