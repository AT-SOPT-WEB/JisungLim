import apiClient from "./axios";
import { API } from "../constants/urls";

export const signUp = async (userData: {
  userId: string;
  userPassword: string;
  userNickname: string;
}) => {
  const requestBody = {
    loginId: userData.userId,
    password: userData.userPassword,
    nickname: userData.userNickname,
  };

  return apiClient.post(API.AUTH.SIGNUP, requestBody);
};

type SignInResponse = {
    userId: number;
}

export const signIn = async (userData: {
  loginId: string;
  password: string;
}): Promise<SignInResponse> => {
  const requestBody = {
    loginId: userData.loginId,
    password: userData.password,
  };
  const response = await apiClient.post(API.AUTH.LOGIN, requestBody);
  return response.data.data;
};
