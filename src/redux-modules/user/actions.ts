import { AppDispatch, GetAppState } from '../index.ts';
import { setAccessToken, setAllUsers, setLoadingState, setRefreshToken, setUserName, UserState } from './slice.ts';
import { postLogin, postRefresh } from '../../api/users/post.ts';
import { getAllUsers } from '../../api/users/get.ts';
import { selectUserAccessToken } from './selectors.ts';

interface HandleUserLoginParams {
    userName: UserState['userName'];
    password: string;
}

export const handleUserLogin = ({ userName, password }: HandleUserLoginParams) => async (dispatch: AppDispatch) => {
    const { status, data } = await postLogin({ userName, password });

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
    dispatch(setAccessToken(data.token));
    dispatch(setRefreshToken(data.refreshToken));

    localStorage.setItem('refreshToken', data.refreshToken);

    return {
        success: true
    };
};

export const refreshUserToken = () => async (dispatch: AppDispatch) => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        dispatch(setLoadingState('successful'));

        return;
    }

    const { status, data } = await postRefresh({ refreshToken });

    if (status !== 200 || !data) {
        dispatch(setLoadingState('rejected'));

        return;

    }

    localStorage.setItem('refreshToken', data.refreshToken!);

    dispatch(setRefreshToken(data.refreshToken));
    dispatch(setAccessToken(data.token));
    dispatch(setUserName(data.userName));
    dispatch(setLoadingState('successful'));
};

export const loadUser = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status, data } = await getAllUsers({ accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setAllUsers(data));
};
