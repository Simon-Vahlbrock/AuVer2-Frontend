import { configureStore, combineReducers, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { userReducer } from './user/slice.ts';

const rootReducer = combineReducers({
    user: userReducer
});

const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        const defaultMiddleware = getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        });


        const logger = createLogger({ collapsed: true, duration: true });

        return defaultMiddleware.concat(logger);

    }
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type GetAppState = () => RootState;
export default Store;
