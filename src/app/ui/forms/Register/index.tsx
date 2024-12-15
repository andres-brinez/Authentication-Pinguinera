import { FormEvent, ReactElement, useState } from 'react';
import { Label } from '../../elements/Label';
import { Span } from '../../elements/Span';
import { Button } from '../../elements/Button';
import { Title } from '../../elements/Title';
import { LinkRoute } from '../../elements/LinkRoute';
import { useAuthRegister } from '../../../core/hooks/userAuthRegister';
import './style.css';

export const FormRegister = (): ReactElement => {
  const { register, error } = useAuthRegister();
  const [username, setUsername] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !email || !password || !repeatPassword || password.length < 8 || password !== repeatPassword || username.length < 3 || !isValidEmail(email)) {
      return;
    }

    register(username, email, password);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
    if (newPassword.length < 8) {
      setPasswordMatchError('La contraseña debe tener al menos 8 caracteres');
    } else {
      setPasswordMatchError(null);
    }
  };

  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRepeatPassword = event.target.value;
    setRepeatPassword(newRepeatPassword);
    if (newRepeatPassword !== password) {
      setPasswordMatchError('Las contraseñas no coinciden');
    } else {
      setPasswordMatchError(null);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setUsername(newName);
    if (newName.length < 3) {
      setNameError('El username debe tener al menos 3 caracteres.');
    } else {
      setNameError(null);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    if (!isValidEmail(newEmail)) {
      setEmailError('Introduzca una dirección de correo electrónico válida');
    } else {
      setEmailError(null);
    }
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const evaluatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const PasswordStrengthDescription = (strength: number): string => {
    const description : Record<number, string> = {1: 'Muy insegura', 2: 'Insegura', 3: 'Normal', 4: 'Buena', 5:'Excelente'};
    return description[strength];
  };

  return (
    <div className='register__container'>
      <form onSubmit={handleSubmit} className='register__form'>
        <Title type='h1' text='Registro' className='register__title fade-in'/>
        <fieldset className='register__fieldset'>
          <Label classNameLabel='register__label' classNameSpan='register__span' classNameInput={`register__input ${nameError ? 'error' : ''} fade-in`} nameInput='name' type='text' text='Username' onChange={handleUsernameChange} placeHolder='example'/>
          {nameError && <Span className='register__span-error' text={nameError} />}
          <Label classNameLabel='register__label' classNameSpan='register__span' classNameInput={`register__input ${emailError ? 'error' : ''} fade-in`} nameInput='email' type='text' text='Correo electrónico' onChange={handleEmailChange} placeHolder='example@example.com' />
          {emailError && <Span className='register__span-error' text={emailError} />}
          <Label classNameLabel='register__label' classNameSpan='register__span' classNameInput='register__input fade-in' nameInput='password' type='password' text='Contraseña' onChange={handlePasswordChange} placeHolder='Example2#'/>
          <div className="password-strength fade-in">
            <div className={`strength-bar strength-${passwordStrength}`} />
            <Span className={`strength-text strength-${passwordStrength}`} text={PasswordStrengthDescription(passwordStrength)} />
          </div>
          <Label classNameLabel='register__label' classNameSpan='register__span' classNameInput='register__input fade-in' nameInput='repeatPassword' type='password' text='Repita la contraseña' onChange={handleRepeatPasswordChange} placeHolder='Example2#' />
          {passwordMatchError && <Span className='register__span-error' text={passwordMatchError} />}
          {error && <Span className='register__span-error' text={error} />}
        </fieldset>
        <Button className='register__button fade-in' text='Registrarse' disabled={!username || !email || !password || !repeatPassword || password.length < 8 || password !== repeatPassword || username.length < 3 || !isValidEmail(email)} />

        <div className="register__signIn fade-in">
          <Span className='register__span' text='¿Ya tienes una cuenta?'/>
          <LinkRoute text='Inicia Sesión' className='register__signIn-register' route='/login'/>
        </div>
      </form>
    </div>
  );
};
