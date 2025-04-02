export type ValidationErrorType = {
  property: string;
  constraints: {
    [key: string]: string;
  };
};

export type ErrorDataType = {
  [key: string]: string | number | string[];
};

export type ErrorType = {
  status: number;
  timestamp: string;
  message: string;
  error: string;
  errors?: ValidationErrorType[] | undefined;
  data?: ErrorDataType | undefined;
};
