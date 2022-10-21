import React from 'react'
import Navigation from '../../modules/navigation'

export interface BasePageProps {}

export default function BasePage({}: BasePageProps) {
  return (
    <div>
      <Navigation />
    </div>
  )
}
