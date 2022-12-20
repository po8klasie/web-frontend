export interface FilterProps<T> {
  name: string;
  setValue: (v: T) => void;
  value: T;
}
