import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ActivityStore from './activityStore';
import authApi from './userStore';
import { setupListeners } from '@reduxjs/toolkit/query';
import sessionReducer from './sessionReducer';

export const createRootReducer = () =>
    combineReducers({
        session: sessionReducer,
        [ActivityStore.reducerPath]: ActivityStore.reducer,
        [authApi.reducerPath]: authApi.reducer,
    });

export const store = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:
                false /* turned off because it seems to conflict with RTK Query and slows down switching between dataproducts */,
        }).concat(
            ActivityStore.middleware,
            authApi.middleware,

        ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Used in hooks.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
