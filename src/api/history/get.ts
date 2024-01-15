import { ApiFunctionResult } from '../../types/api.ts';
import { HistoryEntry } from '../../types/history.ts';
import { request } from '../../utils/request.ts';

interface GetHistoryEntriesProps {
    accessToken: string | null;
}

export const getHistoryEntries = async ({ accessToken }: GetHistoryEntriesProps): Promise<ApiFunctionResult<HistoryEntry[]>> => {
    const response = await request<HistoryEntry[]>({
        route: '/history/',
        method: 'GET',
        accessToken,
    });

    return { status: response.status, data: response.data };
};
