import { useState } from 'react';
import { registerService } from '../services/register.service';

export const useAuthRegister = () => {
  const [error, setError] = useState<string>();
  
  const register = (name: string, email: string, password: string) => {
    registerService({ username: name, email, password })
      .then((AuthenticatedResponse) => {
        if (AuthenticatedResponse === undefined) {
          AuthenticatedResponse = 0;
        }

        const responseHandlers: { [key: number]: () => void } = {
          0: () => setError(''),
          400: () => setError('El correo electrónico ya está registrado'),
          500: () => setError('Error interno en el servidor'),
        };
        
        const handleResponse = responseHandlers[AuthenticatedResponse] || (() => setError('Error desconocido'));
        handleResponse();        
      });
  };
  
  return { register, error };
};