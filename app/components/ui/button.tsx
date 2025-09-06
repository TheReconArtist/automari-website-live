import React, { forwardRef } from 'react';
import { Button as ShadcnButton } from 'shadcn/ui';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        className={`your-default-styles ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
