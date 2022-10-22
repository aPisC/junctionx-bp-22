import { ReactNode } from 'react'
import { commify } from '../../utils/Utils'
import { BarChartView } from './BarChartView'

export interface GalleryItemProps {
  icon: ReactNode
  labels: string[]
  max?: number
  datasets: any
  value: number
  unit: string
}

export const GalleryItem = ({ icon, labels, datasets, max, value, unit }: GalleryItemProps) => {
  console.log(datasets[0]?.data[0], datasets[1]?.data[0], datasets[0]?.data[0] > datasets[1]?.data[0])
  return (
    <div className="flex flex-col h-full justify-center">
      <BarChartView max={max} labels={labels} datasets={datasets} />
      <div className="text-xs text-center">{`${
        datasets.length == 2 ? (datasets[0].data[0] > datasets[1].data[0] ? '-' : '+') : ''
      }${commify(value)} ${unit}`}</div>
      <div className="text-wise-navy-dark w-full h-auto flex justify-center p-1">{icon}</div>
    </div>
  )
}
