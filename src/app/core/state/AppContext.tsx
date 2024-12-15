import { ReactElement, ReactNode, createContext, useReducer } from 'react';

export const initialState: IState = {
  email: '',
  password: '',
  error: ''
};

interface IState {
  email: string;
  password: string
  error: string

}

type Action =
  | { type: 'EMAIL_CHANGED', payload: string }
  | { type: 'PASSWORD_CHANGED', payload: string }
  | { type: 'ERROR_CHANGED', payload: string };

interface IAppContext {
  state: IState;
  dispatch: React.Dispatch<Action>; 
}

export const AppContext = createContext<IAppContext>({ state: initialState, dispatch: () => {} }); 
interface IAppProviderProps {
  children: ReactNode;
}

interface IAction {
  type: string;
  payload: string;
}

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
  case 'EMAIL_CHANGED':
    console.log(action.payload);
    return { ...state, email: action.payload };
  case 'PASSWORD_CHANGED':
    return { ...state, password: action.payload };
  case 'ERROR_CHANGED':
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export const AppProvider = ({ children }: IAppProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};