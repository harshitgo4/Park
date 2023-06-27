import React from 'react'
import { Chart } from 'react-google-charts'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'

export const data = [
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7],
]

export default function PieChart() {
  const bg = useColorModeValue('bg-gray-100', '#1E293B')
  const textColor = useColorModeValue('#000', '#fff')

  const options = {
    is3D: true,
    backgroundColor: 'transparent',
    legend: {
      textStyle: { color: textColor },
    },
  }

  return (
    <div className="m-auto">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={'90vw'}
        height={'40vh'}
        style={{
          color: '#fff',
        }}
      />
    </div>
  )
}
