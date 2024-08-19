export class ResponseDto<T> {
  ok: boolean;
  data: T;
  message: string = '';

  constructor(data: T, ok: boolean = true) {
    this.data = data;
    this.ok = ok;
  }
}
