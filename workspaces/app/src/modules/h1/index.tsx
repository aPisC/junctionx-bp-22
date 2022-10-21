import { ReactNode } from 'react'
import { H1Style } from '../../styles/h1/H1'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'

export interface H1Props {
  children: ReactNode
  className?: string
  variant?: keyof typeof H1Style.variants
}

export const H1 = ({ children, className = '', variant = 'base' }: H1Props) => {
  return (
    <h1
      className={cls(`
      ${objectsToString(H1Style.base)}
      ${objectsToString(H1Style.variants[variant])}
      ${className}`)}
    >
      {children}
    </h1>
  )
}
