import store from "../store";

export const selectAllPosts = (store) => store.posts.posts;
export const selectAuthPosts = (store) => {
  return store.posts.posts.filter((item) => item.uid === store.auth.uid);
};
