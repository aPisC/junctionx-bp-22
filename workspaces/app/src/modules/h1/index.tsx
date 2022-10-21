import { ReactNode } from 'react'

export interface H1Props {
  children: ReactNode
}

export const H1 = ({ children }: H1Props) => {
  return <h1 className="font-bold text-3xl text-wise-navy-mid">{children}</h1>
}
