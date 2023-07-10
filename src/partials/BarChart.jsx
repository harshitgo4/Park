import React from 'react'
import { Chart } from 'react-google-charts'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'


export function BarChart({ data }) {
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
