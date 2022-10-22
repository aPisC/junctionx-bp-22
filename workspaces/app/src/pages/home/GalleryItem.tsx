import { ReactNode } from 'react'
import { BarChartView } from './BarChartView'

export interface GalleryItemProps {
  icon: ReactNode
  labels: string[]
  max?: number
  datasets: any
}

export const GalleryItem = ({ icon, labels, datasets, max }: GalleryItemProps) => {
  return (
    <div className="flex flex-col justify-center">
      <BarChartView max={max} labels={labels} datasets={datasets} />
      <div className="text-wise-navy-dark w-full h-auto flex justify-center p-2">{icon}</div>
    </div>
  )
}
