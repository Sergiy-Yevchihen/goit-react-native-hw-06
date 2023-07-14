import store from "../store";

export const selectUser = (store) => store.auth;

export const selectUserId = (store) => store.auth.uid;
export const selectUserPhoto = (store) => store.auth.photo;
export const selectIsAuth = (store) => store.auth.isAuth;
export const selectIsLoading = (store) => store.auth.loading;
