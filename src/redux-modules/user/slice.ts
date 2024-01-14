import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from '../../types/app.ts';

export interface UserState {
    userName: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    users: string[];
    loadingState: LoadingState;
}

const initialState: UserState = {
    userName: null,
    accessToken: null,
    refreshToken: null,
    users: [],
    loadingState: 'loading',
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, { payload }: PayloadAction<UserState['userName']>) => {
            state.userName = payload;
        },
        setAllUsers: (state, { payload }: PayloadAction<UserState['users']>) => {
            state.users = payload;
        },
        setAccessToken: (state, { payload }: PayloadAction<UserState['accessToken']>) => {
            state.accessToken = payload;
        },
        setRefreshToken: (state, { payload }: PayloadAction<UserState['refreshToken']>) => {
            state.refreshToken = payload;
        },
        setLoadingState: (state, { payload }: PayloadAction<UserState['loadingState']>) => {
            state.loadingState = payload;
        },
        logout: (state) => {
            state.userName = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.loadingState = 'successful';

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    },
});

export const {
    setUserName,
    setAccessToken,
    setRefreshToken,
    setLoadingState,
    logout,
    setAllUsers
} = slice.actions;
export const userReducer = slice.reducer;
