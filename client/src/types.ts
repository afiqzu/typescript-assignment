export interface Notification {
  msg_id: string;
  msg: string;
  time: string;
  timeoutId?: ReturnType<typeof setTimeout>;
}
