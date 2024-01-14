import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface DeleteUserFromTaskProps {
    taskId: number;
    userName: string;
    accessToken: string | null;
}

export const deleteUserFromTask = async (
    { taskId, userName, accessToken }: DeleteUserFromTaskProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/tasks/${taskId}/users/${userName}`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};
