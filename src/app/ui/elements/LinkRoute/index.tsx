import { ReactElement } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

interface LinkRouteProps {
  route: string;
  text: string;
  className: string;
}

export const LinkRoute = ({ route, text, className }: LinkRouteProps): ReactElement => {

  return (
    <Link to={route} className={className}>
      {text}
    </Link>
  );
};
