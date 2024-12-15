// import { jwtDecode } from 'jwt-decode';
import { useContext} from 'react';
import { AppContext } from '../state/AppContext';
import { AuthServiceLogin } from '../services/login.service';

export const useAuthLogin = () => {

  const { dispatch } = useContext(AppContext);
 
  const login = (email: string, password: string) => AuthServiceLogin({ email: email, password: password })
    .then((response) => {
      switch (response) {
      case 400:
        dispatch({type:'ERROR_CHANGED', payload: 'Credenciales inválidas'});
        break;
      case 500:
        dispatch({type:'ERROR_CHANGED', payload: 'Ha ocurrido un error en el servidor'});        
        break;
        
      }
    });
  return {login};
};