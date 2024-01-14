import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface PostUserToTaskProps {
    taskId: number;
    userName: string;
    accessToken: string | null;
}

export const postUserToTask = async (
    {
        taskId,
        userName,
        accessToken
    }: PostUserToTaskProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/tasks/${taskId}/users/${userName}`,
        method: 'POST',
        accessToken
    });

    return { status: response.status };
};
