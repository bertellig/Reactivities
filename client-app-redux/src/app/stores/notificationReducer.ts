import { createSlice } from '@reduxjs/toolkit';
import { isObject, isString } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { NotificationState, ToastOptions } from './CommonTypes';

const initialState: NotificationState = {
    mostRecentMessage: '',
    mostRecentType: 'info',
    mostRecentNotificationId: '',
};

type MessageType = string | { message: string };

function setNotification(state: NotificationState, msg: MessageType, type: ToastOptions) {
    state.mostRecentMessage = isObject(msg) ? msg.message : isString(msg) ? msg : 'Unknown Error';
    state.mostRecentType = type;
    state.mostRecentNotificationId = uuidv4();
}


const notifications = createSlice({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        showDefaultNotification(state, action) {
            setNotification(state, action.payload, 'default');
        },
        showInfoNotification(state, action) {
            setNotification(state, action.payload, 'info');
        },
        showSuccessNotification(state, action) {
            setNotification(state, action.payload, 'success');
        },
        showWarningNotification(state, action) {
            setNotification(state, action.payload, 'warning');
        },
        showErrorNotification(state, action) {
            setNotification(state, action.payload, 'error');
        },
        dismissAllNotifications(state, action) {
            setNotification(state, action.payload, 'dismiss');
        },
    },
});

const { reducer, actions } = notifications;

export const {
    showErrorNotification,
    showWarningNotification,
    showSuccessNotification,
    showInfoNotification,
    showDefaultNotification,
    dismissAllNotifications,
} = actions;
export default reducer;
