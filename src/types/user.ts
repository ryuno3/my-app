export interface User {
  id: string;
  email: string;
  name?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserActionState {
  message?: string;
  success?: boolean;
}
