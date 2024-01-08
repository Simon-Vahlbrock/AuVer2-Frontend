import { getBoards } from '../../api/boards/get.ts';
import { setBoards, setLoadingState } from './slice.ts';
import { AppDispatch, GetAppState } from '../index.ts';
import { selectUserAccessToken } from '../user/selectors.ts';

export const loadBoards = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { data, status } = await getBoards({accessToken });

    if (status !== 200 || !data) {
        dispatch(setLoadingState('rejected'));

        return;
    }

    dispatch(setBoards(data.boards));
    dispatch(setLoadingState('successful'));
};
