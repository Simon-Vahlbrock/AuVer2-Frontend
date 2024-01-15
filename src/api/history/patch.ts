import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface PatchHistoryEntryProps {
    accessToken: string | null;
    id: number;
    description: string;
}

export const patchHistoryEntry = async (
    {
        accessToken,
        id,
        description
    }: PatchHistoryEntryProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/history/${id}`,
        method: 'PATCH',
        accessToken,
        body: {
            description
        }
    });

    return { status: response.status };
};
