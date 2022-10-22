import { ReactNode } from 'react'
import Icon from '../../modules/icon'
import { BarChartView } from './BarChartView'

export interface GalleryItemProps {
  icon: ReactNode
  label: string
  dataset: any
}

export const GalleryItem = ({ icon, label, dataset }: GalleryItemProps) => {
  return (
    <div className="flex flex-col justify-center">
      <BarChartView labels={[label]} datasets={[dataset]} />
      <div className="text-wise-navy-dark w-full h-auto flex justify-center p-2">{icon}</div>
    </div>
  )
}
