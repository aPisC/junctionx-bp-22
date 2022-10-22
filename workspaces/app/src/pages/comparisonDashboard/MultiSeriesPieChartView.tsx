import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      display: false,
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
    },
  },
}

export interface MultiSeriesPieChartViewProps {
  labels?: string[]
  data?: any
}

const emptydata = [
  {
    backgroundColor: ['transparent'],
    data: [],
  },
  {
    backgroundColor: ['transparent'],
    data: [],
  },
  {
    backgroundColor: ['transparent'],
    data: [],
  },
  {
    backgroundColor: ['transparent'],
    data: [],
  },
  {
    backgroundColor: ['transparent'],
    data: [],
  },
  {
    backgroundColor: ['transparent'],
    data: [],
  },
]

const data = {}

export const MultiSeriesPieChartView = ({ labels, data }: MultiSeriesPieChartViewProps) => {
  const populatedData = data.concat(emptydata)
  const populatedLabels = labels?.concat(Array.from(populatedData.length).map((item) => ''))
  const finalData = {
    labels: populatedLabels,
    datasets: populatedData,
  }
  return (
    <div className="w-full h-[15rem]">
      <Pie options={options} data={finalData} />
    </div>
  )
}
