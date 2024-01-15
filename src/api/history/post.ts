import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';
import { HistoryEntry } from '../../types/history.ts';

interface PostHistoryEntryProps {
    accessToken: string | null;
    description: string;
}

interface PostHistoryEntryBody {
    description: string;
}

export const postHistoryEntry = async (
    {
        accessToken,
        description
    }: PostHistoryEntryProps): Promise<ApiFunctionResult<HistoryEntry>> => {
    const response = await request<HistoryEntry, PostHistoryEntryBody>({
        method: 'POST',
        route: '/history',
        accessToken,
        body: { description }
    });

    return { status: response.status, data: response.data };
};
