import { IUserLogin } from '../models/user-login.model';

export default {
  toApi: (credentials: IUserLogin) => {
    return {
      Email: credentials.email,
      Password: credentials.password
    };
  }
};