import { Outlet } from 'react-router-dom';
import './style.css';
import { ReactElement } from 'react';

export const AuthLayout = (): ReactElement => {
  return(
    <>
      <main>
        <Outlet/>
      </main>
    </>
  );
};