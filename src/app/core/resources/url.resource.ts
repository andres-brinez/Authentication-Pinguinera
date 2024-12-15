import { environment } from '../environment/environment';

export const urls = {
  login: `${environment.apiUrl}/auth/login`,
  register: `${environment.apiUrl}/auth/register`,
  home: `${environment.urlComerce}/home`,
  loan: `${environment.urlLoan}/loan`,
  provider: `${environment.urlProvider}/provider`,
  admin: `${environment.urlAdmin}/admin`,
};