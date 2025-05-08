import apiClient from "./axios";
import { API } from "../constants/urls";
import { USER_ID_KEY } from "../constants/user";

type MyNicknameResponse = {
  nickname: string;
};

export const fetchMyNickname = async (): Promise<MyNicknameResponse> => {
  const userId = localStorage.getItem(USER_ID_KEY);

  if (!userId) {
    throw new Error("userId가 localStorage에 없습니다");
  }

  const response = await apiClient.get(API.USER.MY_NICKNAME, {
    headers: {
      userId,
    },
  });

  return response.data.data;
};
