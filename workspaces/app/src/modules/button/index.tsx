import { ComponentProps, forwardRef, ReactNode } from 'react'
import { Ripple } from '../../effects/ripple'
import { ButtonStyle } from '../../styles/button/Button'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof ButtonStyle.variants
  fullWidth?: boolean
  ripple?: boolean
  disabled?: boolean
  rounded?: boolean
  className?: string
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      fullWidth = false,
      className = '',
      disabled = false,
      rounded = false,
      ripple = false,
      children,
      ...rest
    },
    ref
  ) => {
    const rippleEffect = new Ripple()
    return (
      <button
        {...rest}
        ref={ref}
        disabled={disabled}
        className={cls(`${objectsToString(ButtonStyle.base)}
        ${objectsToString(ButtonStyle.variants[variant])}
        ${disabled && objectsToString(ButtonStyle.disabled)}
        ${rounded && objectsToString(ButtonStyle.rounded)}
        ${className}`)}
        type={rest.type || 'button'}
        onMouseDown={(e) => {
          const onMouseDown = rest?.onMouseDown
          if (ripple) {
            rippleEffect.create(e, 'light')
          }
          return typeof onMouseDown === 'function' && onMouseDown(e)
        }}
      >
        {children}
      </button>
    )
  }
)

export default Button
