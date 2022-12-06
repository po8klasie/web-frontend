import { FC } from 'react';

interface LoadingPlaceholderProps {
  className?: string;
}

const LoadingPlaceholder: FC<LoadingPlaceholderProps> = ({ className }) => (
  <div className={['bg-gray-300 rounded animate-pulse ', className ?? ''].join(' ')} />
);

export default LoadingPlaceholder;
