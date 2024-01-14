import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';
import { Label } from '../../types/labels.ts';

interface GetLabelsParams {
    accessToken: string | null;
}

type GetLabelsData = Label[];

export const getLabels = async ({ accessToken }: GetLabelsParams): Promise<ApiFunctionResult<GetLabelsData>> => {
    const response = await request<GetLabelsData>({
        route: '/labels',
        method: 'GET',
        accessToken,
    });

    return { status: response.status, data: response.data };
};
