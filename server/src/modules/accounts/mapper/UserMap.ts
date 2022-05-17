import { instanceToInstance } from 'class-transformer';
interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}
export class UserMap {
  static toDTO({ id, name, email, phone, password }: IUser) {
    const user = instanceToInstance({
      id,
      name,
      email,
      phone,
      password,
    });
    return user;
  }
}
