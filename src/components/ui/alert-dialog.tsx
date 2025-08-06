import React from 'react';

// Enhanced AlertDialog component to accept open/onOpenChange props
export function AlertDialog({ children, open, onOpenChange, ...props }: React.HTMLAttributes<HTMLDivElement> & { open?: boolean; onOpenChange?: () => void }) {
  // Optionally, you can use open/onOpenChange for modal logic
  return (
    <div role="alertdialog" {...props}>
      {children}
    </div>
  );
}

export function AlertDialogAction({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>{children}</button>
  );
}

export function AlertDialogCancel({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>{children}</button>
  );
}

export function AlertDialogContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>{children}</div>
  );
}

export function AlertDialogDescription({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props}>{children}</p>
  );
}

export function AlertDialogFooter({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>{children}</div>
  );
}

export function AlertDialogHeader({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>{children}</div>
  );
}

export function AlertDialogTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 {...props}>{children}</h2>
  );
}
