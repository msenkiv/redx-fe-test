export enum ErrorCode {
    INTERNAL_ERROR = "INTERNAL_ERROR",
    NOT_FOUND = "NOT_FOUND",
    INVALID_PARAMS = "INVALID_PARAMS",
  }
  
  export enum ErrorMessage {
    INTERNAL_ERROR = "Something went wrong. Please try again later.",
    NOT_FOUND = "Resource not found.",
    INVALID_PARAMS = "Invalid parameters received.",
  }
  
  export type ApiError = {
    code: ErrorCode;
    message: ErrorMessage;
  };
  
  export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: ApiError;
  };
  