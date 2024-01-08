import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from '../../types/app.ts';

export interface UserState {
    userName: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    loadingState: LoadingState;
}

const initialState: UserState = {
    userName: null,
    accessToken: null,
    refreshToken: null,
    loadingState: 'loading',
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<UserState['userName']>) => {
            state.userName = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<UserState['accessToken']>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<UserState['refreshToken']>) => {
            state.refreshToken = action.payload;
        },
        setLoadingState: (state, action: PayloadAction<UserState['loadingState']>) => {
            state.loadingState = action.payload;
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

export const { setUserName, setAccessToken, setRefreshToken, setLoadingState, logout } = slice.actions;
export const userReducer = slice.reducer;
