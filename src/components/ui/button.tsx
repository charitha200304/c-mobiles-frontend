import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md ${
        variant === 'primary'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : variant === 'secondary'
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          : variant === 'ghost'
          ? 'bg-transparent hover:bg-gray-100'
          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
      } ${
        size === 'sm'
          ? 'text-sm'
          : size === 'lg'
          ? 'text-lg'
          : 'text-base'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
