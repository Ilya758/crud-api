import { IUser, TUsers } from 'src/models/user';

export default class UserService {
  static users: TUsers = [];

  static setNewUser = (user: IUser) => {
    UserService.users = [...UserService.users, { ...user }];
  };

  static updateUserById = (userId: string, updatedUser: IUser) => {
    UserService.users = UserService.users.map(user =>
      user.id === userId ? { ...updatedUser, id: user.id } : user
    );
  };

  static deleteUserById = (userId: string) => {
    UserService.users = UserService.users.filter(({ id }) => id !== userId);
  };
}
