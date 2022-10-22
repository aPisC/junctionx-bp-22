import { FlagsRequest } from '../../cache/flagRequest'
import { BACKEND_URL } from '../../config/backendUrl'
import { useSpinnerOverlay } from '../../utils/SipnnerOverlay/useSpinnerOverlay'
import { useRequest } from '../../utils/useRequest'
import { MultiSeriesPieChartView, MultiSeriesPieChartViewProps } from './MultiSeriesPieChartView'

export interface PieChartProps extends MultiSeriesPieChartViewProps {
  homeCountry: string
  targetCountry: string
}

//wrapper height is also hardcoded in the MultiSeriesPieChartView
export const PieChart = ({ data, labels, homeCountry, targetCountry }: PieChartProps) => {
  const flagsRequest = useRequest(() => FlagsRequest, [])

  useSpinnerOverlay(flagsRequest.isRunning)

  if (flagsRequest.isRunning) {
    return null
  }

  const homeFlag = flagsRequest.data?.find((item: any) => item.id === homeCountry)
  const targetFlag = flagsRequest.data?.find((item: any) => item.id === targetCountry)
  console.log(homeFlag)
  return (
    <div className="relative w-full h-[15rem]">
      <MultiSeriesPieChartView labels={labels} data={data} />
      <div className="absolute flex top-0 left-0 w-full h-full text-black items-center justify-center">
        <div className="flex flex-col text-lg">
          <div className="flex items-center w-full justify-center text-dark-grey">
            <div className="p-1">
              <img className="w-5" src={`${BACKEND_URL}/${homeFlag?.image}`} />
            </div>
            <div className="p-1">100 000 {homeFlag?.currency}</div>
          </div>
          <div className="flex items-center w-full justify-center text-wise-navy-blue">
            <div className="p-1">
              <img className="w-5" src={`${BACKEND_URL}/${targetFlag?.image}`} />
            </div>
            <div className="p-1">100 000 {targetFlag?.currency}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PieChart
