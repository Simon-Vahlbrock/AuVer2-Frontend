import { AppDispatch, GetAppState } from '../index.ts';
import { selectUserAccessToken } from '../user/selectors.ts';
import { getLabels } from '../../api/labels/get.ts';
import { setLabels } from './slice.ts';

export const loadLabels = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status, data } = await getLabels({ accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setLabels(data));
};
