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

interface PostLabelIdToTaskProps {
    taskId: number;
    labelId: number;
    accessToken: string | null;
}

export const postLabelIdToTask = async (
    {
        labelId,
        taskId,
        accessToken
    }: PostLabelIdToTaskProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/tasks/${taskId}/labels/${labelId}`,
        method: 'POST',
        accessToken
    });

    return { status: response.status };
};

interface PostTaskProps {
    title: string;
    text: string;
    accessToken: string | null;
    boardId: number;
}

interface PostTaskData {
    id: number;
    title: string;
    text: string;
    boardId: number;
}

interface PostTaskBody {
    title: string;
    text: string;
    boardId: number;
}

export const postTask = async (
    {
        accessToken,
        boardId,
        text,
        title
    }: PostTaskProps): Promise<ApiFunctionResult<PostTaskData>> => {
    const response = await request<PostTaskData, PostTaskBody>({
        route: '/tasks',
        method: 'POST',
        accessToken,
        body: { title, text, boardId }
    });

    return { status: response.status, data: response.data };
};
