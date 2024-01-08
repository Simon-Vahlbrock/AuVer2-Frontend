import { AppDispatch } from '../index.ts';
import { setAccessToken, setLoadingState, setRefreshToken, setUserName, UserState } from './slice.ts';
import { request } from '../../utils/request.ts';

interface HandleUserLoginParams {
    userName: UserState['userName'];
    password: string;
}

interface HandleUserLoginData {
    accessToken: UserState['accessToken'],
    refreshToken: UserState['refreshToken']
}

export const handleUserLogin = ({ userName, password }: HandleUserLoginParams) => async (dispatch: AppDispatch) => {
    const { status, data } = await request<HandleUserLoginData, HandleUserLoginParams>({
        auth: false,
        method: 'POST',
        route: '/users/login',
        body: {
            userName,
            password
        }
    });

    if (status === 401) {
        return {
            success: false,
            message: 'Benutzername oder Passwort ist falsch.'
        };
    }

    if (status !== 200 || !data) {
        // Handle error

        return {
            success: false,
            message: 'Etwas beim Login ist schief gelaufen.'
        };
    }

    dispatch(setUserName(userName));
    dispatch(setAccessToken(data.accessToken));
    dispatch(setRefreshToken(data.refreshToken));

    localStorage.setItem('refreshToken', data.refreshToken!);

    return {
        success: true
    };
};

export const refreshUserToken = () => async (dispatch: AppDispatch) => {
    console.log(1);
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        dispatch(setLoadingState('successful'));

        return;
    }

    // check, if refreshToken is valid
    const { status, data } = await request<HandleUserLoginData, { refreshToken: string }>({
        auth: false,
        method: 'POST',
        route: '/users/refresh',
        body: {
            refreshToken
        }
    });

    if (status !== 200 || !data) {
        dispatch(setLoadingState('rejected'));

        return;

    }

    localStorage.setItem('refreshToken', data.refreshToken!);

    dispatch(setRefreshToken(data.refreshToken));
    dispatch(setAccessToken(data.accessToken));
    dispatch(setLoadingState('successful'));
};
