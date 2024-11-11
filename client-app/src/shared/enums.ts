export enum NavRoutes {
    Home = '/',
    EnterpriseSearch = '/enterprise-search',
    MyJllis = '/my-jllis',
    Reports = '/reports',
    Dashboard = '/dashboard',
    Administration = '/administration',
    Settings = '/settings',
    Information = '/information',
    Notifications = '/notifications',
    Worksheet = '/worksheet',
    Details = '/details',
}

export enum SemanticUISize {
    mini = 'mini',
    tiny = 'tiny',
    small = 'small',
    large = 'large',
    big = 'big',
    huge = 'huge',
    massive = 'massive',
}

export enum SemanticUIModalSize {
    mini = 'mini',
    tiny = 'tiny',
    small = 'small',
    large = 'large',
    fullscreen = 'fullscreen',
}

export enum UserMessages {
    USER_SETTINGS_UPDATE_SUCCESS = 'Settings Updated!',
    USER_UPDATE_UNAUTHORIZED = 'You are not authorized to make these changes.',
    USER_ACCOUNT_MANAGEMENT_UNAUTHORIZED = 'You are not authorized to view this page.',
    USER_REGISTRATION_SUCCESS = 'User registered!',
    USER_REGISTRATION_ERROR = 'An error occurred registering your account.',
    USER_LOGOUT_ERROR = 'An error occurred during logout.',
    USER_KEEPALIVE_ERROR = 'An error occurred extending user session.',
    USER_IDLE_ERROR = 'An error occurred idling user session.',
    USER_LOGIN_ERROR = 'An error occurred logging in user.',
}

export enum ClientMessages {
    CLIENT_UPDATE_SUCCESS = 'Client Updated!',
    CLIENT_UPDATE_UNAUTHORIZED = 'You are not authorized to make these changes.',
    CLIENT_ACCOUNT_MANAGEMENT_UNAUTHORIZED = 'You are not authorized to view this page.',
    CLIENT_REGISTRATION_SUCCESS = 'Client successfully created!',
    CLIENT_REGISTRATION_ERROR = 'An error occurred registering your account.',
    CLIENT_LOGOUT_ERROR = 'An error occurred during logout.',
    CLIENT_KEEPALIVE_ERROR = 'An error occurred extending client session.',
    CLIENT_IDLE_ERROR = 'An error occurred idling client session.',
    CLIENT_LOGIN_ERROR = 'An error occurred logging in client.',
}

export enum GenericMessages {
    UNAUTHORIZED = 'You are not authorized to view these resources.',
    RESOURCE_UNAUTHORIZED = 'You are not authorized to access this resources.',
    UNKNOWN_ERROR = 'An unknown error has occurred.',
    PROCESS_START_SUCCESS = 'Successfully started process.',
}

export enum ModalType {
    Edit = 'Edit',
    Create = 'Create',
}


