import { TypeOptions } from 'react-toastify';

/**
 * Notifications
 */

export type ToastOptions = TypeOptions | 'dismiss';

export interface NotificationState {
    mostRecentMessage: string;
    mostRecentType: ToastOptions;
    mostRecentNotificationId: string;
}
