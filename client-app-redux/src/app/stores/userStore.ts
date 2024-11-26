import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { User, UserFormValues } from '../models/user';
import { buildPathWithQuery, buildUrlFromPathAndOptionalQuery } from '../api/ApiUtilities'
import { API_GLOBAL_PREFIX } from '../../shared/const'
import { GenericMessages, NavRoutes } from '../../shared/enums';
import { showDefaultNotification, showErrorNotification } from './notificationReducer';
import { SessionState } from './sessionReducer';

export interface ReduxState {
    session: SessionState;
}


const authApi = createApi({
    reducerPath: 'dataUserApi',
    baseQuery: fetchBaseQuery({
        //baseUrl: buildUrlFromPathAndOptionalQuery([API_GLOBAL_PREFIX, NavRoutes.Account]), //because NavRoutes.Account has a slash in front of it the udility adds another and screws with the url
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
            const { authToken, loginToken } = (getState() as ReduxState).session;
            const token = authToken || loginToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        //     login: (user: UserFormValues) => requests.post<User>(`/account/login/`, user),
        login: builder.mutation({
            query: (credentials) => ({
                url: NavRoutes.Login,
                method: 'POST',
                body: credentials,
            }),
        }),

        getUser: builder.query<User, string>({
            query: (id) => buildPathWithQuery(['find', id]),
            providesTags: (result) => (result ? [{ type: 'User', id: result.username }] : []),
            // eslint-disable-next-line no-empty-pattern
            async onQueryStarted({ }, { dispatch, queryFulfilled }) {
                await queryFulfilled
                    .then(() => { })
                    .catch((e) => { dispatch(showErrorNotification(e)) }) //the other prototype uses a switch statement per statuses
            },
        }),
        registerUser: builder.mutation<{ id: string }, Partial<User>>({
            query(data) {
                return {
                    url: '',
                    method: 'POST',
                    body: data,
                };
            },
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                await queryFulfilled
                    .then(() => { })
                    .catch((e) => { dispatch(showErrorNotification(e)) }) //the other prototype uses a switch statement per statuses
            },
        }),
    }),
});
export const { useLoginMutation } = authApi;

// export const {
//     useGetUserQuery,           //current
//     useLoginMutation,      //login
//     useRegisterUserMutation,   //register
// } = authApi;

export default authApi;
