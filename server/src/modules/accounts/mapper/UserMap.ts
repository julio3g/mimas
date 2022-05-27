import { instanceToInstance } from "class-transformer";
interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: boolean;
}
export class UserMap {
  static toDTO({ id, name, email, phone, password, isAdmin }: IUser) {
    return instanceToInstance({
      id,
      name,
      email,
      phone,
      password,
      isAdmin,
    });
  }
}
