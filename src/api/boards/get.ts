import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface GetBoardsParams {
    accessToken: string | null;
}

export const getBoards = async ({ accessToken }: GetBoardsParams): Promise<ApiFunctionResult> => {
    const response = await request({
        route: '/boards',
        method: 'GET',
        accessToken: accessToken,
    });

    return { status: response.status, data: response.data };
};
