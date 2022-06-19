import { TUsers } from 'src/models/user';

export const findUserById = (userId: string, users: TUsers) =>
  users.find(user => user.id === userId);
