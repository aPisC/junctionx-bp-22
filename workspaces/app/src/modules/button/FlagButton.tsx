import { forwardRef } from 'react'
import Button, { ButtonProps } from '.'

export interface FlagButtonProps extends ButtonProps {
  flag: string
}

export const FlagButton = forwardRef<HTMLButtonElement, FlagButtonProps>(({ children, flag, ...rest }, ref) => {
  return (
    <Button {...rest} ref={ref} variant="flag">
      {children}
    </Button>
  )
})
