import { RootState } from '../index.ts';
import { UserState } from './slice.ts';

const selectUserState = (state: RootState): UserState => state.user;
export const selectUserName = (state: RootState): UserState['userName'] => selectUserState(state).userName;
export const selectUserAccessToken = (state: RootState): UserState['accessToken'] => selectUserState(state).accessToken;
export const selectUserRefreshToken = (state: RootState): UserState['refreshToken'] => selectUserState(state).refreshToken;
export const selectUserLoadingState = (state: RootState): UserState['loadingState'] => selectUserState(state).loadingState;
export const selectAllUsers = (state: RootState): UserState['users'] => selectUserState(state).users;
