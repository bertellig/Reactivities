import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";
import { JWT_KEY } from "../../shared/const";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null | undefined = localStorage.getItem(JWT_KEY);
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        // auto reaction trigger when the app starts
        // reaction only when there are changes to the item observed
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem(JWT_KEY, token);
                }
                else {
                    localStorage.removeItem(JWT_KEY);
                }
            }
        )
    }

    setServerError(error: ServerError) {
        console.log(error)
        this.error = error
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}