import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ActivityStore from './activityStore';
import { setupListeners } from '@reduxjs/toolkit/query';

export const createRootReducer = () =>
    combineReducers({
        [ActivityStore.reducerPath]: ActivityStore.reducer,
    });

export const store = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:
                false /* turned off because it seems to conflict with RTK Query and slows down switching between dataproducts */,
        }).concat(
            ActivityStore.middleware,

        ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
