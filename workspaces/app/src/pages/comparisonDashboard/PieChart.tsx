import { FlagsRequest } from '../../cache/flagRequest'
import { BACKEND_URL } from '../../config/backendUrl'
import { useRequest } from '../../utils/useRequest'
import { MultiSeriesPieChartView, MultiSeriesPieChartViewProps } from './MultiSeriesPieChartView'

export interface PieChartProps extends Omit<MultiSeriesPieChartViewProps, 'data'> {
  homeAmount: number
  targetAmount: number
  currency: string
  homeCountry: string
  targetCountry: string
}

//wrapper height is also hardcoded in the MultiSeriesPieChartView
export const PieChart = ({ labels, homeAmount, targetAmount, currency, homeCountry, targetCountry }: PieChartProps) => {
  const flagsRequest = useRequest(() => FlagsRequest, [])

  if (flagsRequest.isRunning) {
    return null
  }

  const homeFlag = flagsRequest.data?.find((item: any) => item.id === homeCountry)
  const targetFlag = flagsRequest.data?.find((item: any) => item.id === targetCountry)

  const m = Math.max(homeAmount, targetAmount)

  const data = [
    {
      backgroundColor: ['#37517e', 'transparent'],
      data: [(85 * homeAmount) / m, 100 - (85 * homeAmount) / m],
    },
    {
      backgroundColor: ['#A8AAAC', 'transparent'],
      data: [(85 * targetAmount) / m, 100 - (85 * targetAmount) / m],
    },
  ]
  return (
    <div className="relative w-full h-[15rem]">
      <MultiSeriesPieChartView labels={labels} data={data} />
      <div className="absolute flex top-0 left-0 w-full h-full text-black items-center justify-center">
        <div className="flex flex-col text-lg">
          <div className="text-xs text-dark-grey">Original country:</div>
          <div className="flex items-center w-full justify-center text-wise-navy-blue">
            <div className="p-1">
              <img className="w-5" src={`${BACKEND_URL}/${homeFlag?.image}`} />
            </div>
            <div className="p-1">
              {Math.round(homeAmount * 100) / 100} {currency}
            </div>
          </div>
          <div className="text-xs text-dark-grey">Choosen country:</div>
          <div className="flex items-center w-full justify-center text-ui-grey-body">
            <div className="p-1">
              <img className="w-5" src={`${BACKEND_URL}/${targetFlag?.image}`} />
            </div>
            <div className="p-1">
              {Math.round(targetAmount * 100) / 100} {currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PieChart
