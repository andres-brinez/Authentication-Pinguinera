import { IUserRegister } from '../models/user-register.model';

export default {
  toApi: (credentials: IUserRegister) => {
    return {
      Username: credentials.username,
      Email: credentials.email,
      Password: credentials.password
    };
  }
};