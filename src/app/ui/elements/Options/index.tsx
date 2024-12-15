import { ReactElement } from 'react';
import './style.css';

interface OptionsProps {
  className: string;
  value: string;
  text: string;
}

export const Options = ({ className, value , text }: OptionsProps): ReactElement => {

  return (
    <option className={className} value={value}>{text}</option>
  );
};
