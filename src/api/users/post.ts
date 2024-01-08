import { request } from '../../utils/request.ts';
import { UserState } from '../../redux-modules/user/slice.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface HandleUserLoginParams {
    userName: UserState['userName'];
    password: string;
}

interface HandleUserLoginData {
    token: string,
    refreshToken: string
}

export const postLogin = async (
    {
        userName,
        password
    }: HandleUserLoginParams): Promise<ApiFunctionResult<HandleUserLoginData>> => {
    const response = await request<HandleUserLoginData, HandleUserLoginParams>({
        auth: false,
        method: 'POST',
        route: '/users/login',
        body: {
            userName,
            password
        }
    });

    return { status: response.status, data: response.data };
};

interface PostRefreshParams {
    refreshToken: string;
}

export const postRefresh = async ({ refreshToken }: PostRefreshParams): Promise<ApiFunctionResult<HandleUserLoginData>> => {
    const response = await request<HandleUserLoginData, { refreshToken: string }>({
        auth: false,
        method: 'POST',
        route: '/users/refresh',
        body: {
            refreshToken
        }
    });

    return { status: response.status, data: response.data };
};
