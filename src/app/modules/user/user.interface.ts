export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export type IUser = {
  id: string;
  password: string;
  username: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'user';
  isDeleted: boolean;
};
