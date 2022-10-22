import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      display: false,
      ticks: {
        display: false,
        beginAtZero: true,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    x: {
      barPercentage: 0.1,
      display: false,
      ticks: {
        display: false,
        beginAtZero: true,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    y: {
      drawborder: false,
    },
  },
}

export interface BarChartViewProps {
  labels: string[]
  datasets: any
  max?: number
}

export const BarChartView = ({ labels, datasets, max }: BarChartViewProps) => {
  const data = {
    labels,
    datasets,
  }
  const _options = {
    ...options,
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        max,
      },
    },
  }
  return (
    <div className="w-full">
      <Bar options={_options} data={data} />
    </div>
  )
}
