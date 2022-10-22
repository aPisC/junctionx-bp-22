import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export interface LineChartViewProps {}

export const options = {
  responsive: true,
  maintainAspectRatio: true,
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

const labels = ['January', 'February', 'March', 'April']

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: [1, 2, 3, 2],
      borderColor: '#00b9ff',
      backgroundColor: '#00b9ff',
      fill: false,
      tension: 0.4,
    },
  ],
}

export const LineChartView = ({}: LineChartViewProps) => {
  return (
    <div className="w-full">
      <Line options={options} data={data} />
    </div>
  )
}
