import { ReactElement, useContext } from 'react';
import './style.css';
import { AppContext } from '../../../core/state/AppContext';
import { useAuthLogin } from '../../../core/hooks/useAuthLogin';
import FormLogin from '../../forms/Login';

const LoginComponent = (): ReactElement => {

  const { dispatch } = useContext(AppContext);
  const { login} = useAuthLogin();
  const { state } = useContext(AppContext);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const emailUser = state.email;
    const passwordUser = state.password;
    if (emailUser.length>0 && passwordUser.length>0) {
      await login(emailUser, passwordUser);
    }
    else if (emailUser.length==0) {
      dispatch({type:'ERROR_CHANGED', payload: 'Ingresa un correo electrónico válido'});
    }
    else if (passwordUser.length==0) {
      dispatch({type:'ERROR_CHANGED', payload: 'La contraseña debe tener al menos 8 caracteres'});
    }
    else {
      dispatch({type:'ERROR_CHANGED', payload: 'Ingresa un correo electrónico y una contraseña válidos'});
    }
  };

  return (
    <main className="auth authLogin">
      <FormLogin handleSubmit={handleSubmit}  />
    </main>
  );
};

export default LoginComponent;