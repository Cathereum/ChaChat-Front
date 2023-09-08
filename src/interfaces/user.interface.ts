export interface IUser {
  userName: string;
  room: string;
}

export interface IMessageToChat {
  message: string;
  user: { userName: string };
}
