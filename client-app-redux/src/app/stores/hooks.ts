// import { skipToken } from "@reduxjs/toolkit/query";
// import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// import { User, UserFormValues } from "../models/user";
// import { AppDispatch, RootState } from "./store";
// import { useGetLoginUserMutation, useGetUserQuery } from "./userStore";


// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const createPayload = (callback: any) => (user: UserFormValues, data: User) => {
//     const params = {
//         data: data,
//     };

//     return callback(params);
// }

// export function useGetLoginUser() {
//     const [getLoginUser] = useGetLoginUserMutation();

//     return [createPayload(getLoginUser)];
// }

// export function useGetUser(userId?: string, skip = false): User | undefined {
//     const { authToken } = useAppSelector((state) => state.session);
//     return useGetUserQuery(userId && authToken && !skip ? userId : skipToken).data;
// }
