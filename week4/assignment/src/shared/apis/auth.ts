import apiClient from "./axios";
import { API } from "./constants/urls";

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
