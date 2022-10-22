import { forwardRef } from 'react'
import Button, { ButtonProps } from '.'
import { cls } from '../../utils/DesignUtils'

export interface FlagButtonProps extends ButtonProps {}

export const FlagButton = forwardRef<HTMLButtonElement, FlagButtonProps>(({ children, className, ...rest }, ref) => {
  return (
    <Button
      {...rest}
      ref={ref}
      variant="flag"
      className={cls(`overflow-hidden
      ${className}`)}
    >
      {children}
    </Button>
  )
})
