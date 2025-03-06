import { useAppSelector } from '@Hooks/redux.hook'
import React, { useEffect, useState } from 'react'
import { getFitness } from './GenerationAPI'
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  Legend,
} from 'recharts'

const ShowFitness = () => {
  const situation = useAppSelector(
    (state) => state.generation.selectedSituation
  )
  const [rawFitness, setFitness] = useState([])

  /// Tiến hành xây dựng dữ liệu
  const data = []
  for (let i = 0; i < rawFitness.length; i++) {
    data.push({ name: String(i + 1), fitness: rawFitness[i] })
  }

  useEffect(() => {
    getFitness(situation)
      .then((resp: any) => setFitness(resp))
      .catch((resp) => setFitness([]))
  }, [situation])

  return (
    <div className='w-full h-96 p-4 bg-white shadow-lg rounded-2xl'>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 50, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='name'
            label={{ value: 'Thế hệ', position: 'bottom', offset: 10 }}
          />
          <YAxis
            label={{
              value: 'Điểm thích nghi',
              angle: -90,
              position: 'left',
              offset: 15,
            }}
          />
          <Legend verticalAlign='top' align='right' height={36} />
          <Tooltip />
          <Line
            type='basis'
            dataKey='fitness'
            stroke='blue'
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ShowFitness
