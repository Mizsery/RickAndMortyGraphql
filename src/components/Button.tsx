interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode | React.ReactNode[]
}

export const Button = ({ children, ...props }: ButtonProps) => <button type='button' {...props}>{children}</button>;
