import { request } from '../../utils/request.ts';
import { UserState } from '../../redux-modules/user/slice.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface HandleUserLoginParams {
    userName: UserState['userName'];
    password: string;
}

interface PostLoginData {
    token: string,
    refreshToken: string
}

export const postLogin = async (
    {
        userName,
        password
    }: HandleUserLoginParams): Promise<ApiFunctionResult<PostLoginData>> => {
    const response = await request<PostLoginData, HandleUserLoginParams>({
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

interface PostRefreshData {
    token: string;
    refreshToken: string;
    userName: string,
}

export const postRefresh = async ({ refreshToken }: PostRefreshParams): Promise<ApiFunctionResult<PostRefreshData>> => {
    const response = await request<PostRefreshData, { refreshToken: string }>({
        auth: false,
        method: 'POST',
        route: '/users/refresh',
        body: {
            refreshToken
        }
    });

    return { status: response.status, data: response.data };
};
