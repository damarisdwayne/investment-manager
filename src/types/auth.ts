export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IUser {
  uid: string;
  email: string;
  name: string;
  token: string;
  provider: string;
  imageUrl: string;
}
