import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../../app/models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { NavRoutes } from "../../shared/enums";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";



const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = <T>(response: AxiosResponse) => response.data;

// for every request we are going to add the token to the header
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate(NavRoutes.NotFound);
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            else {
                toast.error(data)
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate(NavRoutes.NotFound);
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate(NavRoutes.ServerError)
            break;

        default:
            break;
    }
    return Promise.reject(error);
})



const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>(NavRoutes.Activities),
    details: (id: string) => requests.get<Activity>(`${NavRoutes.Activities}/${id}`),
    create: (activity: Activity) => requests.post<void>(NavRoutes.Activities, activity),
    update: (activity: Activity) => requests.put<void>(`${NavRoutes.Activities}/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`${NavRoutes.Activities}/${id}`),
}

const Account = {
    current: () => requests.get<User>(NavRoutes.Account),
    login: (user: UserFormValues) => requests.post<User>(NavRoutes.Login, user),
    register: (user: UserFormValues) => requests.post<User>(NavRoutes.Register, user),
}

export const agent = {
    Activities,
    Account
}


