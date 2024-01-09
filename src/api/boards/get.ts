import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';
import { Board } from '../../types/boards.ts';

interface GetBoardsParams {
    accessToken: string | null;
}

interface GetBoardsResponse {
    boards: Board[];
}

export const getBoards = async ({ accessToken }: GetBoardsParams): Promise<ApiFunctionResult<GetBoardsResponse>> => {
    const response = await request<GetBoardsResponse>({
        route: '/boards',
        method: 'GET',
        accessToken,
    });

    return { status: response.status, data: response.data };
};
