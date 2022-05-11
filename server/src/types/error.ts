export class HttpError extends Error {
  get message(): string {
    return this.msg;
  }
  get status(): number {
    return this.code;
  }
  constructor(private code: number, private msg: string) {
    super(msg);
  }
}
