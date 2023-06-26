import React from 'react'
import { Chart } from 'react-google-charts'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'

export const data = [
  ['Year', 'Sales', 'Expenses', 'Profit'],
  ['2014', 1000, 400, 200],
  ['2015', 1170, 460, 250],
  ['2016', 660, 1120, 300],
  ['2017', 1030, 540, 350],
]

export function BarChart() {
  const bg = useColorModeValue('bg-gray-100', '#1E293B')
  const textColor = useColorModeValue('#000', '#fff')
  const options = {
    chart: {
      style: {
        background: {
          fillColor: '#000',
        },
      },
    },
  }
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="265px"
      data={data}
      options={options}
    />
  )
}
