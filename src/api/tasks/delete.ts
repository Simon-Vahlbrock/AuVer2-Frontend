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

interface DeleteLabelIdFromTaskProps {
    taskId: number;
    accessToken: string | null;
    labelId: number;
}

export const deleteLabelIdFromTask = async (
    {
        taskId,
        accessToken,
        labelId
    }: DeleteLabelIdFromTaskProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/tasks/${taskId}/labels/${labelId}`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};

interface DeleteTaskProps {
    taskId: number;
    accessToken: string | null;
}

export const deleteTask = async ({ taskId, accessToken }: DeleteTaskProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/tasks/${taskId}`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};
