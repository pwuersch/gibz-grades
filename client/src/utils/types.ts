export interface Grade {
  subject: string;
  name: string;
  date: string;
  grade: number;
}

export interface Settings {
  url: string;
  pin: string;
}

export interface BaseResponse {
  message: string;
}
