import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildUrlFromPathAndOptionalQuery } from '../api/ApiUtilities';
import { API_GLOBAL_PREFIX } from '../../shared/const';
import { NavRoutes, UserMessages } from '../../shared/enums';
import { showErrorNotification } from './notificationReducer';


export function setSessionStorageValue(key: string, value?: string | boolean | number) {
    if (value) window.sessionStorage.setItem(key, value.toString());
    else window.sessionStorage.removeItem(key);
}

export function clearSessionStorageValue(key: string) {
    setSessionStorageValue(key, undefined);
}

export function getSessionStorageValue<T>(key: string): T | undefined {
    const value = window.sessionStorage.getItem(key);
    if (value) return value as any;
    return undefined;
}

export enum SessionModals {
    'None',
    'Login',
    'Logout',
    'Register',
    'DODTerms',
    'SessionTimeout',
    'AccessDenied',
}

export enum LogoutState {
    None = 'None',
    Begin = 'Begin',
    Finalize = 'Finalize',
}

export enum SessionTypeEnum {
    User = 'user',
    WebService = 'webservice',
}

export interface SessionDTO {
    sessionId: string;
    type: SessionTypeEnum;
    expiration: number;
    expiresInMs: number;
    isActive: boolean;
}

export interface SessionState {
    authToken?: string;
    /**
     * Token used for user registration
     */
    loginToken?: string;
    userId?: string;
    userSession?: SessionDTO;
}

export const initialState: SessionState = {

};


export interface responseUserLogin {
    jllistoken: string;
    session: {
        sessionId: string;
        type: SessionTypeEnum;
        expiration: number;
    };
}


export const getServerToken = createAsyncThunk(
    'session/get-token',
    async (arg: { userId?: string; onFail?: () => void }, thunkAPI) => {
        if (!arg?.userId) {
            return;
        }

        const setAuthHeader = (token: string) => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                delete axios.defaults.headers.common['Authorization'];
            }
            dispatch(setAuthToken(token));
        };

        const dispatch = thunkAPI.dispatch;

        const userId = arg?.userId;
        //const url = buildUrlFromPathAndOptionalQuery([API_GLOBAL_PREFIX, 'account', 'login', userId]);
        const url = buildUrlFromPathAndOptionalQuery([API_GLOBAL_PREFIX, NavRoutes.Account, userId]);
        //const options = getRuntimeConfig().NODE_ENV === RuntimeEnvironment.development ? {} : { withCredentials: true };
        await axios
            .post<responseUserLogin>(url, {}, {})//options)
            .then((response) => {
                if (response && response.status < 300 && response.status > 199) {
                    const data = response.data;

                    dispatch(setUserId(userId));
                    setAuthHeader(data?.jllistoken);
                    dispatch(setUserSession(data?.session));
                    setLoginToken(undefined);
                } else {
                    if (arg.onFail) {
                        arg.onFail();
                    } else {
                        dispatch(showErrorNotification(UserMessages.USER_LOGIN_ERROR));
                    }
                }
            })
            .catch((e) => {
                if (arg.onFail) {
                    arg.onFail();
                } else {
                    dispatch(showErrorNotification(UserMessages.USER_LOGIN_ERROR));
                }
            });
    },
);



const sessionReducer = createSlice({
    name: 'session',
    initialState: initialState,
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload;
        },
        setAuthToken(state, action) {
            state.authToken = action.payload;
        },
        setLoginToken(state, action) {
            state.loginToken = action.payload;
        },
        setUserSession(state, action) {
            state.userSession = action.payload;
        },
    },
});

const { reducer, actions } = sessionReducer;

export const {
    setUserId,
    setAuthToken,
    setLoginToken,
    setUserSession,
} = actions;

export default reducer;
