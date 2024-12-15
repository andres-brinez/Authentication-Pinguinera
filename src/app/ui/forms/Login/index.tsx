import { Link } from 'react-router-dom';
import { Label } from '../../elements/Label';
import './style.css';
import { useContext} from 'react';
import { AppContext } from '../../../core/state/AppContext';

interface LoginProps {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleError?: string;
  setError?: (error: string) => void;
}

const FormLogin: React.FC<LoginProps> = ({ handleSubmit }: LoginProps) => {

  const { dispatch } = useContext(AppContext);
  const { state } = useContext(AppContext);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const email = event.target.value;
    
    if (!isValidEmail(email)) {
      dispatch({type:'ERROR_CHANGED', payload: 'Introduzca una dirección de correo electrónico válida'});
      dispatch({ type: 'EMAIL_CHANGED', payload: '' });

    } else {
      dispatch({ type: 'EMAIL_CHANGED', payload: email });
      dispatch({type:'ERROR_CHANGED', payload: ''});

    }
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const password = event.target.value;
  
    if (password.length < 1) {
      dispatch({type:'ERROR_CHANGED', payload: 'La contraseña no puede estar vacía'});
      dispatch({ type: 'PASSWORD_CHANGED', payload: '' });

    }
    else if (password.length < 8) {
      dispatch({type:'ERROR_CHANGED', payload: 'La contraseña debe tener al menos 8 caracteres'});
      dispatch({ type: 'PASSWORD_CHANGED', payload: '' });

    } else {
      dispatch({type:'ERROR_CHANGED', payload: ''});
      dispatch({ type: 'PASSWORD_CHANGED', payload: password });
    }
  };


  return (
    <form onSubmit={handleSubmit} className="auth__form">

      <fieldset className="auth__fieldset">

        <legend className="auth__legend">Iniciar sesión</legend>

        <Label classNameLabel='auth__label'
          classNameSpan='auth__span'
          classNameInput={'auth__input'}
          nameInput='name'
          type='email'
          text='Correo electronico'
          placeHolder='Ingresa tu correo electrónico'
          onChange={handleEmailChange}
        />

        <Label classNameLabel='auth__label'
          classNameSpan='auth__span'
          classNameInput={'auth__input'}
          nameInput='name'
          type='password'
          text='Contraseña'
          placeHolder='Ingresa tu contraseña'
          onChange={handlePasswordChange}
        />
        {state.error && <p className="auth__error">{state.error}</p>}

        <button className="auth__button auth__button--primary" type="submit">
          Iniciar sesión
        </button>

        <p className='auth__register'>¿No tienes una cuenta? <Link to='/register' className="auth__register-link">Regístrate</Link></p>
      </fieldset>
    </form>
  );
};


export default FormLogin;