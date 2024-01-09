import { getBoards } from '../../api/boards/get.ts';
import { setBoards, setLoadingState, updateBoard } from './slice.ts';
import { AppDispatch, GetAppState } from '../index.ts';
import { selectUserAccessToken } from '../user/selectors.ts';
import { patchBoard } from '../../api/boards/patch.ts';

export const loadBoards = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { data, status } = await getBoards({ accessToken });

    if (status !== 200 || !data) {
        dispatch(setLoadingState('rejected'));

        return;
    }

    dispatch(setBoards(data.boards));
    dispatch(setLoadingState('successful'));
};

interface SaveBoardRenameProps {
    name: string;
    id: number;
}

export const saveBoardRename = (
    {
        name,
        id
    }: SaveBoardRenameProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status } = await patchBoard({ accessToken, name, id });

    if (status !== 200) {
        // ToDo add error message
        return;
    }

    dispatch(updateBoard({ id, name }));
};
