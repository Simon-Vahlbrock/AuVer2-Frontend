import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';

interface PatchBoardParams {
    accessToken: string | null;
    name: string;
    id: number;
}

export const patchBoard = async ({ accessToken, name, id }: PatchBoardParams): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/boards/${id}`,
        method: 'PATCH',
        body: {
            name
        },
        accessToken
    });

    return { status: response.status };
};
