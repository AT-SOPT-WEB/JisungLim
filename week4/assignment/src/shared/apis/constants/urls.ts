export const API = {
  AUTH: {
    SIGNUP: "/api/v1/auth/signup",
    LOGIN: "/api/v1/auth/signin",
  },
  USER: {
    MY_NICKNAME: "/api/v1/users/me",
    SEARCH_BY_NICKNAME: (nickname: string) =>
      `/api/v1/users?keyword=${encodeURIComponent(nickname)}`,
    UPDATE_NICKNAME: "/api/v1/users",
  },
};
