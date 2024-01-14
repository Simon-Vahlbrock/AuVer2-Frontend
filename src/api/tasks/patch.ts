import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface PatchTaskParams {
    accessToken: string | null;
    title?: string;
    text?: string;
    boardId?: number;
    id: number;
}

export const patchTask = async ({ id, title, accessToken, text, boardId }: PatchTaskParams): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/tasks/${id}`,
        method: 'PATCH',
        body: { title, text, boardId },
        accessToken
    });

    return { status: response.status };
};
