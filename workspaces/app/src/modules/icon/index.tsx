import { ReactNode } from 'react'
import { IconStyle } from '../../styles/icon/Icon'
import { cls } from '../../utils/DesignUtils'
import { objectsToString } from '../../utils/Utils'

export interface IconProps {
  children: ReactNode
  variant?: keyof typeof IconStyle.variants
}

export const Icon = ({ children, variant = 'base' }: IconProps) => {
  return (
    <div
      className={cls(`
  ${objectsToString(IconStyle.base)}
  ${objectsToString(IconStyle.variants[variant])}`)}
    >
      {children}
    </div>
  )
}

export default Icon
