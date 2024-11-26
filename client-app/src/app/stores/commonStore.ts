import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";
import { JWT_KEY } from "../../shared/const";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null | undefined = null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }

    setServerError(error: ServerError) {
        console.log(error)
        this.error = error
    }

    setToken = (token: string | null) => {
        if (token) localStorage.setItem(JWT_KEY, token);
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}