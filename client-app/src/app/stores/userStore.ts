import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import { agent } from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import { NavRoutes } from "../../shared/enums";
import { JWT_KEY } from "../../shared/const";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLooggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        const user = await agent.Account.login(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user);
        router.navigate(NavRoutes.Activities)
    }

    logout = () => {
        store.commonStore.setToken(null);
        localStorage.removeItem(JWT_KEY);
        this.user = null;
        router.navigate(NavRoutes.Home)
    }
}