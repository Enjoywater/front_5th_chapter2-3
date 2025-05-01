import { forwardRef } from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

interface DialogTitleProps extends DialogPrimitive.DialogTitleProps {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
);

DialogTitle.displayName = DialogPrimitive.Title.displayName;
