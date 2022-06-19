export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: TUserHobbies;
}

export type TUsers = IUser[];

export type TUserHobbies = string[];
