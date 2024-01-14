import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface GetAllUsersProps {
    accessToken: string | null;
}

type GetAllUsersData = string[];

export const getAllUsers = async ({ accessToken }: GetAllUsersProps): Promise<ApiFunctionResult<GetAllUsersData>> => {
    const response = await request<GetAllUsersData>({
        accessToken,
        method: 'GET',
        route: '/users/'
    });

    return { status: response.status, data: response.data };
};
