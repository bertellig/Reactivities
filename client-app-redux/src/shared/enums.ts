export enum NavRoutes {
    Home = '/',
    Activities = '/activities',
    ActivityCreate = '/createActivity',
    ActivityDetails = '/activities/:id',
    ActivityEdit = '/manage/:id',
    Login = '/account/login',
    Account = '/account',
    Errors = '/errors',
    NotFound = '/not-found',
    ServerError = '/server-error',
}

export enum NavRoutesKeys {
    Create = 'create',
    Edit = 'edit',
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

export enum ActivityMessages {
    RETURN_TO_ACTIVITY_PAGE = 'Return to activities page',
    VALIDATION_TITLE_IS_REQUIRED = 'Activity title is required',
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
    BAD_REQUEST = 'Bad Request',
    FORBIDDEN = 'Forbidden',
    NOT_FOUND = 'Oops - we\'ve looked everywhere but could not find what you are looking for!',
    SERVER_ERROR = 'Server Error',
    RESOURCE_UNAUTHORIZED = 'You are not authorized to access this resources.',
    UNKNOWN_ERROR = 'An unknown error has occurred.',
    PROCESS_START_SUCCESS = 'Successfully started process.',
    SUCCESS = 'Success.',
}

export enum ModalType {
    Edit = 'Edit',
    Create = 'Create',
}


