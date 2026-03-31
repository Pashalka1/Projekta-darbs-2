interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-14 h-14 border-4',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-gray-700 border-t-red-500 rounded-full animate-spin`}
    />
  );
}
