import React from 'react';
import { cn } from '../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        {
          'bg-primary text-white hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-white hover:bg-secondary/90': variant === 'secondary',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'h-9 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-11 px-8': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
};
