import { AppDispatch, GetAppState } from '../index.ts';
import { selectUserAccessToken } from '../user/selectors.ts';
import { getHistoryEntries } from '../../api/history/get.ts';
import { setHistoryEntries, setHistoryEntryOfToday, setSelectedHistoryId } from './slice.ts';
import { patchHistoryEntry } from '../../api/history/patch.ts';
import { postHistoryEntry } from '../../api/history/post.ts';

export const loadHistory = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status, data } = await getHistoryEntries({ accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setHistoryEntries(data));
};

interface SaveHistoryEntryProps {
    description: string;
    id: number;
}

export const saveHistoryUpdate = (
    {
        id,
        description
    }: SaveHistoryEntryProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    if (id === -1) {
        const { status, data } = await postHistoryEntry({ accessToken, description });

        if (status !== 200 || !data) {
            return;
        }

        dispatch(setHistoryEntryOfToday(data));
        dispatch(setSelectedHistoryId(data.id));

        return;
    }

    const { status } = await patchHistoryEntry({ accessToken, id, description });

    if (status !== 204) {
        return;
    }
};
