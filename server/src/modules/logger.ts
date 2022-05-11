import { Request } from 'express';

export namespace Logger {
  export const error = (message: string) => {
    console.error(message);
  };
}
