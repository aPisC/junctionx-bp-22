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

export interface BarChartViewProps {
  labels?: string[]
  datasets?: any
}

const data = {
  labels: ['Overall Yay', 'Overall Nay'],
  datasets: [
    {
      backgroundColor: ['#AAA', '#777'],
      data: [21, 79],
    },
    {
      backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
      data: [33, 67],
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
  ],
}

export const MultiSeriesPieChartView = ({}: BarChartViewProps) => {
  return (
    <div className="w-full">
      <Pie options={options} data={data} />
    </div>
  )
}
