import { ReactElement } from 'react';
import './style.css';

interface LegendProps {
  className: string;
  text: string;
  
}

export const Legend = ({ className, text }: LegendProps): ReactElement => {

  return (
    <legend className={className}>
      {text}
    </legend>
  );
};
