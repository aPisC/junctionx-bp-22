import { ReactNode } from 'react'
import Icon from '../../modules/icon'
import { BarChartView } from './BarChartView'

export interface GalleryItemProps {
  icon: ReactNode
  labels: string[]
  datasets: any
}

export const GalleryItem = ({ icon, labels, datasets }: GalleryItemProps) => {
  return (
    <div className="flex flex-col justify-center">
      <BarChartView labels={labels} datasets={datasets} />
      <div className="text-wise-navy-dark w-full h-auto flex justify-center p-2">{icon}</div>
    </div>
  )
}
