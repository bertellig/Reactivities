import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Activity } from '../models/activity';
import { showDefaultNotification, showErrorNotification } from './notificationReducer';
import { GenericMessages } from '../../shared/enums';

const ActivityStore = createApi({
    reducerPath: 'dataActivityApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
    }),

    //************************************                    ENDPOINTS               ****************************************************************
    tagTypes: ['DataActivity'], // Declare a tag type to group related queries/mutations
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        loadActivities: builder.query<Activity[], void>({
            // Provides a list of `Activities` by `id`.
            // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
            // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
            query: () => ({
                url: '/activities/',
                method: 'Get',
            }),
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({ id }) => ({ type: 'DataActivity', id } as const)),
                        { type: 'DataActivity', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: 'DataActivity', id: 'LIST' }],
        }),
        loadActivity: builder.query({
            query: (id) => ({
                url: `/activities/${id}`,
                method: 'Get',
            }),
            providesTags: (result: any, _error: any, id: string) => [{ type: 'DataActivity', id }],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                await queryFulfilled
                    .then(() => {
                        dispatch(
                            showDefaultNotification(GenericMessages.SUCCESS)
                        );
                    })
                    .catch((e) => { dispatch(showErrorNotification(e)) }) //the other prototype uses a switch statement per statuses
            }
        }),
        createActivity: builder.mutation({
            query: (data) => ({
                url: '/activities',
                method: 'POST',
                body: data,
            }),
            // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
            // that newly created post could show up in any lists.
            invalidatesTags: [{ type: 'DataActivity', id: 'LIST' }],
            async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
                await queryFulfilled
                    .then(() => {
                        dispatch(
                            showDefaultNotification(GenericMessages.SUCCESS)
                        );
                    })
                    .catch((e) => { dispatch(showErrorNotification(e)) }) //the other prototype uses a switch statement per statuses
            }
        }),
        updateActivity: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `activities/${id}`,
                method: 'PUT',
                body: data,
            }),
            // Invalidates all queries that subscribe to this Post `id` only.
            // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
            invalidatesTags: (result, error, { id }) => [{ type: 'DataActivity', id }],
            async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    ActivityStore.util.updateQueryData('loadActivity', id, (draft) => {
                        Object.assign(draft, data)
                    })
                )
                // Kind of confusing between tyr and catch and the then and catch
                try {
                    await queryFulfilled
                        .then(() => {
                            dispatch(
                                showDefaultNotification(GenericMessages.SUCCESS)
                            );
                        })
                        .catch((e) => { dispatch(showErrorNotification(e)) }) //the other prototype uses a switch statement per statuses
                } catch {
                    patchResult.undo()

                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            },
        }),
        deleteActivity: builder.mutation({
            query: (id) => ({
                url: `activities/${id}`,
                method: 'DELETE',
            }),
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: (result, error, id) => [{ type: 'DataActivity', id }],
        }),

    }),
});
export const {
    useLoadActivitiesQuery,
    useLoadActivityQuery,
    useCreateActivityMutation,
    useUpdateActivityMutation,
    useDeleteActivityMutation,
} = ActivityStore;

export default ActivityStore;