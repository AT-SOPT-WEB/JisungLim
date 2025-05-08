export type ApiResponse<T = any> = {
  success: boolean;
  code: string;
  message: string;
  data: T | null;
};
