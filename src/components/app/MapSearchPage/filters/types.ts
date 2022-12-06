import { UseControllerProps } from 'react-hook-form';

export interface FilterProps {
  control: UseControllerProps['control'];
  name: string;
  defaultValue: any;
}
