import apiClient from "./axios";
import { API } from "../constants/urls";
import { USER_ID_KEY } from "../constants/user";
import { request } from "http";

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

export const updateNickname = async (nickname: string) => {
  const userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    throw new Error("userId가 localStorage에 없습니다.");
  }

  const requestBody = {
    nickname: nickname,
  };

  const response = await apiClient.patch(
    API.USER.UPDATE_NICKNAME,
    requestBody,
    {
      headers: {
        userId,
      },
    }
  );
  return response.data;
};

type SearchNicknameResponse = {
  nicknameList: string[];
};

export const searchNickname = async (
  keyword: string
): Promise<SearchNicknameResponse> => {
  const response = await apiClient.get(API.USER.SEARCH_BY_NICKNAME(keyword));
  return response.data.data;
};
