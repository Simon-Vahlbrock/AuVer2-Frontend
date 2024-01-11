import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface PatchTaskParams {
    accessToken: string | null;
    title: string;
    id: number;
}

export const patchTask = async ({ id, title, accessToken }: PatchTaskParams): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/tasks/${id}`,
        method: 'PATCH',
        body: { title },
        accessToken
    });

    return { status: response.status };
};
