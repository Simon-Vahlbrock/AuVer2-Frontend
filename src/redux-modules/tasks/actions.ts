import { getTasks } from '../../api/tasks/get.ts';
import { AppDispatch, GetAppState } from '../index.ts';
import { selectUserAccessToken } from '../user/selectors.ts';
import { setTasks } from './slice.ts';
import { patchTask } from '../../api/tasks/patch.ts';

export const loadTasks = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status, data } = await getTasks({ accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setTasks(data));
};

interface SaveTaskUpdate {
    id: number;
    title: string;
}

export const saveTaskUpdate = (
    {
        id,
        title
    }: SaveTaskUpdate) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status } = await patchTask({ id, title, accessToken });

    if (status !== 200) {
        return;
    }
};
