import React from 'react'
import { Chart } from 'react-google-charts'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'

export const data = [
  ['Month', 'Rewards', { role: 'style' }],
  ['Jan', 8.94, 'blue'], // RGB value
  ['Feb', 10.49, 'blue'], // English color name
  ['Mar', 19.3, 'blue'],
  ['Apr', 21.45, 'blue'], // CSS-style declaration
  ['May', 8.94, 'blue'], // RGB value
  ['Jun', 10.49, 'blue'], // English color name
  ['Jul', 19.3, 'blue'],
  ['Aug', 21.45, 'blue'], // CSS-style declaration
  ['Sept', 8.94, 'blue'], // RGB value
  ['Oct', 10.49, 'blue'], // English color name
  ['Nov', 19.3, 'blue'],
  ['Dec', 21.45, 'blue'], // CSS-style declaration
]

export function ColumnChart() {
  const bg = useColorModeValue('bg-gray-100', '#1E293B')
  const textColor = useColorModeValue('#000', '#fff')

  const options = {
    backgroundColor: bg,
    legend: {
      textStyle: { color: textColor },
    },
    hAxis: {
      textStyle: { color: 'green' },
    },
    vAxis: {
      textStyle: { color: 'green' },
    },
  }
  return (
    <Chart
      chartType="ColumnChart"
      options={options}
      width="100%"
      height="400px"
      data={data}
    />
  )
}
