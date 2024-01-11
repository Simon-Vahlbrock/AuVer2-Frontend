import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';
import { Board } from '../../types/boards.ts';

interface GetBoardsParams {
    accessToken: string | null;
}

type GetBoardsData = Board[];

export const getBoards = async ({ accessToken }: GetBoardsParams): Promise<ApiFunctionResult<GetBoardsData>> => {
    const response = await request<GetBoardsData>({
        route: '/boards',
        method: 'GET',
        accessToken,
    });

    return { status: response.status, data: response.data };
};
