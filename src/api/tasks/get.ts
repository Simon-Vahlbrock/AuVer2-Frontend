import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';
import { Task } from '../../types/task.ts';

interface GetTasksParams {
    accessToken: string | null;
}

type GetTasksData = Task[];

export const getTasks = async ({ accessToken }: GetTasksParams): Promise<ApiFunctionResult<GetTasksData>> => {
    const response = await request<GetTasksData>({
        route: '/tasks',
        method: 'GET',
        accessToken
    });

    return { status: response.status, data: response.data };
};
