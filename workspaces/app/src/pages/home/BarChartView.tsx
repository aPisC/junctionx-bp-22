import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
  labels: string[]
  datasets: any
}

export const BarChartView = ({ labels, datasets }: BarChartViewProps) => {
  const data = {
    labels,
    datasets,
  }
  return (
    <div className="w-full">
      <Bar options={options} data={data} />
    </div>
  )
}
